import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const questions = [
  {
    key: 'businessType',
    text: 'ما نوع شركتك؟',
    type: 'chips',
    options: ['مطعم / كافيه', 'SaaS / تطبيق', 'تجارة إلكترونية', 'متجر', 'خدمات مهنية', 'أخرى']
  },
  {
    key: 'stage',
    text: 'في أي مرحلة شركتك؟',
    type: 'chips',
    options: ['فكرة', 'إطلاق', 'نمو', 'توسع']
  },
  {
    key: 'employees',
    text: 'كم عدد الموظفين؟',
    type: 'chips',
    options: ['1', '2-5', '6-20', '21-50', '+50']
  },
  {
    key: 'budget',
    text: 'ما ميزانيتك الشهرية؟',
    type: 'chips',
    options: ['أقل من $500', '$500-$2000', '$2000-$10000', 'أكثر من $10000']
  },
  {
    key: 'market',
    text: 'من هو سوقك المستهدف؟',
    type: 'text',
    placeholder: 'مثال: شباب 18-30 في فلسطين والأردن'
  },
  {
    key: 'competitors',
    text: 'من هم منافسوك الرئيسيون؟',
    type: 'text',
    placeholder: 'مثال: Careem، Uber، التاكسي التقليدي'
  },
  {
    key: 'language',
    text: 'بأي لغة تريد التقرير؟',
    type: 'chips',
    options: ['العربية', 'English']
  },
]

function ConversationalInput() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [textValue, setTextValue] = useState('')

  const question = questions[currentStep]

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
    // لاحقاً بنرسل الـ answers للـ API
    console.log('الإجابات:', answers)
    navigate(`/projects/${id}/select`)
  }

  return (
    <div className="max-w-2xl mx-auto">

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>السؤال {Math.min(currentStep + 1, questions.length)} من {questions.length}</span>
          <span>{Math.round((currentStep / questions.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2">
          <div
            className="bg-purple-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(currentStep / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* الأسئلة */}
      {currentStep < questions.length ? (
        <div className="bg-gray-900 rounded-2xl p-8">
          <p className="text-xl font-semibold text-white mb-6">{question.text}</p>

          {question.type === 'chips' && (
            <div className="flex flex-wrap gap-3">
              {question.options.map(option => (
                <button
                  key={option}
                  onClick={() => handleChipAnswer(option)}
                  className="bg-gray-800 hover:bg-purple-600 border border-gray-700 hover:border-purple-500 text-white px-5 py-2 rounded-full transition"
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
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              />
              <button
                onClick={handleTextAnswer}
                disabled={!textValue.trim()}
                className="bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white px-5 py-3 rounded-lg transition"
              >
                التالي
              </button>
            </div>
          )}
        </div>
      ) : (
        /* انتهت الأسئلة */
        <div className="bg-gray-900 rounded-2xl p-8 text-center">
          <p className="text-2xl mb-2">✅</p>
          <p className="text-xl font-semibold text-white mb-2">تمت الإجابة على كل الأسئلة!</p>
          <p className="text-gray-400 mb-6">جاهز لاختيار أقسام التقرير</p>
          <button
            onClick={handleFinish}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-lg transition"
          >
            اختر الأقسام ←
          </button>
        </div>
      )}

      {/* الإجابات السابقة */}
      {currentStep > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {Object.entries(answers).map(([key, value]) => (
            <span key={key} className="bg-gray-800 text-gray-300 text-sm px-3 py-1 rounded-full">
              {value}
            </span>
          ))}
        </div>
      )}

    </div>
  )
}

export default ConversationalInput