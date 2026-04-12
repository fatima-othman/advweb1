import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function ProjectsList() {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('projects') || '[]')
    setProjects(saved)
  }, [])

  return (
    <div>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, taima</h1>
        <p className="text-gray-500 mt-1">Your AI strategy dashboard</p>
      </div>

      {/* CTA Banner */}
      <div className="bg-[#1B4332] rounded-2xl p-6 flex justify-between items-center mb-8">
        <div>
          <p className="text-white font-bold text-xl">Generate New Strategy</p>
          <p className="text-green-200 text-sm mt-1">Create a comprehensive business strategy report in minutes</p>
        </div>
        <button
          onClick={() => navigate('/projects/new')}
          className="bg-white text-[#1B4332] font-semibold px-5 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          + New Report
        </button>
      </div>

      {/* Projects */}
      {projects.length === 0 ? (
        <div className="text-center text-gray-400 mt-20">
          <p className="text-4xl mb-4">📁</p>
          <p>No projects yet — create your first one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {projects.map(project => (
            <div
              key={project.id}
              className="bg-white border border-gray-200 rounded-xl p-5 flex justify-between items-center hover:border-[#2D6A4F] transition shadow-sm"
            >
              <div>
                <h2 className="font-semibold text-gray-900 text-lg">{project.name}</h2>
                <p className="text-gray-400 text-sm mt-1">{project.businessType}</p>
                <p className="text-gray-400 text-sm">{project.description}</p>
              </div>
              <div className="flex gap-2">
  <button
    onClick={() => navigate(`/projects/${project.id}/edit`)}
    className="border border-gray-200 hover:border-[#1B4332] hover:text-[#1B4332] text-gray-500 px-4 py-2 rounded-lg text-sm transition"
  >
    Edit
  </button>
  <button
    onClick={() => navigate(`/projects/${project.id}/select`)}
    className="bg-[#1B4332] hover:bg-[#2D6A4F] text-white px-4 py-2 rounded-lg text-sm transition"
  >
    Open →
  </button>
</div>
            </div>
            
            
          ))}
        </div>
      )}
    </div>
  )
}

export default ProjectsList