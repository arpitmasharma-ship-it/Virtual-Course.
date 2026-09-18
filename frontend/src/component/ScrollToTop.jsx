import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const pathName = useLocation()

useEffect(()=>{
/* Window ko Upper Scroll Krana ka liya */
window.scrollTo({top:0 , behavior:'smooth'})

    
},[pathName])
}

export default ScrollToTop
