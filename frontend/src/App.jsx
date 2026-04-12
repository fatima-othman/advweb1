import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import ProjectsList from './pages/ProjectsList'
import CreateProject from './pages/CreateProject'
import SectionSelection from './pages/SectionSelection'

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-950 text-white">
        <Sidebar />
        <main className="flex-1 p-8">
          <Routes>
            <Route path="/projects" element={<ProjectsList />} />
            <Route path="/projects/new" element={<CreateProject />} />
            <Route path="/projects/:id/select" element={<SectionSelection />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App