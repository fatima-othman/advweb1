
function Header({ title, businessType, date, onExport }) {
  return (
    <header className="report-app-header">
      <div className="report-header-copy">
        <h2>{title}</h2>
        <p>Business Type: {businessType}</p>
        <p>{date}</p>
      </div>

      <button type="button" className="primary-button" onClick={onExport}>
        Export PDF
      </button>
    </header>
  )
}

export default Header
