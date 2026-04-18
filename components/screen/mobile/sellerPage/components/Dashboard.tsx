import React from 'react'

type DashboardProps = {
  goBack?: () => void
}

const Dashboard = ({ goBack }: DashboardProps) => {
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard