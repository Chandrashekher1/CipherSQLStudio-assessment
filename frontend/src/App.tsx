import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import { Toaster } from 'sonner'
import { LandingPage } from './pages/LandingPage'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/workspace/:id" element={<Dashboard />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
       <Toaster />
    </div>
  )
}

export default App
