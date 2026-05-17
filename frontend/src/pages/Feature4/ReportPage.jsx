import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from '../../components/component-f4/Sidebar.jsx'
import Header from '../../components/component-f4/Header.jsx'
import Overview from './Overview.jsx'
import ExportModal from '../../components/component-f4/ExportModal.jsx'
import api from '../../services/api'
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

function formatGeneratedHeading(sectionTitle, heading) {
  if (sectionTitle === 'KPI Recommendations' && /^Recommended KPIs?$/i.test(heading)) {
    return 'Metrics to Track'
  }

  return heading
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
      blocks.push({ type: 'heading', text: formatGeneratedHeading(title, heading) })
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
    api.get(`/reports/${id}`)
      .then(({ data }) => setReport(data))
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
  ) : (
    <EmptySection title={sectionLabels[displayedActiveSection] || 'Report Section'} />
  )

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

          {printSections.map((section) => (
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
          ))}
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
