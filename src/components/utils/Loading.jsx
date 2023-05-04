import React from 'react'

export default function Loading() {
  return (
    <div className='h-screen w-screen overflow-hidden fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center bg-[#141414]'>
      <img src="loading.gif" alt="Loading" />
    </div>
  )
}
