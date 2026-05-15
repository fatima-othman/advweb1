import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const questions = [
  {
    key: 'stage',
    text: 'What stage is your company at?',
    type: 'chips',
    options: ['Idea', 'Launch', 'Growth', 'Expansion']
  },
  {
    key: 'employees',
    text: 'How many employees do you have?',
    type: 'chips',
    options: ['1', '2–5', '6–20', '21–50', '50+']
  },
  {
    key: 'budget',
    text: 'What is your monthly budget?',
    type: 'chips',
    options: ['Under $500', '$500–$2,000', '$2,000–$10,000', 'Over $10,000']
  },
  {
    key: 'market',
    text: 'Who is your target market?',
    type: 'text',
    placeholder: 'e.g. Young adults 18–30 in Palestine and Jordan'
  },
  {
    key: 'competitors',
    text: 'Who are your main competitors?',
    type: 'text',
    placeholder: 'e.g. Careem, Uber, traditional taxis'
  },
  {
    key: 'language',
    text: 'In which language do you want the report?',
    type: 'chips',
    options: ['العربية', 'English']
  },
]

const businessTypes = [
  'Restaurant / Café',
  'SaaS / App',
  'E-commerce',
  'Retail Store',
  'Professional Services',
  'Other'
]

export default function CreateProject() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState('info')
  const [name, setName] = useState('')
  const [businessType, setBusinessType] = useState('')
  const [description, setDescription] = useState('')
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [textValue, setTextValue] = useState('')

  const question = questions[currentStep]
  const progress = Math.round((currentStep / questions.length) * 100)

  function handleInfoSubmit() {
    if (!name || !businessType) return
    setPhase('questions')
  }

  function handleChipAnswer(option) {
    const newAnswers = { ...answers, [question.key]: option }
    setAnswers(newAnswers)
    setCurrentStep(currentStep + 1)
  }

  function handleTextAnswer() {
    if (!textValue.trim()) return
    const newAnswers = { ...answers, [question.key]: textValue }
    setAnswers(newAnswers)
    setTextValue('')
    setCurrentStep(currentStep + 1)
  }

  function handleFinish() {
    const newProject = {
      id: Date.now(),
      name,
      businessType,
      description,
      ...answers
    }
    const existing = JSON.parse(localStorage.getItem('projects') || '[]')
    localStorage.setItem('projects', JSON.stringify([...existing, newProject]))
    navigate(`/projects/${newProject.id}/select`)
  }

  if (phase === 'info') {
    return (
      <div className="max-w-xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">New Project</h1>
          <p className="text-gray-500 mt-1">Tell us about your business to get started</p>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <div className="flex flex-col gap-5">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Project Name <span className="text-red-400">*</span>
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Al-Sham Restaurant"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1B4332] focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Business Type <span className="text-red-400">*</span>
              </label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Short Description
                <span className="text-gray-400 font-normal ml-1">(optional)</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Briefly describe your business..."
                rows={3}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1B4332] focus:bg-white transition resize-none"
              />
            </div>

            <button
              onClick={handleInfoSubmit}
              disabled={!name || !businessType}
              className="w-full bg-[#1B4332] hover:bg-[#2D6A4F] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition mt-2"
            >
              Continue →
            </button>

          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm text-gray-400">New Project</span>
          <span className="text-gray-300">/</span>
          <span className="text-sm font-medium text-gray-700">{name}</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Tell us about your business</h1>
        <p className="text-gray-500 mt-1 text-sm">We'll use this to generate a tailored strategy report</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>Question {Math.min(currentStep + 1, questions.length)} of {questions.length}</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div
            className="bg-[#1B4332] h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {currentStep < questions.length ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">

          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-5">
            <span className="w-6 h-6 rounded-full bg-[#1B4332] text-white text-xs flex items-center justify-center font-medium">
              {currentStep + 1}
            </span>
            <span className="text-xs text-gray-400 uppercase tracking-wide">
              {question.key.replace(/([A-Z])/g, ' $1')}
            </span>
          </div>

          <p className="text-xl font-semibold text-gray-900 mb-6">{question.text}</p>

          {question.type === 'chips' && (
            <div className="flex flex-wrap gap-2">
              {question.options.map(option => (
                <button
                  key={option}
                  onClick={() => handleChipAnswer(option)}
                  className="bg-gray-50 hover:bg-[#1B4332] hover:text-white border border-gray-200 hover:border-[#1B4332] text-gray-700 px-5 py-2.5 rounded-full transition text-sm font-medium"
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {question.type === 'text' && (
            <div className="flex gap-3">
              <input
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleTextAnswer()}
                placeholder={question.placeholder}
                className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1B4332] focus:bg-white transition"
              />
              <button
                onClick={handleTextAnswer}
                disabled={!textValue.trim()}
                className="bg-[#1B4332] hover:bg-[#2D6A4F] disabled:opacity-40 text-white px-5 py-3 rounded-lg transition font-medium text-sm"
              >
                Next
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-[#1B4332] rounded-2xl p-8 text-center">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4 text-xl">✓</div>
          <p className="text-xl font-semibold text-white mb-2">All set!</p>
          <p className="text-green-200 mb-6 text-sm">Your business profile is ready. Now choose your report sections.</p>
          <button
            onClick={handleFinish}
            className="bg-white text-[#1B4332] font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Choose Sections →
          </button>
        </div>
      )}

      {/* Previous answers */}
      {currentStep > 0 && currentStep < questions.length && (
        <div className="mt-5 flex flex-wrap gap-2">
          {Object.entries(answers).map(([key, value]) => (
            <span
              key={key}
              className="bg-white border border-gray-200 text-gray-600 text-xs px-3 py-1.5 rounded-full"
            >
              {value}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}