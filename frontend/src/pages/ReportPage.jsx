import { useState } from 'react'
import Sidebar from '../components/Sidebar.jsx'
import Header from '../components/Header.jsx'
import Overview from '../sections/Overview.jsx'
import Swot from '../sections/Swot.jsx'
import Marketing from '../sections/Marketing.jsx'
import SocialMedia from '../sections/SocialMedia.jsx'
import Pricing from '../sections/Pricing.jsx'
import Growth from '../sections/Growth.jsx'
import Risk from '../sections/Risk.jsx'
import mockReportData from '../mockReportData'

function ReportPage() {
  const reportSections = mockReportData.sections
  const [activeSection, setActiveSection] = useState('overview')

  const reportTitle = 'My Startup Strategy Report'
  const reportDate = 'April 24, 2024'

  const overviewData = reportSections[0]
  const swotData = reportSections[1]
  const marketingData = reportSections[2]
  const socialMediaData = reportSections[3]
  const pricingData = reportSections[4]
  const growthData = reportSections[5]
  const riskData = reportSections[6]

  function handlePdfClick() {
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
      <Sidebar activeSection={activeSection} onSelect={setActiveSection} />

      <main className="app-main">
        <Header
          title={reportTitle}
          date={reportDate}
          onExport={handlePdfClick}
        />

        <section className="report-panel">{currentSection}</section>
      </main>
    </div>
  )
}

export default ReportPage
