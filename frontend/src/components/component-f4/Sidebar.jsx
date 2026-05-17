const defaultSections = [
  { id: 'overview', label: 'Overview' },
  { id: 'swot', label: 'SWOT Analysis' },
  { id: 'marketing', label: 'Marketing Plan' },
  { id: 'kpi', label: 'KPI Recommendations' },
  { id: 'pricing', label: 'Pricing Strategy' },
  { id: 'growth', label: 'Growth Roadmap' },
  { id: 'risk', label: 'Risk Analysis' },
]

function Sidebar({ activeSection, onSelect, sections = defaultSections }) {
  return (
    <aside className="report-app-sidebar">
      <nav className="sidebar-nav" aria-label="Report sections">
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            className={`sidebar-item ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => onSelect(section.id)}
          >
            {section.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar