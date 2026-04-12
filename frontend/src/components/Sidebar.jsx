import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 p-6 flex flex-col gap-4">
      <h1 className="text-xl font-bold text-purple-400">StrategAI</h1>
      <Link to="/projects" className="text-gray-300 hover:text-white">
        📁 مشاريعي
      </Link>
      <Link to="/projects/new" className="text-gray-300 hover:text-white">
        ➕ مشروع جديد
      </Link>
    </aside>
  )
}

export default Sidebar