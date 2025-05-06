import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Layout() {
  return (
    <div className='h-screen w-full flex-col items-center justify-center'>
        <Navbar />
        <Outlet />
    </div>
  )
}

export default Layout