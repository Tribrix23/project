import React from 'react'

type ProfileProps = {
  goBack?: () => void
}

const Profile = ({ goBack }: ProfileProps) => {
  return (
    <div>Profile</div>
  )
}

export default Profile