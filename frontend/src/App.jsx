import { Route, Routes } from 'react-router-dom'
import './App.css'
import ReportPage from './pages/ReportPage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<ReportPage />} />
      <Route path="/report" element={<ReportPage />} />
    </Routes>
  )
}

export default App
