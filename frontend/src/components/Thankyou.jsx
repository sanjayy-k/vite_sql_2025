import React from 'react'
import './thankyou.css'
import { useEffect } from 'react'

const Thankyou = () => {

  const name = localStorage.getItem("uname")
  useEffect(() => {
    //automatically reload
   // reload to change "uname" from login or signup
  }, [])


  return (
    <div className='cent'>
      
      <h1 className='t'>Thankyou <span className='namecolor'>{name} </span> 
       For Shopping with us. Come Visit Again...
      </h1>
      </div>
  )
}
export default Thankyou