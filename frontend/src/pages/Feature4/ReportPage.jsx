import { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import Header from '../../components/Header.jsx'
import Overview from './Overview.jsx'
import Swot from './Swot.jsx'
import Marketing from './Marketing.jsx'
import SocialMedia from './SocialMedia.jsx'
import Pricing from './Pricing.jsx'
import Growth from './Growth.jsx'
import Risk from './Risk.jsx'
import ExportModal from '../../components/ExportModal.jsx'

const fallbackReport = {
  business_type: 'Coffee Shop',
  stage: 'Launch',
  employees: 5,
  budget: 2500,
  created_at: new Date().toISOString(),
}

function ReportPage() {
  const [activeSection, setActiveSection] = useState('overview')
  const [report, setReport] = useState(null)
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/reports/1')
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
  }, [])

  if (!report) {
    return <p>Loading report...</p>
  }

  const reportTitle = `${report.business_type} Strategy Report`
  const reportDate = new Date(report.created_at).toLocaleDateString()

  const overviewData = {
    section_title: 'Overview',

    content: {
      summary: `This report gives a strategy direction for ${report.business_type}.`,

      kpis: [
        {
          value: report.business_type,
          title: 'Business Type',
          note: 'Current business type',
        },

        {
          value: report.stage,
          title: 'Stage',
          note: 'Business stage',
        },

        {
          value: report.employees,
          title: 'Employees',
          note: 'Team size',
        },

        {
          value: `$${report.budget}`,
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
        'High social media engagement',
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
          title: 'Instagram Campaign',
          idea: 'Post daily coffee content and customer stories',
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

  const socialMediaData = {
    section_title: 'Social Media Plan',

    content: {
      intro:
        'This social media plan focuses on increasing engagement and attracting new customers through consistent posting.',

      schedule: [
        {
          day: 'Monday',
          platform: 'Instagram',
          content: 'Coffee preparation reel',
        },

        {
          day: 'Wednesday',
          platform: 'Facebook',
          content: 'Customer testimonials and reviews',
        },

        {
          day: 'Friday',
          platform: 'TikTok',
          content: 'Behind the scenes coffee making video',
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
            'Launch Instagram page',
            'Create opening offers',
            'Run local ads',
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

  let currentSection = <Overview data={overviewData} />

  if (activeSection === 'swot') {
    currentSection = <Swot data={swotData} />
  } else if (activeSection === 'marketing') {
    currentSection = <Marketing data={marketingData} />
  } else if (activeSection === 'socialMedia') {
    currentSection = <SocialMedia data={socialMediaData} />
  } else if (activeSection === 'pricing') {
    currentSection = <Pricing data={pricingData} />
  } else if (activeSection === 'growth') {
    currentSection = <Growth data={growthData} />
  } else if (activeSection === 'risk') {
    currentSection = <Risk data={riskData} />
  }

  return (
    <div className="app-shell">
      <Sidebar
        activeSection={activeSection}
        onSelect={setActiveSection}
      />

      <main className="app-main">
        <Header
          title={reportTitle}
          date={reportDate}
          onExport={handlePdfClick}
        />

        <section className="report-panel" id="report-content">
          {currentSection}
        </section>

        <section className="print-report" aria-hidden="true">
          <div className="print-report-header">
            <h1>{reportTitle}</h1>
            <p>{reportDate}</p>
          </div>

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
            <SocialMedia data={socialMediaData} />
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
        </section>
      </main>

      <ExportModal
        isOpen={isExportModalOpen}
        companyName={report.business_type}
        date={reportDate}
        onDownload={handleDownloadPdf}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  )
}

export default ReportPage
