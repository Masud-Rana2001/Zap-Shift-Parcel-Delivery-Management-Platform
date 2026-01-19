import React from 'react'

function Loading() {
  return (
   <div className="flex flex-col items-center justify-center h-screen text-center">
  <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  <p className="mt-3 text-blue-600 font-semibold tracking-wide">Loading...</p>
</div>


  )
}

export default Loading