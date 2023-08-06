import React from 'react'
import { Outlet } from 'react-router-dom'
import Dashboard from './admin'

export default function RootLayout() {
  return (
    <div>RootLayout
      <Dashboard />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
