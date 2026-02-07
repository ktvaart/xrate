import { useState, useEffect } from 'react';
import { formatNumber } from '../utils/api';

const Calculator = ({ selectedCurrency, convertKRWToForeign, convertForeignToKRW, rate }) => {
  const [krwAmount, setKrwAmount] = useState('');
  const [foreignAmount, setForeignAmount] = useState('');
  const [lastEdited, setLastEdited] = useState('krw');

  useEffect(() => {
    if (!selectedCurrency || !rate) return;

    if (lastEdited === 'krw' && krwAmount) {
      const converted = convertKRWToForeign(parseFloat(krwAmount), selectedCurrency.code);
      setForeignAmount(converted.toFixed(4));
    } else if (lastEdited === 'foreign' && foreignAmount) {
      const converted = convertForeignToKRW(parseFloat(foreignAmount), selectedCurrency.code);
      setKrwAmount(converted.toFixed(0));
    }
  }, [selectedCurrency, rate]);

  const handleKRWChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setKrwAmount(value);
    setLastEdited('krw');

    if (value && selectedCurrency) {
      const converted = convertKRWToForeign(parseFloat(value), selectedCurrency.code);
      setForeignAmount(converted.toFixed(4));
    } else {
      setForeignAmount('');
    }
  };

  const handleForeignChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setForeignAmount(value);
    setLastEdited('foreign');

    if (value && selectedCurrency) {
      const converted = convertForeignToKRW(parseFloat(value), selectedCurrency.code);
      setKrwAmount(converted.toFixed(0));
    } else {
      setKrwAmount('');
    }
  };

  if (!selectedCurrency) {
    return (
      <div className="calculator">
        <h3>환율 계산기</h3>
        <p className="calculator-placeholder">통화를 선택해주세요</p>
      </div>
    );
  }

  const krwPerUnit = rate ? formatNumber(1 / rate, 2) : '-';

  return (
    <div className="calculator">
      <h3>환율 계산기</h3>
      <div className="calculator-info">
        <span className="selected-currency">
          {selectedCurrency.flag} {selectedCurrency.code}
        </span>
        <span className="exchange-info">
          1 {selectedCurrency.symbol} = {krwPerUnit} 원
        </span>
      </div>
      <div className="calculator-inputs">
        <div className="input-group">
          <label>KRW (원)</label>
          <div className="input-wrapper">
            <span className="input-prefix">₩</span>
            <input
              type="text"
              value={krwAmount}
              onChange={handleKRWChange}
              placeholder="0"
            />
          </div>
        </div>
        <div className="swap-icon">⇄</div>
        <div className="input-group">
          <label>{selectedCurrency.code}</label>
          <div className="input-wrapper">
            <span className="input-prefix">{selectedCurrency.symbol}</span>
            <input
              type="text"
              value={foreignAmount}
              onChange={handleForeignChange}
              placeholder="0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
