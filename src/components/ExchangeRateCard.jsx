import { formatNumber } from '../utils/api';

const ExchangeRateCard = ({ currency, rate, changeStatus, onClick, isSelected }) => {
  const krwPerUnit = 1 / rate;

  const getChangeIcon = () => {
    if (changeStatus === 'up') return '▲';
    if (changeStatus === 'down') return '▼';
    return '―';
  };

  const getChangeClass = () => {
    if (changeStatus === 'up') return 'rate-up';
    if (changeStatus === 'down') return 'rate-down';
    return 'rate-neutral';
  };

  return (
    <div
      className={`exchange-rate-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onClick(currency)}
    >
      <div className="card-header">
        <span className="currency-flag">{currency.flag}</span>
        <div className="currency-info">
          <span className="currency-code">{currency.code}</span>
          <span className="currency-name">{currency.name}</span>
        </div>
      </div>
      <div className="card-body">
        <div className="rate-value">
          <span className="krw-rate">{formatNumber(krwPerUnit, 2)}</span>
          <span className="rate-unit">원/{currency.symbol}1</span>
        </div>
        <div className={`rate-change ${getChangeClass()}`}>
          <span className="change-icon">{getChangeIcon()}</span>
        </div>
      </div>
    </div>
  );
};

export default ExchangeRateCard;
