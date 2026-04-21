'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { MoreVertical, Ban, Mail, User, Shield, Eye, Edit, Trash2 } from 'lucide-react'

type UserStatus = 'active' | 'inactive' | 'pending'
type UserRole = 'buyer' | 'seller'

interface UserData {
  id: number
  avatar: string
  fullName: string
  email: string
  status: UserStatus
  role: UserRole
  joinedDate: string
  phone: string
}

const TotalUsers = () => {
  const [users, setUsers] = useState<UserData[]>([
    { id: 1, avatar: '/favicon.png', fullName: 'Juan Dela Cruz', email: 'juan.delacruz@email.com', status: 'active', role: 'seller', joinedDate: '2024-01-15', phone: '+63 912 345 6789' },
    { id: 2, avatar: '/favicon.png', fullName: 'Maria Santos', email: 'maria.santos@email.com', status: 'active', role: 'buyer', joinedDate: '2024-02-20', phone: '+63 918 987 6543' },
    { id: 3, avatar: '/favicon.png', fullName: 'Pedro Reyes', email: 'pedro.reyes@email.com', status: 'inactive', role: 'seller', joinedDate: '2024-03-10', phone: '+63 921 456 7890' },
    { id: 4, avatar: '/favicon.png', fullName: 'Ana Garcia', email: 'ana.garcia@email.com', status: 'active', role: 'buyer', joinedDate: '2024-04-05', phone: '+63 925 123 4567' },
    { id: 5, avatar: '/favicon.png', fullName: 'Jose Martinez', email: 'jose.martinez@email.com', status: 'pending', role: 'seller', joinedDate: '2024-05-12', phone: '+63 928 234 5678' },
    { id: 6, avatar: '/favicon.png', fullName: 'Lisa Tan', email: 'lisa.tan@email.com', status: 'active', role: 'seller', joinedDate: '2024-06-01', phone: '+63 930 345 6789' },
    { id: 7, avatar: '/favicon.png', fullName: 'Mark Wong', email: 'mark.wong@email.com', status: 'active', role: 'buyer', joinedDate: '2024-06-15', phone: '+63 932 456 7890' },
    { id: 8, avatar: '/favicon.png', fullName: 'Sarah Lim', email: 'sarah.lim@email.com', status: 'inactive', role: 'buyer', joinedDate: '2024-07-20', phone: '+63 934 567 8901' },
  ])

  const [selectedUser, setSelectedUser] = useState<UserData | null>(null)

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
    return role === 'seller' ? <Shield size={12} /> : <User size={12} />
  }

  const getRoleColor = (role: UserRole) => {
    return role === 'seller' 
      ? 'bg-purple-100 text-purple-700' 
      : 'bg-blue-100 text-blue-700'
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 pb-20">
      {/* Search Header */}
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-white rounded-lg p-3 text-center shadow-sm">
          <p className="text-lg font-bold text-gray-800">{users.filter(u => u.status === 'active').length}</p>
          <p className="text-xs text-gray-500">Active</p>
        </div>
        <div className="bg-white rounded-lg p-3 text-center shadow-sm">
          <p className="text-lg font-bold text-purple-600">{users.filter(u => u.role === 'seller').length}</p>
          <p className="text-xs text-gray-500">Sellers</p>
        </div>
        <div className="bg-white rounded-lg p-3 text-center shadow-sm">
          <p className="text-lg font-bold text-yellow-600">{users.filter(u => u.status === 'pending').length}</p>
          <p className="text-xs text-gray-500">Pending</p>
        </div>
      </div>

      {/* Users List */}
      <div className="space-y-3">
        {users.map((user) => (
          <div key={user.id} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 shrink-0">
                <Image 
                  src={user.avatar} 
                  alt={user.fullName}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-800 text-sm truncate">{user.fullName}</h3>
                  {user.status === 'inactive' && (
                    <Ban size={14} className="text-red-500 shrink-0" />
                  )}
                </div>
                
                <p className="text-xs text-gray-500 truncate mb-2">{user.email}</p>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                    {getRoleIcon(user.role)}
                    {user.role === 'seller' ? 'Seller' : 'Buyer'}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      user.status === 'active' ? 'bg-green-500' : 
                      user.status === 'inactive' ? 'bg-red-500' : 'bg-yellow-500'
                    }`}></span>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => setSelectedUser(selectedUser?.id === user.id ? null : user)}
                className="p-1.5 rounded-lg hover:bg-gray-100 shrink-0"
              >
                <MoreVertical size={18} className="text-gray-400" />
              </button>
            </div>

            {/* Action Menu */}
            {selectedUser?.id === user.id && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="grid grid-cols-4 gap-2">
                  <button 
                    onClick={() => handleDeactivate(user.id)}
                    className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-50"
                  >
                    <Ban size={18} className={user.status === 'active' ? 'text-red-500' : 'text-green-500'} />
                    <span className="text-xs text-gray-600">
                      {user.status === 'active' ? 'Deactivate' : 'Activate'}
                    </span>
                  </button>
                  <button className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-50">
                    <Mail size={18} className="text-blue-500" />
                    <span className="text-xs text-gray-600">Email</span>
                  </button>
                  <button className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-50">
                    <Eye size={18} className="text-purple-500" />
                    <span className="text-xs text-gray-600">View</span>
                  </button>
                  <button 
                    onClick={() => handleDelete(user.id)}
                    className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-red-50"
                  >
                    <Trash2 size={18} className="text-red-500" />
                    <span className="text-xs text-red-600">Delete</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {users.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <User size={48} className="text-gray-300 mb-3" />
          <p className="text-gray-500 text-sm">No users found</p>
        </div>
      )}
    </div>
  )
}

export default TotalUsers