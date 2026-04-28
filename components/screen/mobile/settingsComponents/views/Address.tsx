"use client"
import PhilippinesMap from '@/components/ui/Map'
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

type AddressForm = {
  province: string
  provinceCode: string
  city: string
  cityCode: string
  barangay: string
  barangayCode: string
  street: string
  blkLot: string
  zipcode: string
}

type InputDropdownProps = {
  label: string
  value: string
  setValue: (value: string) => void
  list: any[]
  onSelect: (item: any) => void
  disabled?: boolean
  fieldKey: string
  openDropdown: string | null
  setOpenDropdown: (key: string | null) => void
  error?: boolean
}

const InputDropdownInner = React.memo(function InputDropdown({
  label,
  value,
  setValue,
  list,
  onSelect,
  disabled = false,
  fieldKey,
  openDropdown,
  setOpenDropdown,
  error = false,
}: InputDropdownProps) {
  const filtered = useMemo(
    () =>
      list.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      ),
    [list, value]
  )

  const handleBlur = useCallback(() => {
    // If there's a value but it doesn't match any item exactly, and we have items in the list,
    // check if there's an exact match. If not, reset the value to empty.
    if (value && list.length > 0 && !list.find(item => item.name === value)) {
      // Check if value (case-insensitive) matches any item
      const match = list.find(item => item.name.toLowerCase() === value.toLowerCase())
      if (match) {
        onSelect(match)
      } else {
        setValue('')
        onSelect({ name: '', code: '' })
      }
    }
  }, [value, list, setValue, onSelect])

  return (
    <div>
      <label className="text-sm font-medium text-gray-700 mb-2 block">
        {label}
      </label>
      <div className="relative">
        <input
          value={value}
          disabled={disabled}
          onFocus={() => setOpenDropdown(fieldKey)}
          onBlur={handleBlur}
          onChange={(e) => setValue(e.target.value)}
          placeholder={label}
          className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-gray-800 outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent ${
            error ? 'border-red-500' : 'border-gray-200'
          }`}
        />

        {openDropdown === fieldKey && filtered.length > 0 && (
          <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-xl mt-1 max-h-40 overflow-auto shadow">
            {filtered.map((item: any) => (
              <div
                key={item.code}
                onClick={() => onSelect(item)}
                className="p-3 hover:bg-gray-100 cursor-pointer"
              >
                {item.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
})

InputDropdownInner.displayName = 'InputDropdown'

const Address = () => {
  const router = useRouter()
  const supabase = createClient()
  const [form, setForm] = useState<AddressForm>({
    province: '',
    provinceCode: '',
    city: '',
    cityCode: '',
    barangay: '',
    barangayCode: '',
    street: '',
    blkLot: '',
    zipcode: '',
  })

  const [provinces, setProvinces] = useState<any[]>([])
  const [cities, setCities] = useState<any[]>([])
  const [barangays, setBarangays] = useState<any[]>([])

  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const mapRef = useRef<any>(null)

  // ======================
  // VALIDATION: Reset child dropdowns when parent selection is cleared
  // ======================
  useEffect(() => {
    if (!form.provinceCode && (form.city || form.cityCode || form.barangay || form.barangayCode)) {
      setForm((prev) => ({
        ...prev,
        city: '',
        cityCode: '',
        barangay: '',
        barangayCode: '',
        zipcode: '',
      }))
      setBarangays([])
    }
  }, [form.provinceCode, form.city, form.cityCode, form.barangay, form.barangayCode])

  useEffect(() => {
    if (!form.cityCode && form.barangay) {
      setForm((prev) => ({
        ...prev,
        barangay: '',
        barangayCode: '',
      }))
      setBarangays([])
    }
  }, [form.cityCode, form.barangay])

  // ======================
  // LOAD PROVINCES
  // ======================
  useEffect(() => {
    fetch('/api/psgc?type=provinces')
      .then((res) => res.json())
      .then(setProvinces)
  }, [])

  // ======================
  // LOAD CITIES
  // ======================
  useEffect(() => {
    if (!form.provinceCode) {
      setCities([])
      return
    }

    fetch(`/api/psgc?type=cities&code=${form.provinceCode}`)
      .then((res) => res.json())
      .then(setCities)
  }, [form.provinceCode])

  // ======================
  // LOAD BARANGAYS
  // ======================
  useEffect(() => {
    if (!form.cityCode) {
      setBarangays([])
      return
    }

    fetch(`/api/psgc?type=barangays&code=${form.cityCode}`)
      .then((res) => res.json())
      .then(setBarangays)
  }, [form.cityCode])

  // ======================
  // MAP → FORM UPDATE
  // ======================
  const handleLocationChange = useCallback((data: any) => {
    setForm((prev) => ({
      ...prev,
      province: data.province || prev.province,
      city: data.city || prev.city,
      barangay: data.barangay || prev.barangay,
      street: data.street || '',
      zipcode: data.zipcode || prev.zipcode,
    }))
  }, [])

  // ======================
  // BARANGAY SELECT → ZOOM MAP
  // ======================
  const handleBarangaySelect = useCallback(
    async (item: any) => {
      setForm((prev) => ({
        ...prev,
        barangay: item.name,
        barangayCode: item.code,
      }))

      // Use current form values for the address query
      const currentForm = {
        city: form.city,
        province: form.province,
      }

      const query = `${item.name}, ${currentForm.city}, ${currentForm.province}, Philippines`

      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}`
      )

      const data = await res.json()

      if (data.length > 0) {
        const { lat, lon, display_name } = data[0]

        const zipMatch = display_name.match(/\b\d{4}\b/)

        setForm((prev) => ({
          ...prev,
          zipcode: zipMatch ? zipMatch[0] : '',
        }))

        mapRef.current?.zoomToLocation?.(Number(lat), Number(lon))
      }

    setOpenDropdown(null)
  }, [form.city, form.province])

  // ======================
  // SET FORM FIELD HELPERS
  // ======================
  const setProvince = useCallback((v: string) => {
    setForm((prev) => ({ ...prev, province: v }))
  }, [])

  const setCity = useCallback((v: string) => {
    setForm((prev) => ({ ...prev, city: v }))
  }, [])

  const setBarangay = useCallback((v: string) => {
    setForm((prev) => ({ ...prev, barangay: v }))
  }, [])

  // ======================
  // PROVINCE SELECT HANDLER
  // ======================
  const handleProvinceSelect = useCallback((item: any) => {
    setForm((prev) => ({
      ...prev,
      province: item.name,
      provinceCode: item.code,
      city: '',
      cityCode: '',
      barangay: '',
      barangayCode: '',
      zipcode: '',
    }))
    setOpenDropdown(null)
  }, [])

  // ======================
  // CITY SELECT HANDLER
  // ======================
  const handleCitySelect = useCallback((item: any) => {
    setForm((prev) => ({
      ...prev,
      city: item.name,
      cityCode: item.code,
      barangay: '',
      barangayCode: '',
      zipcode: '',
    }))
    setOpenDropdown(null)
  }, [])

  // ======================
  // SUBMIT HANDLER
  // ======================
  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        setSubmitError('You must be logged in to save an address')
        router.push('/auth')
        return
      }

      // Validate required fields
      if (!form.province || !form.city || !form.barangay || !form.street || !form.blkLot) {
        setSubmitError('Please complete all fields: province, city, barangay, street, and block/lot')
        setIsSubmitting(false)
        return
      }

      const addressString = `${form.blkLot}, ${form.street}, ${form.barangay}, ${form.city}, ${form.province} ${form.zipcode}`.trim()

      const { error } = await supabase.from('addresses').insert({
        user_id: user.id,
        province: form.province,
        province_code: form.provinceCode,
        city: form.city,
        city_code: form.cityCode,
        barangay: form.barangay,
        barangay_code: form.barangayCode,
        street: form.street,
        block_lot: form.blkLot,
        zipcode: form.zipcode,
        full_address: addressString,
      })

      if (error) throw error

      router.back()
    } catch (error: any) {
      setSubmitError(error.message || 'Failed to save address')
    } finally {
      setIsSubmitting(false)
    }
  }, [supabase, router, form])

  const isFormValid = form.province && form.city && form.barangay && form.street && form.blkLot

  return (
    <div className="w-full h-full flex flex-col bg-gray-50">
      <header className="w-full h-16 bg-white flex items-center px-4 shadow-sm shrink-0">
        <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full hover:bg-gray-100">
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <h1 className="text-xl font-bold text-gray-800 ml-2">Add Address</h1>
      </header>

      <main className="flex-1 overflow-scroll px-4 pb-4">

        {submitError && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-sm text-red-600 text-center">{submitError}</p>
          </div>
        )}

        {/* MAP */}
        <div className="mt-4">
          <div className="aspect-square bg-white rounded-2xl overflow-hidden border border-gray-200">
            <PhilippinesMap
              ref={mapRef}
              onLocationChange={handleLocationChange}
            />
          </div>
        </div>

        {/* FORM */}
        <div className="mt-5 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">

          {/* Province */}
          <InputDropdownInner
            label="Province"
            value={form.province}
            setValue={setProvince}
            list={provinces}
            fieldKey="province"
            onSelect={handleProvinceSelect}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            disabled={false}
          />

          {/* City / Municipality */}
          <InputDropdownInner
            label="City / Municipality"
            value={form.city}
            setValue={setCity}
            list={cities}
            disabled={!form.provinceCode}
            fieldKey="city"
            onSelect={handleCitySelect}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          />

          {/* Barangay */}
          <InputDropdownInner
            label="Barangay"
            value={form.barangay}
            setValue={setBarangay}
            list={barangays}
            disabled={!form.cityCode}
            fieldKey="barangay"
            onSelect={handleBarangaySelect}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          />

          {/* Street */}
          <div>
            <label className='text-sm font-medium text-gray-700 mb-2 block'>Street Address <span className='text-red-500'>*</span></label>
            <textarea
              value={form.street}
              onChange={(e) =>
                setForm(prev => ({ ...prev, street: e.target.value }))
              }
              placeholder="House number, street name, building, etc."
              rows={2}
              className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-gray-800 outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent ${
                !form.street ? 'border-red-200' : 'border-gray-200'
              }`}
            />
          </div>

          {/* Blk/Lot */}
          <div>
            <label className='text-sm font-medium text-gray-700 mb-2 block'>Block / Lot <span className='text-red-500'>*</span></label>
            <input
              value={form.blkLot}
              onChange={(e) =>
                setForm(prev => ({ ...prev, blkLot: e.target.value }))
              }
              placeholder="Block number, lot number"
              className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-gray-800 outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent ${
                !form.blkLot ? 'border-red-200' : 'border-gray-200'
              }`}
            />
          </div>

          {/* Zipcode (readonly) */}
          <div>
            <label className='text-sm font-medium text-gray-700 mb-2 block'>Zip Code</label>
            <input
              value={form.zipcode}
              readOnly
              placeholder="Auto-filled from map"
              className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
            />
          </div>

        </div>

        {/* SUBMIT BUTTON */}
        <div className="mt-6">
          <button
            onClick={handleSubmit}
            disabled={!isFormValid || isSubmitting}
            className={`w-full py-3 font-semibold rounded-full transition-colors ${
              isFormValid && !isSubmitting
                ? 'bg-orange-500 text-white hover:bg-orange-600'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? 'Saving...' : 'Save Address'}
          </button>
        </div>

      </main>
    </div>
  )
}

export default Address
