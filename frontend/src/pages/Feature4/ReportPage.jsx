import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from '../../components/Sidebar.jsx'
import Header from '../../components/Header.jsx'
import Overview from './Overview.jsx'
import Swot from './Swot.jsx'
import Marketing from './Marketing.jsx'
import Kpi from './Kpi.jsx'
import Pricing from './Pricing.jsx'
import Growth from './Growth.jsx'
import Risk from './Risk.jsx'
import ExportModal from '../../components/ExportModal.jsx'
import { API_BASE_URL } from '../../services/api'
import '../App.css'

const fallbackReport = {
  business_type: 'Coffee Shop',
  stage: 'Launch',
  employees: 5,
  budget: 2500,
  created_at: new Date().toISOString(),
}

const sectionLabels = {
  overview: 'Overview',
  swot: 'SWOT Analysis',
  marketing: 'Marketing Plan',
  pricing: 'Pricing Strategy',
  growth: 'Growth Roadmap',
  risk: 'Risk Analysis',
  kpi: 'KPI Recommendations',
}

const bundleSections = ['swot', 'pricing', 'risk', 'kpi', 'marketing', 'growth']

function normalizeSectionId(sectionId) {
  return sectionId
}

function formatMissing(value) {
  return value || 'Not specified'
}

function formatBudget(value) {
  if (!value) return 'Not specified'

  const budgetText = String(value).trim()
  if (!budgetText) return 'Not specified'

  return budgetText.startsWith('$') ? budgetText : `$${budgetText}`
}

function GeneratedSection({ title, content }) {
  const lines = String(content || '')
    .split('\n')
    .flatMap((line) => {
      const parts = line
        .split(/(?=\b(?:Phase\s+\d+|Strengths|Weaknesses|Opportunities|Threats|Impact|Response|Goal|Tasks|Recommended KPIs|KPIs?):)/gi)
        .map((part) => part.trim())
        .filter(Boolean)

      return parts.length > 1 ? parts : line
    })
    .map((line) => line.trim())
    .filter(Boolean)

  const blocks = []
  let listItems = []

  const flushList = () => {
    if (listItems.length > 0) {
      blocks.push({ type: 'list', items: listItems })
      listItems = []
    }
  }

  lines.forEach((line) => {
    const bulletMatch = line.match(/^[-*]\s+(.+)/)
    if (bulletMatch) {
      listItems.push(bulletMatch[1])
      return
    }

    flushList()

    const headingMatch = line.match(/^([^:]{3,42}):\s*(.*)$/)
    if (headingMatch) {
      const [, heading, rest] = headingMatch
      blocks.push({ type: 'heading', text: heading })
      if (rest) {
        blocks.push({ type: 'paragraph', text: rest })
      }
      return
    }

    blocks.push({ type: 'paragraph', text: line })
  })

  flushList()

  return (
    <div>
      <h2 className="section-heading">{title}</h2>

      {blocks.length > 0 ? (
        <div className="generated-section-content">
          {blocks.map((block, index) => {
            if (block.type === 'heading') {
              return <h3 key={`${title}-${index}`}>{block.text}</h3>
            }

            if (block.type === 'list') {
              return (
                <ul key={`${title}-${index}`}>
                  {block.items.map((item, itemIndex) => (
                    <li key={`${title}-${index}-${itemIndex}`}>{item}</li>
                  ))}
                </ul>
              )
            }

            return <p key={`${title}-${index}`}>{block.text}</p>
          })}
        </div>
      ) : (
        <p>No generated content available for this section.</p>
      )}
    </div>
  )
}

function EmptySection({ title }) {
  return (
    <div className="empty-report-section">
      <h2 className="section-heading">{title}</h2>
      <p>No generated data available for this section.</p>
    </div>
  )
}

