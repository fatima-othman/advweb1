import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import ProjectsList from './pages/Feature 3/ProjectsList'
import CreateProject from './pages/Feature 3/CreateProject'
import SectionSelection from './pages/Feature 3/SectionSelection'
import EditProject from './pages/Feature 3/EditProject'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#F0F0E8]">
        <Navbar />
        <main className="max-w-5xl mx-auto px-6 py-10">
          <Routes>
            <Route path="/projects" element={<ProjectsList />} />
            <Route path="/projects/new" element={<CreateProject />} />
            <Route path="/projects/:id/select" element={<SectionSelection />} />
            <Route path="/projects/:id/edit" element={<EditProject />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
