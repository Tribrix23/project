"use client"

import PhilippinesMap from '@/components/ui/Map'
import React, { useState, useEffect, useRef } from 'react'

const Address = () => {
  const [form, setForm] = useState({
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

  const mapRef = useRef<any>(null)

  // ======================
  // LOAD PROVINCES
  // ======================
  useEffect(() => {
    fetch("/api/psgc?type=provinces")
      .then(res => res.json())
      .then(setProvinces)
  }, [])

  // ======================
  // LOAD CITIES
  // ======================
  useEffect(() => {
    if (!form.provinceCode) return

    fetch(`/api/psgc?type=cities&code=${form.provinceCode}`)
      .then(res => res.json())
      .then(setCities)

    setForm(prev => ({
      ...prev,
      city: '',
      cityCode: '',
      barangay: '',
      barangayCode: '',
      zipcode: ''
    }))

    setBarangays([])
  }, [form.provinceCode])

  // ======================
  // LOAD BARANGAYS
  // ======================
  useEffect(() => {
    if (!form.cityCode) return

    fetch(`/api/psgc?type=barangays&code=${form.cityCode}`)
      .then(res => res.json())
      .then(setBarangays)

    setForm(prev => ({
      ...prev,
      barangay: '',
      barangayCode: '',
      zipcode: ''
    }))
  }, [form.cityCode])

  // ======================
  // MAP → FORM UPDATE
  // ======================
  const handleLocationChange = (data: any) => {
    setForm(prev => ({
      ...prev,
      province: data.province || prev.province,
      city: data.city || prev.city,
      barangay: data.barangay || prev.barangay,
      street: data.street || '',
      zipcode: data.zipcode || prev.zipcode,
    }))
  }

  // ======================
  // BARANGAY SELECT → ZOOM MAP
  // ======================
  const handleBarangaySelect = async (item: any) => {
    setForm(prev => ({
      ...prev,
      barangay: item.name,
      barangayCode: item.code,
    }))

    const query = `${item.name}, ${form.city}, ${form.province}, Philippines`

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
    )

    const data = await res.json()

    if (data.length > 0) {
      const { lat, lon, display_name } = data[0]

      const zipMatch = display_name.match(/\b\d{4}\b/)

      setForm(prev => ({
        ...prev,
        zipcode: zipMatch ? zipMatch[0] : ''
      }))

      mapRef.current?.zoomToLocation?.(Number(lat), Number(lon))
    }

    setOpenDropdown(null)
  }

  // ======================
  // FILTER HELPERS
  // ======================
  const filterList = (list: any[], value: string) =>
    list.filter(item =>
      item.name.toLowerCase().includes(value.toLowerCase())
    )

  // ======================
  // INPUT FIELD COMPONENT
  // ======================
  const InputDropdown = ({
    label,
    value,
    setValue,
    list,
    onSelect,
    disabled = false,
    fieldKey,
  }: any) => {
    const filtered = filterList(list, value)

    return (
      <div className="relative">
        <input
          value={value}
          disabled={disabled}
          onFocus={() => setOpenDropdown(fieldKey)}
          onChange={(e) => setValue(e.target.value)}
          placeholder={label}
          className="w-full h-12 px-4 bg-gray-50 border rounded-xl"
        />

        {openDropdown === fieldKey && filtered.length > 0 && (
          <div className="absolute z-10 w-full bg-white border rounded-xl mt-1 max-h-40 overflow-auto shadow">
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
    )
  }

  return (
    <div className="w-full h-full flex flex-col bg-gray-50">
      <header className="h-16 bg-white flex items-center px-4 border-b">
        <h1 className="text-xl font-bold">Address</h1>
      </header>

      <main className="flex-1 overflow-scroll">

        {/* MAP */}
        <div className="p-4">
          <div className="aspect-square bg-white rounded-2xl overflow-hidden">
            <PhilippinesMap
              ref={mapRef}
              onLocationChange={handleLocationChange}
            />
          </div>
        </div>

        {/* FORM */}
        <div className="px-4 pb-4 space-y-4">

          {/* Province */}
          <InputDropdown
            label="Province"
            value={form.province}
            setValue={(v: string) =>
              setForm(prev => ({ ...prev, province: v }))
            }
            list={provinces}
            fieldKey="province"
            onSelect={(item: any) => {
              setForm(prev => ({
                ...prev,
                province: item.name,
                provinceCode: item.code,
              }))
              setOpenDropdown(null)
            }}
          />

          {/* City */}
          <InputDropdown
            label="City"
            value={form.city}
            setValue={(v: string) =>
              setForm(prev => ({ ...prev, city: v }))
            }
            list={cities}
            disabled={!form.provinceCode}
            fieldKey="city"
            onSelect={(item: any) => {
              setForm(prev => ({
                ...prev,
                city: item.name,
                cityCode: item.code,
              }))
              setOpenDropdown(null)
            }}
          />

          {/* Barangay */}
          <InputDropdown
            label="Barangay"
            value={form.barangay}
            setValue={(v: string) =>
              setForm(prev => ({ ...prev, barangay: v }))
            }
            list={barangays}
            disabled={!form.cityCode}
            fieldKey="barangay"
            onSelect={handleBarangaySelect}
          />

          {/* Street */}
          <input
            value={form.street}
            onChange={(e) =>
              setForm(prev => ({ ...prev, street: e.target.value }))
            }
            placeholder="Street (optional)"
            className="w-full h-12 px-4 bg-gray-50 border rounded-xl"
          />

          {/* Blk/Lot */}
          <input
            value={form.blkLot}
            onChange={(e) =>
              setForm(prev => ({ ...prev, blkLot: e.target.value }))
            }
            placeholder="Blk / Lot"
            className="w-full h-12 px-4 bg-gray-50 border rounded-xl"
          />

          {/* Zipcode */}
          <input
            value={form.zipcode}
            readOnly
            className="w-full h-12 px-4 bg-gray-200 border rounded-xl cursor-not-allowed"
          />

        </div>
      </main>
    </div>
  )
}

export default Address