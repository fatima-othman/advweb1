import { Route, Routes } from 'react-router-dom'
import './App.css'
import { ROUTES } from '../config/routes.js'
import ReportPage from './Feature4/ReportPage.jsx'

function App() {
  return (
    <>
      <Routes>
        <Route path={ROUTES.home} element={<ReportPage />} />
        <Route path={ROUTES.report} element={<ReportPage />} />
      </Routes>
    </>
  )
}

export default App
