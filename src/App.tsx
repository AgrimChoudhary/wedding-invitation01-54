
import { useState } from 'react'
import './App.css'
import Index from './pages/Index'
import Welcome from './pages/Welcome'
import NotFound from './pages/NotFound'
import WishingWall from './pages/WishingWall'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from './components/ui/toaster'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/invitation" element={<Welcome />} />
        <Route path="/wishing-wall" element={<WishingWall />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

export default App
