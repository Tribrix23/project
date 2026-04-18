import React from 'react'

type TrackingProps = {
  goBack?: () => void
}

const Tracking = ({ goBack }: TrackingProps) => {
  return (
    <div>Tracking</div>
  )
}

export default Tracking