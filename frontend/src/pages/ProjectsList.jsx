import { useNavigate } from 'react-router-dom'

// بيانات وهمية مؤقتة — لاحقاً بتيجي من الـ API
const mockProjects = [
  { id: 1, name: 'مطعم الشام', businessType: 'مطعم / كافيه', description: 'مطعم سوري في رام الله' },
  { id: 2, name: 'متجر إلكتروني', businessType: 'تجارة إلكترونية', description: 'بيع منتجات يدوية' },
]

function ProjectsList() {
  const navigate = useNavigate()

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-purple-400">مشاريعي</h1>
        <button
         onClick={() => navigate(`/projects/${project.id}/select`)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition"
        >
          + مشروع جديد
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {mockProjects.map(project => (
          <div
            key={project.id}
            className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex justify-between items-center hover:border-purple-700 transition"
          >
            <div>
              <h2 className="font-semibold text-white text-lg">{project.name}</h2>
              <p className="text-gray-400 text-sm mt-1">{project.businessType}</p>
              <p className="text-gray-500 text-sm mt-1">{project.description}</p>
            </div>
            <button
              onClick={() => navigate(`/projects/${project.id}`)}
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition"
            >
              فتح ←
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProjectsList