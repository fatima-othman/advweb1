function Kpi({ data }) {
  if (!data) return <p>No data available</p>;

  return (
    <div>
      <h2 className="section-heading">{data.section_title}</h2>
      <p className="section-intro">{data.content.intro}</p>

      <div className="kpi-grid">
        {data.content.items.map((item, index) => (
          <div className="kpi-card" key={index}>
            <p className="kpi-label">{item.title}</p>
            <h3 className="kpi-value">{item.value}</h3>
            <small className="kpi-note">{item.note}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Kpi;
