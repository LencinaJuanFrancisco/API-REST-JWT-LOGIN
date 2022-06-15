import React from 'react'

export default function ErrorMessage(error) {
  return (
    <div>
        {error && <span>{error.message}</span>}
    </div>
  )
}
