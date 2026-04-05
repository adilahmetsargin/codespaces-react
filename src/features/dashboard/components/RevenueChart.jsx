import '../../../styles/RevenueChart.css';

export default function RevenueChart({ data, loading }) {
  if (loading) {
    return (
      <div className="chart-container">
        <div className="chart-header skeleton"></div>
        <div className="chart-placeholder skeleton"></div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="chart-container">
        <p>No data available</p>
      </div>
    );
  }

  // Find max revenue for scaling
  const maxRevenue = Math.max(...data.map((d) => d.revenue));
  const scale = 100 / maxRevenue;

  return (
    <div className="chart-container">
      <h3 className="chart-title">Revenue Trend</h3>
      <div className="chart">
        {data.map((item, index) => (
          <div key={index} className="bar-group">
            <div className="bar-wrapper">
              <div
                className="bar"
                style={{ height: `${item.revenue * scale}%` }}
                title={`${item.month}: $${item.revenue.toLocaleString()}`}
              ></div>
            </div>
            <div className="bar-label">{item.month}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