function ReportPage() {
  const { id = '1' } = useParams()
  const [activeSection, setActiveSection] = useState('overview')
  const [report, setReport] = useState(null)
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)

  useEffect(() => {
    fetch(`${API_BASE_URL}/reports/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Report API failed with status ${res.status}`)
        }

        return res.json()
      })
      .then((data) => setReport(data))
      .catch((error) => {
        console.error('Error fetching report:', error)
        setReport(fallbackReport)
      })
  }, [id])

  if (!report) {
    return <p>Loading report...</p>
  }

  const project = report.project || report
  const businessType = project.business_type || project.type || 'Business'
  const projectName = project.name || report.company_name || report.title || 'Business'
  const headerBusinessType = businessType
  const reportTitle = report.title || `${projectName} Strategy Report`
  const reportDate = new Date(report.created_at).toLocaleDateString()
  const reportSections = report.sections && typeof report.sections === 'object' && !Array.isArray(report.sections)
    ? report.sections
    : {}
  const hasGeneratedReportSections = Object.keys(reportSections).length > 0
  const selectedSectionIds = (Array.isArray(report.selected_sections) && report.selected_sections.length > 0
    ? report.selected_sections.includes('bundle') ? bundleSections : report.selected_sections
    : Object.keys(reportSections)
  )
    .map(normalizeSectionId)
    .filter((sectionId) => sectionLabels[sectionId] && reportSections[sectionId])

  const visibleSections = selectedSectionIds.map((sectionId) => ({
    id: sectionId,
    label: sectionLabels[sectionId],
  }))
  const printSections = [
    { id: 'overview', label: sectionLabels.overview },
    ...visibleSections.filter((section) => section.id !== 'overview'),
  ]
  const displayedActiveSection = activeSection

  const overviewData = {
    section_title: 'Overview',

    content: {
      summary: `This report gives a strategy direction for ${businessType}.`,

      kpis: [
        {
          value: businessType,
          title: 'Business Type',
          note: 'Current business type',
        },

        {
          value: formatMissing(project.stage),
          title: 'Stage',
          note: 'Business stage',
        },

        {
          value: formatMissing(project.employees),
          title: 'Employees',
          note: 'Team size',
        },

        {
          value: formatBudget(project.budget),
          title: 'Budget',
          note: 'Available budget',
        },
      ],
    },
  }

  const swotData = {
    section_title: 'SWOT Analysis',

    content: {
      strengths: [
        'Strong brand identity',
        'Good customer service',
      ],

      weaknesses: [
        'Limited budget',
        'Small team size',
      ],

      opportunities: [
        'Growing coffee market',
        'Strong local customer interest',
      ],

      threats: [
        'High competition',
        'Rising ingredient prices',
      ],
    },
  }

  const marketingData = {
    section_title: 'Marketing Plan',

    content: {
      intro:
        'This marketing plan focuses on increasing brand awareness and attracting new customers.',

      campaigns: [
        {
          title: 'Local Awareness Campaign',
          idea: 'Share customer stories and opening offers through local channels',
          goal: 'Increase engagement and attract local customers',
        },

        {
          title: 'Student Discount Campaign',
          idea: 'Offer discounts for university students',
          goal: 'Increase daily sales and customer loyalty',
        },

        {
          title: 'Influencer Collaboration',
          idea: 'Invite local influencers to review products',
          goal: 'Expand online visibility',
        },
      ],
    },
  }

  const kpiData = {
    section_title: 'KPI Recommendations',

    content: {
      intro:
        'These KPIs help track business performance and guide the next strategy decisions.',

      items: [
        {
          title: 'Monthly Revenue',
          value: '$8,000',
          note: 'Track total sales every month',
        },

        {
          title: 'Customer Retention',
          value: '35%',
          note: 'Measure repeat customers',
        },

        {
          title: 'Average Order Value',
          value: '$12',
          note: 'Monitor spend per customer',
        },

        {
          title: 'Conversion Rate',
          value: '10%',
          note: 'Track visitor-to-customer conversion',
        },
      ],
    },
  }

  const pricingData = {
    section_title: 'Pricing Strategy',

    content: {
      notes: [
        'Use competitive pricing during launch phase',
        'Offer bundle discounts for loyal customers',
        'Monitor competitor pricing monthly',
      ],

      competitors: [
        {
          name: 'Gloria Jeans',
          price: '$5 Coffee',
          note: 'Premium pricing with strong branding',
        },

        {
          name: 'Local Cafe',
          price: '$3 Coffee',
          note: 'Affordable but weaker customer experience',
        },
      ],
    },
  }

  const growthData = {
    section_title: 'Growth Roadmap',

    content: {
      intro:
        'This roadmap explains the planned business growth phases over time.',

      milestones: [
        {
          phase: 'Phase 1',
          goal: 'Build brand awareness',

          tasks: [
            'Launch local awareness campaign',
            'Define weekly KPI targets',
            'Create opening offers',
          ],
        },

        {
          phase: 'Phase 2',
          goal: 'Increase customer loyalty',

          tasks: [
            'Launch loyalty program',
            'Collect customer feedback',
            'Improve service quality',
          ],
        },

        {
          phase: 'Phase 3',
          goal: 'Expand the business',

          tasks: [
            'Add delivery service',
            'Hire more employees',
            'Open second branch',
          ],
        },
      ],
    },
  }
  const riskData = {
    section_title: 'Risk Analysis',

    content: {
      intro:
        'This section highlights possible business risks and suggested responses.',

      items: [
        {
          title: 'High Competition',
          impact: 'Reduced market share',
          response:
            'Differentiate through branding and customer service',
        },

        {
          title: 'Increasing Costs',
          impact: 'Lower profit margins',
          response:
            'Optimize supplier agreements and pricing',
        },

        {
          title: 'Low Online Visibility',
          impact: 'Weak customer reach',
          response:
            'Invest in digital marketing campaigns',
        },
      ],
    },
  }

  function handlePdfClick() {
    setIsExportModalOpen(true)
  }

  function handleDownloadPdf() {
    setIsExportModalOpen(false)
    setTimeout(() => {
      window.print()
    }, 100)
  }

  const activeRawContent = reportSections[displayedActiveSection]
  let currentSection = displayedActiveSection === 'overview' ? (
    <Overview data={overviewData} />
  ) : activeRawContent ? (
    <GeneratedSection title={sectionLabels[displayedActiveSection]} content={activeRawContent} />
  ) : hasGeneratedReportSections ? (
    <EmptySection title={sectionLabels[displayedActiveSection] || 'Report Section'} />
  ) : (
    <Overview data={overviewData} />
  )

  if (!hasGeneratedReportSections && displayedActiveSection === 'swot') {
    currentSection = <Swot data={swotData} />
  } else if (!hasGeneratedReportSections && displayedActiveSection === 'marketing') {
    currentSection = <Marketing data={marketingData} />
  } else if (!hasGeneratedReportSections && displayedActiveSection === 'kpi') {
    currentSection = <Kpi data={kpiData} />
  } else if (!hasGeneratedReportSections && displayedActiveSection === 'pricing') {
    currentSection = <Pricing data={pricingData} />
  } else if (!hasGeneratedReportSections && displayedActiveSection === 'growth') {
    currentSection = <Growth data={growthData} />
  } else if (!hasGeneratedReportSections && displayedActiveSection === 'risk') {
    currentSection = <Risk data={riskData} />
  }

  return (
    <div className="report-app-shell">
      <Sidebar
        activeSection={displayedActiveSection}
        onSelect={setActiveSection}
      />

      <main className="report-app-main">
        <Header
          title={reportTitle}
          businessType={headerBusinessType}
          date={reportDate}
          onExport={handlePdfClick}
        />

        <section className="report-panel" id="report-content">
          {currentSection}
        </section>

        <section className="print-report" aria-hidden="true">
          <div className="print-report-header">
            <h1>{reportTitle}</h1>
            <p>Business Type: {headerBusinessType}</p>
            <p>{reportDate}</p>
          </div>

          {printSections.length > 1 ? printSections.map((section) => (
            <div className="print-section" key={section.id}>
              {section.id === 'overview' ? (
                <Overview data={overviewData} />
              ) : (
                <GeneratedSection
                  title={section.label}
                  content={reportSections[section.id]}
                />
              )}
            </div>
          )) : (
            <>
              <div className="print-section">
                <Overview data={overviewData} />
              </div>
              <div className="print-section">
                <Swot data={swotData} />
              </div>
              <div className="print-section">
                <Marketing data={marketingData} />
              </div>
              <div className="print-section">
                <Kpi data={kpiData} />
              </div>
              <div className="print-section">
                <Pricing data={pricingData} />
              </div>
              <div className="print-section">
                <Growth data={growthData} />
              </div>
              <div className="print-section">
                <Risk data={riskData} />
              </div>
            </>
          )}
        </section>
      </main>

      <ExportModal
        isOpen={isExportModalOpen}
        companyName={businessType}
        date={reportDate}
        onDownload={handleDownloadPdf}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  )
}

export default ReportPage
