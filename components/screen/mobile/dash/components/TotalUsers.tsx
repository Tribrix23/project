'use client'

import React, { useEffect, useState } from 'react'
import { MoreVertical, Ban, Mail, User, Shield, Eye, Edit, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

type UserStatus = 'active' | 'inactive' | 'pending'
type UserRole = 'BUYER' | 'SELLER' | 'PENDING'

interface UserData {
  id: number
  fullName: string
  email: string
  status: UserStatus
  role: UserRole
  joinedDate: string
  phone: string
}

type Counts = {
  seller: number;
  buyer: number;
  pending: number;
  active: number;
  inactive: number;
  total: number;
};

const TotalUsers = () => {
  const router = useRouter()
  const [users, setUsers] = useState<any[]>([])
  const [count, setCounts] = useState<Counts | null>(null)
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const itemsPerPage = 10

  const load = async (page: number, query: string = '') => {
    setIsLoading(true)
    const params = new URLSearchParams({ page: page.toString(), limit: itemsPerPage.toString() })
    if (query.trim()) {
      params.append('search', query.trim())
    }
    const res = await fetch(`/api/getUsers?${params.toString()}`)
    const data = await res.json()
    setUsers(data.users || [])
    setCounts(data.counts)
    setTotalPages(data.pagination?.totalPages || 1)
    setCurrentPage(data.pagination?.page || 1)
    setIsLoading(false)
  }

  useEffect(() => {
    load(1)
  }, [])

   const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
     if (e.key === 'Enter') {
       load(1, searchQuery)
       setCurrentPage(1)
       setSelectedUser(null)
     }
   }

   const handlePageChange = (page: number) => {
     load(page, searchQuery)
     setSelectedUser(null)
   }

   const handleDeactivate = (userId: number) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ))
    setSelectedUser(null)
  }

  const handleDelete = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId))
    setSelectedUser(null)
  }

  const getStatusColor = (status: UserStatus) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700'
      case 'inactive': return 'bg-red-100 text-red-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
    }
  }

  const getRoleIcon = (role: UserRole) => {
    return role === 'SELLER' ? <Shield size={12} /> : <User size={12} />
  }

  const getRoleColor = (role: UserRole) => {
    return role === 'SELLER' 
      ? 'bg-purple-100 text-purple-700' 
      : 'bg-blue-100 text-blue-700'
  }

  return (
    <div className="w-full min-h-screen bg-linear-to-b from-gray-50 to-gray-100 p-4 pb-20">
      {/* Search Header */}
      <div className="mb-5">
         <div className="relative">
           <input
             type="text"
             placeholder="Search users..."
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             onKeyDown={handleSearchKeyDown}
             className="w-full px-4 py-3 pl-11 rounded-xl border-0 bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-md transition-all"
           />
          <svg className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

        <div className="grid grid-cols-3 gap-3 mb-5">
         <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
           <p className="text-xl font-bold text-gray-800">{count?.active}</p>
           <p className="text-xs text-gray-500 font-medium">Active</p>
         </div>
         <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
           <p className="text-xl font-bold text-purple-600">{count?.seller}</p>
           <p className="text-xs text-gray-500 font-medium">Sellers</p>
         </div>
         <div
           onClick={() => router.push('/dash?page=users&f=pending')}
           className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
         >
           <p className="text-xl font-bold text-yellow-600">{count?.pending}</p>
           <p className="text-xs text-gray-500 font-medium">Pending</p>
         </div>
       </div>

      {/* Users List - Scrollable container */}
      <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
        {isLoading ? (
          Array.from({ length: itemsPerPage }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 animate-pulse">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </div>
                  <div className="h-3 bg-gray-200 rounded w-48 mb-3"></div>
                  <div className="flex gap-2">
                    <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                  </div>
                </div>
                <div className="h-8 w-8 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          ))
        ) : (
          users.map((user) => (
          <div key={user.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              {/* User Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <h3 className="font-semibold text-gray-800 text-base truncate">{user.profile.first_name + " " + user.profile.middle_name + " " + user.profile.last_name}</h3>
                   {String(user.isActive) === 'false' && (
                     <Ban size={14} className="text-red-500 shrink-0" />
                   )}
                </div>
                
                <p className="text-xs text-gray-400 truncate mb-3">{user.email}</p>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                    {getRoleIcon(user.profile.sellerStatus)}
                    {user.profile.sellerStatus === 'BUYER' ? 'BUYER' : user.profile.sellerStatus === 'SELLER' ? 'SELLER' : 'PENDING'}
                  </span>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        String(user.isActive) === 'true' ? 'bg-green-500' : 
                        String(user.isActive) === 'false' ? 'bg-red-500' : 'bg-yellow-500'
                      }`}></span>
                      {String(user.isActive) === 'true' ? 'Active' : 'Deactive'}
                    </span>
                </div>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => setSelectedUser(selectedUser?.id === user.id ? null : user)}
                className="p-2 rounded-lg hover:bg-gray-100 shrink-0 transition-colors"
              >
                <MoreVertical size={18} className="text-gray-400" />
              </button>
            </div>

            {/* Action Menu */}
            {selectedUser?.id === user.id && (
              <div className="mt-3 pt-3 border-t border-gray-100 ">
                <div className="gap-2 flex flex-row justify-between">
                  <button 
                    onClick={() => handleDeactivate(user.id)}
                    className="flex flex-col items-center gap-1.5 p-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Ban size={18} className={user.status === 'active' ? 'text-red-500' : 'text-green-500'} />
                    <span className="text-xs text-gray-600">
                      {user.status === 'active' ? 'Deactivate' : 'Activate'}
                    </span>
                  </button>
                  <button className="flex flex-col items-center gap-1.5 p-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                    <Mail size={18} className="text-blue-500" />
                    <span className="text-xs text-gray-600">Email</span>
                  </button>
                  <button 
                    onClick={() => handleDelete(user.id)}
                    className="flex flex-col items-center gap-1.5 p-2.5 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={18} className="text-red-500" />
                    <span className="text-xs text-red-600">Delete</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )))}
      </div>

       {/* Empty State */}
       {users.length === 0 && !isLoading && (
         <div className="flex flex-col items-center justify-center py-12">
           <User size={48} className="text-gray-300 mb-3" />
           <p className="text-gray-500 text-sm">No users found</p>
         </div>
       )}

       {/* Pagination */}
       {!isLoading && totalPages > 1 && (
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
       {count && (
         <p className="text-center text-xs text-gray-400 mt-2">
           Showing {users.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-
           {Math.min(currentPage * itemsPerPage, count.total)} of {count.total} users
         </p>
       )}
    </div>
  )
}

export default TotalUsers