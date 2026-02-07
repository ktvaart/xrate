import { CURRENCIES } from '../utils/api';
import ExchangeRateCard from './ExchangeRateCard';

const CurrencyList = ({ rates, getChangeStatus, onSelectCurrency, selectedCurrency }) => {
  return (
    <div className="currency-list">
      <h3>주요 통화</h3>
      <div className="currency-grid">
        {CURRENCIES.map((currency) => (
          <ExchangeRateCard
            key={currency.code}
            currency={currency}
            rate={rates[currency.code]}
            changeStatus={getChangeStatus(currency.code)}
            onClick={onSelectCurrency}
            isSelected={selectedCurrency?.code === currency.code}
          />
        ))}
      </div>
    </div>
  );
};

export default CurrencyList;
