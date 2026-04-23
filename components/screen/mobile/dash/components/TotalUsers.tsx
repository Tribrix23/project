'use client'

import React, { useEffect, useState } from 'react'
import { MoreVertical, Ban, Mail, User, Shield, Eye, Edit, Trash2 } from 'lucide-react'

type UserStatus = 'active' | 'inactive' | 'pending'
type UserRole = 'buyer' | 'seller'

interface UserData {
  id: number
  fullName: string
  email: string
  status: UserStatus
  role: UserRole
  joinedDate: string
  phone: string
}

const TotalUsers = () => {
  const [users, setUsers] = useState<any[]>([]);

  const [selectedUser, setSelectedUser] = useState<UserData | null>(null)

  useEffect(() => {
    const load = async () => {
      const res = await fetch ('/api/getUsers');
      const data = await res.json();

      setUsers(data);
      console.log(data);
    }

    load();
  }, [])

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
    <div className="w-full min-h-screen bg-linear-to-b from-gray-50 to-gray-100 p-4 pb-20">
      {/* Search Header */}
      <div className="mb-5">
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full px-4 py-3 pl-11 rounded-xl border-0 bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-md transition-all"
          />
          <svg className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
          <p className="text-xl font-bold text-gray-800">{users.filter(u => u.status === 'active').length}</p>
          <p className="text-xs text-gray-500 font-medium">Active</p>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
          <p className="text-xl font-bold text-purple-600">{users.filter(u => u.role === 'seller').length}</p>
          <p className="text-xs text-gray-500 font-medium">Sellers</p>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
          <p className="text-xl font-bold text-yellow-600">{users.filter(u => u.status === 'pending').length}</p>
          <p className="text-xs text-gray-500 font-medium">Pending</p>
        </div>
      </div>

      {/* Users List */}
      <div className="space-y-3">
        {users.map((user) => (
          <div key={user.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              {/* User Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <h3 className="font-semibold text-gray-800 text-base truncate">{user.profile.first_name + " " + user.profile.middle_name + " " + user.profile.last_name}</h3>
                  {user.status === 'inactive' && (
                    <Ban size={14} className="text-red-500 shrink-0" />
                  )}
                </div>
                
                <p className="text-xs text-gray-400 truncate mb-3">{user.email}</p>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                    {getRoleIcon(user.role)}
                    {user.role === 'seller' ? 'Seller' : 'Buyer'}
                  </span>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      user.status === 'active' ? 'bg-green-500' : 
                      user.status === 'inactive' ? 'bg-red-500' : 'bg-yellow-500'
                    }`}></span>
                    {user.status ? user.status.charAt(0).toUpperCase() + user.status.slice(1) : 'Unknown'}
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
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="grid grid-cols-4 gap-2">
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
                  <button className="flex flex-col items-center gap-1.5 p-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                    <Eye size={18} className="text-purple-500" />
                    <span className="text-xs text-gray-600">View</span>
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