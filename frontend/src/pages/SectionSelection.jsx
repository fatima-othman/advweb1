import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const sections = [
  { id: 'swot', name: 'تحليل SWOT', description: 'نقاط القوة والضعف والفرص والتهديدات', cost: 5, icon: '◈' },
  { id: 'pricing', name: 'استراتيجية التسعير', description: 'أفضل نموذج تسعير لشركتك', cost: 5, icon: '💰' },
  { id: 'risk', name: 'تحليل المخاطر', description: 'المخاطر المحتملة وكيفية التعامل معها', cost: 5, icon: '⚠️' },
  { id: 'kpi', name: 'مؤشرات الأداء KPI', description: 'أهم المؤشرات لقياس نجاح شركتك', cost: 10, icon: '📊' },
  { id: 'marketing', name: 'خطة التسويق', description: 'استراتيجية تسويقية متكاملة', cost: 20, icon: '📣' },
  { id: 'growth', name: 'خارطة النمو', description: 'خطة توسع واضحة للمراحل القادمة', cost: 20, icon: '🚀' },
]

const BUNDLE_COST = 50
const USER_CREDITS = 65 // وهمي مؤقتاً

function SectionSelection() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [selected, setSelected] = useState([])
  const [isBundle, setIsBundle] = useState(false)

  function toggleSection(sectionId) {
    if (isBundle) return
    if (selected.includes(sectionId)) {
      setSelected(selected.filter(s => s !== sectionId))
    } else {
      setSelected([...selected, sectionId])
    }
  }

  function toggleBundle() {
    setIsBundle(!isBundle)
    setSelected([])
  }

  const total = isBundle ? BUNDLE_COST : selected.reduce((sum, id) => {
    return sum + sections.find(s => s.id === id).cost
  }, 0)

  const canGenerate = (isBundle || selected.length > 0) && total <= USER_CREDITS

  function handleGenerate() {
    console.log('الأقسام المختارة:', isBundle ? 'bundle' : selected)
    console.log('التكلفة:', total)
    // لاحقاً بنرسل للـ API
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-purple-400 mb-2">اختر أقسام التقرير</h1>
      <p className="text-gray-400 mb-8">رصيدك الحالي: <span className="text-white font-semibold">{USER_CREDITS} كريديت</span></p>

      {/* Bundle Option */}
      <div
        onClick={toggleBundle}
        className={`mb-6 p-5 rounded-xl border-2 cursor-pointer transition ${
          isBundle ? 'border-purple-500 bg-purple-900/20' : 'border-gray-700 bg-gray-900 hover:border-purple-700'
        }`}
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="font-bold text-white text-lg">⚡ الباقة الكاملة</p>
            <p className="text-gray-400 text-sm mt-1">كل الأقسام الستة — توفير 15 كريديت</p>
          </div>
          <div className="text-right">
            <p className="text-purple-400 font-bold text-xl">{BUNDLE_COST} cr</p>
            <p className="text-gray-500 text-xs line-through">65 cr</p>
          </div>
        </div>
      </div>

      {/* Section Cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {sections.map(section => {
          const isSelected = isBundle || selected.includes(section.id)
          return (
            <div
              key={section.id}
              onClick={() => toggleSection(section.id)}
              className={`p-5 rounded-xl border-2 cursor-pointer transition ${
                isSelected
                  ? 'border-purple-500 bg-purple-900/20'
                  : 'border-gray-700 bg-gray-900 hover:border-gray-600'
              } ${isBundle ? 'opacity-60' : ''}`}
            >
              <div className="flex justify-between items-start">
                <span className="text-2xl">{section.icon}</span>
                <span className="text-purple-400 font-semibold text-sm">{section.cost} cr</span>
              </div>
              <p className="font-semibold text-white mt-3">{section.name}</p>
              <p className="text-gray-400 text-sm mt-1">{section.description}</p>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center bg-gray-900 rounded-xl p-5">
        <div>
          <p className="text-gray-400 text-sm">الإجمالي</p>
          <p className="text-white font-bold text-2xl">{total} <span className="text-gray-400 text-sm">كريديت</span></p>
          {total > USER_CREDITS && (
            <p className="text-red-400 text-sm mt-1">رصيدك غير كافٍ</p>
          )}
        </div>
        <button
          onClick={handleGenerate}
          disabled={!canGenerate}
          className="bg-purple-600 hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-lg transition"
        >
          توليد التقرير ✨
        </button>
      </div>
    </div>
  )
}

export default SectionSelection