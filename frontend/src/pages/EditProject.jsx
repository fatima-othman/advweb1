import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const businessTypes = [
  'Restaurant / Café',
  'SaaS / App',
  'E-commerce',
  'Retail Store',
  'Professional Services',
  'Other'
]

const stages = ['Idea', 'Launch', 'Growth', 'Expansion']
const employeeOptions = ['1', '2–5', '6–20', '21–50', '50+']
const budgetOptions = ['Under $500', '$500–$2,000', '$2,000–$10,000', 'Over $10,000']
const languageOptions = ['العربية', 'English']

export default function EditProject() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [businessType, setBusinessType] = useState('')
  const [description, setDescription] = useState('')
  const [stage, setStage] = useState('')
  const [employees, setEmployees] = useState('')
  const [budget, setBudget] = useState('')
  const [market, setMarket] = useState('')
  const [competitors, setCompetitors] = useState('')
  const [language, setLanguage] = useState('')

  // نجيب بيانات المشروع من localStorage
  useEffect(() => {
    const projects = JSON.parse(localStorage.getItem('projects') || '[]')
    const project = projects.find(p => String(p.id) === String(id))
    if (!project) {
      navigate('/projects')
      return
    }
    setName(project.name || '')
    setBusinessType(project.businessType || '')
    setDescription(project.description || '')
    setStage(project.stage || '')
    setEmployees(project.employees || '')
    setBudget(project.budget || '')
    setMarket(project.market || '')
    setCompetitors(project.competitors || '')
    setLanguage(project.language || '')
  }, [id])

  function handleSave() {
    const projects = JSON.parse(localStorage.getItem('projects') || '[]')
    const updated = projects.map(p =>
      String(p.id) === String(id)
        ? { ...p, name, businessType, description, stage, employees, budget, market, competitors, language }
        : p
    )
    localStorage.setItem('projects', JSON.stringify(updated))
    navigate('/projects')
  }

  return (
    <div className="max-w-2xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/projects')}
          className="text-sm text-gray-400 hover:text-gray-600 mb-3 flex items-center gap-1 transition"
        >
          ← Back to Projects
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Edit Project</h1>
        <p className="text-gray-500 mt-1">Update your project information</p>
      </div>

      <div className="flex flex-col gap-6">

        {/* Basic Info */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-5">Basic Information</h2>
          <div className="flex flex-col gap-4">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Project Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-[#1B4332] focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Business Type</label>
              <div className="flex flex-wrap gap-2">
                {businessTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => setBusinessType(type)}
                    className={`px-4 py-2 rounded-full text-sm border transition ${
                      businessType === type
                        ? 'bg-[#1B4332] text-white border-[#1B4332]'
                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-[#1B4332] hover:text-[#1B4332]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-[#1B4332] focus:bg-white transition resize-none"
              />
            </div>

          </div>
        </div>

        {/* Business Details */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-5">Business Details</h2>
          <div className="flex flex-col gap-5">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Company Stage</label>
              <div className="flex flex-wrap gap-2">
                {stages.map(s => (
                  <button
                    key={s}
                    onClick={() => setStage(s)}
                    className={`px-4 py-2 rounded-full text-sm border transition ${
                      stage === s
                        ? 'bg-[#1B4332] text-white border-[#1B4332]'
                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-[#1B4332] hover:text-[#1B4332]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Employees</label>
              <div className="flex flex-wrap gap-2">
                {employeeOptions.map(e => (
                  <button
                    key={e}
                    onClick={() => setEmployees(e)}
                    className={`px-4 py-2 rounded-full text-sm border transition ${
                      employees === e
                        ? 'bg-[#1B4332] text-white border-[#1B4332]'
                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-[#1B4332] hover:text-[#1B4332]'
                    }`}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Monthly Budget</label>
              <div className="flex flex-wrap gap-2">
                {budgetOptions.map(b => (
                  <button
                    key={b}
                    onClick={() => setBudget(b)}
                    className={`px-4 py-2 rounded-full text-sm border transition ${
                      budget === b
                        ? 'bg-[#1B4332] text-white border-[#1B4332]'
                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-[#1B4332] hover:text-[#1B4332]'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Target Market</label>
              <input
                value={market}
                onChange={(e) => setMarket(e.target.value)}
                placeholder="e.g. Young adults 18–30 in Palestine"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-[#1B4332] focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Main Competitors</label>
              <input
                value={competitors}
                onChange={(e) => setCompetitors(e.target.value)}
                placeholder="e.g. Careem, Uber"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-[#1B4332] focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Report Language</label>
              <div className="flex gap-2">
                {languageOptions.map(l => (
                  <button
                    key={l}
                    onClick={() => setLanguage(l)}
                    className={`px-4 py-2 rounded-full text-sm border transition ${
                      language === l
                        ? 'bg-[#1B4332] text-white border-[#1B4332]'
                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-[#1B4332] hover:text-[#1B4332]'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={!name || !businessType}
          className="w-full bg-[#1B4332] hover:bg-[#2D6A4F] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition"
        >
          Save Changes
        </button>

      </div>
    </div>
  )
}