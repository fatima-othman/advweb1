import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()

  return (
    <nav className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <span
          onClick={() => navigate('/projects')}
          className="text-xl font-bold text-gray-900 cursor-pointer"
        >
          StrategAI
        </span>
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate('/projects')}
            className="text-gray-600 hover:text-gray-900 text-sm transition"
          >
            My Projects
          </button>
          <button
            onClick={() => navigate('/projects/new')}
            className="bg-[#1B4332] hover:bg-[#2D6A4F] text-white text-sm px-4 py-2 rounded-lg transition"
          >
            + New Project
          </button>
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900">taima</p>
            <p className="text-xs text-gray-400">taima@gmail.com</p>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar