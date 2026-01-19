import React from 'react'

function MyBtn2({children,className}) {
  return (
    <button className={`btn bg-white  ${className}`}>{ children}</button>
  )
}

export default MyBtn2