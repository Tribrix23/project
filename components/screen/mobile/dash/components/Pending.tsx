'use client'

import React, { useEffect, useState } from 'react'
import { MoreVertical, User, Shield, Check, X, Eye } from 'lucide-react'

type UserRole = 'BUYER' | 'SELLER' | 'PENDING'

interface UserData {
  id: string
  email: string
  first_name: string
  middle_name: string
  last_name: string
  sellerStatus: UserRole
  isActive: boolean
}

const Pending = () => {
  const [users, setUsers] = useState<UserData[]>([])
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const itemsPerPage = 10

  const load = async (page: number) => {
    setIsLoading(true)
    const params = new URLSearchParams({
      page: page.toString(),
      limit: itemsPerPage.toString(),
      status: 'PENDING',
    })
    const res = await fetch(`/api/getUsers?${params.toString()}`)
    const data = await res.json()
    setUsers((data.users || []).map((u: any) => ({
      ...u,
      id: u.id.toString(),
    })))
    setTotalPages(data.pagination?.totalPages || 1)
    setCurrentPage(data.pagination?.page || 1)
    setIsLoading(false)
  }

  useEffect(() => {
    load(1)
  }, [])

  const handlePageChange = (page: number) => {
    load(page)
    setSelectedUser(null)
  }

  const getGradient = (firstLetter: string) => {
    const gradients = [
      'from-blue-400 to-indigo-500',
      'from-purple-400 to-pink-500',
      'from-green-400 to-emerald-500',
      'from-amber-400 to-yellow-500',
      'from-cyan-400 to-blue-500',
      'from-rose-400 to-red-500',
      'from-orange-400 to-amber-500',
      'from-teal-400 to-green-500',
    ]
    const index = firstLetter.toUpperCase().charCodeAt(0) % gradients.length
    return gradients[index]
  }

  const getRoleIcon = (role: UserRole) => {
    return role === 'SELLER' || role === 'PENDING' ? (
      <Shield size={12} />
    ) : (
      <User size={12} />
    )
  }

  const handleApprove = (userId: string) => {
    alert(`Approve user ${userId}`)
    setSelectedUser(null)
  }

  const handleReject = (userId: string) => {
    alert(`Reject user ${userId}`)
    setSelectedUser(null)
  }

  const handleReview = (userId: string) => {
    alert(`Review user ${userId}`)
    setSelectedUser(null)
  }

  return (
    <div className="w-full min-h-screen bg-linear-to-b from-gray-50 to-gray-100 p-4 pb-20">
      {/* User Cards - Scrollable container */}
      <div className="space-y-3 max-h-[75vh] overflow-y-auto pr-2 mb-4">
        {isLoading ? (
          Array.from({ length: itemsPerPage }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 animate-pulse"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-12 h-12 rounded-full bg-gray-200" />
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-48" />
                    <div className="h-3 bg-gray-200 rounded w-64" />
                  </div>
                </div>
                <div className="h-8 w-8 bg-gray-200 rounded-lg" />
              </div>
            </div>
          ))
        ) : users.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <User size={48} className="text-gray-300 mb-3" />
            <p className="text-gray-500 text-sm">No pending users found</p>
          </div>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                {/* User Info */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={`w-12 h-12 rounded-full bg-linear-to-br ${getGradient(user.first_name?.[0] || user.email[0] || '?')} flex items-center justify-center shrink-0`}>
                    <span className="text-white font-semibold text-lg">
                      {user.first_name?.[0] || user.email[0]?.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 text-base truncate">
                      {user.first_name} {user.middle_name} {user.last_name}
                    </h3>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 mt-1">
                      <User size={10} />
                      Pending
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() =>
                    setSelectedUser(selectedUser?.id === user.id ? null : user)
                  }
                  className="p-2 rounded-lg hover:bg-gray-100 shrink-0 transition-colors"
                >
                  <MoreVertical size={20} className="text-gray-600" />
                </button>
              </div>

              {/* Action Menu */}
              {selectedUser?.id === user.id && (
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handleApprove(user.id)}
                      className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                        <Check size={20} className="text-white" />
                      </div>
                      <span className="text-xs font-medium text-green-700">
                        Approve
                      </span>
                    </button>
                    <button
                      onClick={() => handleReject(user.id)}
                      className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-red-50 hover:bg-red-100 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
                        <X size={20} className="text-white" />
                      </div>
                      <span className="text-xs font-medium text-red-700">Reject</span>
                    </button>
                    <button
                      onClick={() => handleReview(user.id)}
                      className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                        <Eye size={20} className="text-white" />
                      </div>
                      <span className="text-xs font-medium text-blue-700">
                        Review
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        ))}
      </div>

      {/* Pagination */}
      {!isLoading && totalPages > 1 && users.length > 0 && (
        <div className="flex items-center justify-between mt-4 px-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum: number
              if (totalPages <= 5) {
                pageNum = i + 1
              } else if (currentPage <= 3) {
                pageNum = i + 1
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = currentPage - 2 + i
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-8 h-8 text-sm font-medium rounded-lg transition-colors ${
                    pageNum === currentPage
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-600 bg-white border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </button>
              )
            })}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}

      {/* Page Info */}
      {users.length > 0 && (
        <p className="text-center text-xs text-gray-400 mt-2">
          Showing{' '}
          {users.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-
          {Math.min(currentPage * itemsPerPage, users.length)} of {users.length}{' '}
          pending users
        </p>
      )}
    </div>
  )
}

export default Pending
