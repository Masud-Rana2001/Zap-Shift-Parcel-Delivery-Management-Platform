import React from 'react'

function MyBtn1({children,className}) {
  return (
    <button className={`btn  rounded-2xl ${className}`}>{ children}</button>
  )
}

export default MyBtn1