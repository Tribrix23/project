'use client'

import React, { useEffect, useState } from 'react'
import { MoreVertical, User, Check, X, Eye } from 'lucide-react'
import { useRouter } from 'next/navigation'

type UserRole = 'BUYER' | 'SELLER' | 'PENDING'

interface UserData {
  id: string
  email: string
  first_name: string
  middle_name: string
  last_name: string
  sellerStatus: UserRole
  isActive: boolean
  profile?: {
    first_name?: string
    last_name?: string
  }
}

const Pending = () => {
  const router = useRouter()
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

  const handleApprove = async (userId: string) => {
    try {
      const res = await fetch('/api/approveSeller', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, action: 'approve' }),
      })
      
      if (!res.ok) {
        const errorData = await res.json()
        console.error('Failed to approve seller:', errorData)
        return
      }
      
      const user = users.find(u => u.id === userId)
      if (user) {
        const storeRes = await fetch(`/api/reviewApi?userId=${userId}`)
        const storeData = await storeRes.json()
        const store = storeData.sellerStore
        
        try {
          const emailRes = await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: user.email,
              subject: 'Seller Application Approved - Construco',
              htmlContent: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Seller Application Approved</title>
                </head>
                <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f6f3e7; min-height: 100vh;">
                  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f6f3e7; min-height: 100vh;">
                    <tr>
                      <td align="center" style="padding: 40px 20px;">
                        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 520px; background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); border-radius: 20px 20px 0 0;">
                          <tr>
                            <td align="center" style="padding: 40px 40px 60px;">
                              <img src="https://construco.devctr.com/favicon.png" alt="Construco" width="80" style="display: block; width: 80px; height: 80px; border-radius: 16px;">
                              <h1 style="font-size: 32px; font-weight: 700; color: #ffffff; margin: 24px 0 8px; letter-spacing: -0.5px;">
                                Congratulations!
                              </h1>
                              <p style="font-size: 16px; color: #ffffff; opacity: 0.9; margin: 0;">
                                Your seller application has been approved
                              </p>
                            </td>
                          </tr>
                        </table>
                        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 520px; background-color: #ffffff; border-radius: 0 0 20px 20px; box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1);">
                          <tr>
                            <td style="padding: 40px 40px 32px;">
                              <p style="font-size: 16px; line-height: 1.8; color: #525252; margin: 0 0 24px; text-align: center;">
                                Dear ${user.first_name} ${user.last_name}, your seller application has been approved. You can now start selling on Construco!
                              </p>
                              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fafaf9; border-radius: 16px; margin-bottom: 32px;">
                                <tr>
                                  <td style="padding: 24px;">
                                    <p style="font-size: 14px; color: #171717; margin: 0 0 8px; font-weight: 500;">
                                      Store Details:
                                    </p>
                                    <p style="font-size: 14px; color: #525252; margin: 0;">
                                      <strong>Store Name:</strong> ${store?.name || 'N/A'}<br>
                                      <strong>Business Type:</strong> ${store?.business_type || 'N/A'}<br>
                                      <strong>Location:</strong> ${[store?.street, store?.barangay, store?.city, store?.province].filter(Boolean).join(', ') || 'N/A'}
                                    </p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td align="center" style="padding: 0 40px 32px;">
<a href="https://construco.devctr.com" style="display: inline-block; background: linear-gradient(to right, #f97316, #ea580c); color: #ffffff; padding: 18px 48px; font-size: 16px; font-weight: 600; text-decoration: none; border-radius: 9999px; box-shadow: 0 10px 25px -5px rgba(249, 115, 22, 0.4);">
                                 Go to Website
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 0 40px;">
                              <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                  <td style="border-top: 1px solid #e5e5e5;"></td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 24px 40px 40px;">
                              <p style="font-size: 14px; color: #a3a3a3; margin: 0; text-align: center;">
                                Having trouble? Contact us at <a href="mailto:support@devctr.com" style="color: #f97316; text-decoration: none;">support@devctr.com</a>
                              </p>
                            </td>
                          </tr>
                        </table>
                        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 520px;">
                          <tr>
                            <td style="padding: 32px 0 24px; text-align: center;">
                              <p style="font-size: 14px; color: #a3a3a3; margin: 0;">
                                &copy; 2026 Construco. All rights reserved.
                              </p>
                              <p style="font-size: 13px; color: #a3a3a3; margin: 8px 0 0;">
                                construco.devctr.com
                              </p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </body>
                </html>
              `,
            }),
          })
          const emailData = await emailRes.json()
          
        } catch (emailErr) {
          console.error('Failed to send email:', emailErr)
        }
      }
      load(1)
      setSelectedUser(null)
    } catch (err) {
      console.error('Error approving seller:', err)
    }
  }

  const handleReject = async (userId: string) => {
    try {
      const res = await fetch('/api/approveSeller', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, action: 'reject' }),
      })
      
      if (!res.ok) {
        const errorData = await res.json()
        console.error('Failed to reject seller:', errorData)
        return
      }
      
      const user = users.find(u => u.id === userId)
      if (user) {
        const storeRes = await fetch(`/api/reviewApi?userId=${userId}`)
        const storeData = await storeRes.json()
        const store = storeData.sellerStore
        
        try {
          const emailRes = await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: user.email,
              subject: 'Seller Application Declined - Construco',
              htmlContent: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Seller Application Declined</title>
                </head>
                <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f6f3e7; min-height: 100vh;">
                  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f6f3e7; min-height: 100vh;">
                    <tr>
                      <td align="center" style="padding: 40px 20px;">
                        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 520px; background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); border-radius: 20px 20px 0 0;">
                          <tr>
                            <td align="center" style="padding: 40px 40px 60px;">
                              <img src="https://construco.devctr.com/favicon.png" alt="Construco" width="80" style="display: block; width: 80px; height: 80px; border-radius: 16px;">
                              <h1 style="font-size: 32px; font-weight: 700; color: #ffffff; margin: 24px 0 8px; letter-spacing: -0.5px;">
                                Application Update
                              </h1>
                              <p style="font-size: 16px; color: #ffffff; opacity: 0.9; margin: 0;">
                                Your seller application status
                              </p>
                            </td>
                          </tr>
                        </table>
                        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 520px; background-color: #ffffff; border-radius: 0 0 20px 20px; box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1);">
                          <tr>
                            <td style="padding: 40px 40px 32px;">
                              <p style="font-size: 16px; line-height: 1.8; color: #525252; margin: 0 0 24px; text-align: center;">
                                Dear ${user.first_name} ${user.last_name}, we regret to inform you that your seller application has been declined.
                              </p>
                              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fafaf9; border-radius: 16px; margin-bottom: 32px;">
                                <tr>
                                  <td style="padding: 24px;">
                                    <p style="font-size: 14px; color: #171717; margin: 0; font-weight: 500;">
                                      Store Details:
                                    </p>
                                    <p style="font-size: 14px; color: #525252; margin: 8px 0 0;">
                                      <strong>Store Name:</strong> ${store?.name || 'N/A'}<br>
                                      <strong>Business Type:</strong> ${store?.business_type || 'N/A'}<br>
                                      <strong>Location:</strong> ${[store?.street, store?.barangay, store?.city, store?.province].filter(Boolean).join(', ') || 'N/A'}
                                    </p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td align="center" style="padding: 0 40px 32px;">
                              <a href="mailto:support@devctr.com" style="display: inline-block; background: linear-gradient(to right, #f97316, #ea580c); color: #ffffff; padding: 18px 48px; font-size: 16px; font-weight: 600; text-decoration: none; border-radius: 9999px; box-shadow: 0 10px 25px -5px rgba(249, 115, 22, 0.4);">
                                Contact Support
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 0 40px;">
                              <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                  <td style="border-top: 1px solid #e5e5e5;"></td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 24px 40px 40px;">
                              <p style="font-size: 14px; color: #a3a3a3; margin: 0 0 8px; text-align: center;">
                                If you believe this was a mistake, please reach out to our support team.
                              </p>
                              <p style="font-size: 13px; color: #a3a3a3; margin: 0; text-align: center;">
                                support@devctr.com
                              </p>
                            </td>
                          </tr>
                        </table>
                        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 520px;">
                          <tr>
                            <td style="padding: 32px 0 24px; text-align: center;">
                              <p style="font-size: 14px; color: #a3a3a3; margin: 0;">
                                &copy; 2026 Construco. All rights reserved.
                              </p>
                              <p style="font-size: 13px; color: #a3a3a3; margin: 8px 0 0;">
                                construco.devctr.com
                              </p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </body>
                </html>
              `,
            }),
          })
          const emailData = await emailRes.json()
          
        } catch (emailErr) {
          console.error('Failed to send email:', emailErr)
        }
      }
      load(1)
      setSelectedUser(null)
    } catch (err) {
      console.error('Error rejecting seller:', err)
    }
  }

const handleReview = (userId: string) => {
    router.push(`/dash?page=preview&userId=${userId}`)
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
