import { formatCurrency, formatNumber, formatPercentage } from '../../../utils/formatters';
import '../../../styles/StatsCards.css';

export default function StatsCards({ stats, loading }) {
  const cards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      format: 'number',
      icon: '👥',
      color: 'blue',
    },
    {
      title: 'Revenue',
      value: stats.totalRevenue,
      format: 'currency',
      icon: '💰',
      color: 'green',
    },
    {
      title: 'Active Subscriptions',
      value: stats.activeSubscriptions,
      format: 'number',
      icon: '✅',
      color: 'purple',
    },
    {
      title: 'Monthly Growth',
      value: stats.monthlyGrowth,
      format: 'percentage',
      icon: '📈',
      color: 'orange',
    },
  ];

  const formatValue = (value, format) => {
    switch (format) {
      case 'currency':
        return formatCurrency(value);
      case 'percentage':
        return formatPercentage(value);
      case 'number':
      default:
        return formatNumber(value);
    }
  };

  if (loading) {
    return (
      <div className="stats-container">
        {cards.map((_, index) => (
          <div key={index} className="stat-card skeleton"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="stats-container">
      {cards.map((card, index) => (
        <div key={index} className={`stat-card ${card.color}`}>
          <div className="stat-icon">{card.icon}</div>
          <div className="stat-content">
            <div className="stat-title">{card.title}</div>
            <div className="stat-value">
              {formatValue(card.value, card.format)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
