import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const sections = [
  { id: 'swot', name: 'SWOT Analysis', description: 'Strengths, weaknesses, opportunities & threats', cost: 5, icon: '◈' },
  { id: 'pricing', name: 'Pricing Strategy', description: 'Best pricing model for your business', cost: 5, icon: '◎' },
  { id: 'risk', name: 'Risk Analysis', description: 'Potential risks and how to handle them', cost: 5, icon: '◬' },
  { id: 'kpi', name: 'KPI Recommendations', description: 'Key metrics to measure your success', cost: 10, icon: '◉' },
  { id: 'marketing', name: 'Marketing Plan', description: 'A complete marketing strategy', cost: 20, icon: '◆' },
  { id: 'growth', name: 'Growth Roadmap', description: 'Clear expansion plan for the future', cost: 20, icon: '▲' },
]

const BUNDLE_COST = 50
const USER_CREDITS = 65

export default function SectionSelection() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [selected, setSelected] = useState([])
  const [isBundle, setIsBundle] = useState(false)

  function toggleSection(sectionId) {
    if (isBundle) return
    setSelected(prev =>
      prev.includes(sectionId)
        ? prev.filter(s => s !== sectionId)
        : [...prev, sectionId]
    )
  }

  function toggleBundle() {
    setIsBundle(!isBundle)
    setSelected([])
  }

  const total = isBundle
    ? BUNDLE_COST
    : selected.reduce((sum, sid) => sum + sections.find(s => s.id === sid).cost, 0)

  const canGenerate = (isBundle || selected.length > 0) && total <= USER_CREDITS

  function handleGenerate() {
    console.log('Sections:', isBundle ? 'bundle' : selected)
    console.log('Cost:', total)
    // لاحقاً بنرسل للـ API
  }

  return (
    <div className="max-w-3xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Choose Report Sections</h1>
        <p className="text-gray-500 mt-1">
          Your balance:
          <span className="text-gray-900 font-semibold ml-1">{USER_CREDITS} credits</span>
        </p>
      </div>

      {/* Bundle */}
      <div
        onClick={toggleBundle}
        className={`mb-5 p-5 rounded-2xl border-2 cursor-pointer transition ${
          isBundle
            ? 'border-[#1B4332] bg-[#1B4332]/5'
            : 'border-gray-200 bg-white hover:border-[#2D6A4F]'
        }`}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${
              isBundle ? 'border-[#1B4332] bg-[#1B4332]' : 'border-gray-300'
            }`}>
              {isBundle && <div className="w-2 h-2 rounded-full bg-white" />}
            </div>
            <div>
              <p className="font-semibold text-gray-900">Complete Bundle</p>
              <p className="text-gray-500 text-sm mt-0.5">All 6 sections — save 15 credits</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[#1B4332] font-bold text-lg">{BUNDLE_COST} cr</p>
            <p className="text-gray-400 text-xs line-through">65 cr</p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-400">or choose individually</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Section Cards */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        {sections.map(section => {
          const isSelected = isBundle || selected.includes(section.id)
          return (
            <div
              key={section.id}
              onClick={() => toggleSection(section.id)}
              className={`p-5 rounded-xl border-2 cursor-pointer transition ${
                isBundle
                  ? 'border-[#1B4332]/30 bg-[#1B4332]/5 opacity-70'
                  : isSelected
                    ? 'border-[#1B4332] bg-[#1B4332]/5'
                    : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <span className={`text-lg ${isSelected ? 'text-[#1B4332]' : 'text-gray-400'}`}>
                  {section.icon}
                </span>
                <span className={`text-sm font-semibold ${isSelected ? 'text-[#1B4332]' : 'text-gray-400'}`}>
                  {section.cost} cr
                </span>
              </div>
              <p className="font-semibold text-gray-900 text-sm">{section.name}</p>
              <p className="text-gray-500 text-xs mt-1 leading-relaxed">{section.description}</p>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex justify-between items-center">
        <div>
          <p className="text-gray-400 text-sm mb-1">Total cost</p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-bold text-gray-900">{total}</span>
            <span className="text-gray-400 text-sm">credits</span>
          </div>
          {total > USER_CREDITS && (
            <p className="text-red-500 text-xs mt-1">Insufficient balance</p>
          )}
          {total > 0 && total <= USER_CREDITS && (
            <p className="text-gray-400 text-xs mt-1">
              Remaining after: {USER_CREDITS - total} cr
            </p>
          )}
        </div>
        <button
          onClick={handleGenerate}
          disabled={!canGenerate}
          className="bg-[#1B4332] hover:bg-[#2D6A4F] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-lg transition"
        >
          Generate Report
        </button>
      </div>

    </div>
  )
}