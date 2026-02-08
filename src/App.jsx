import { useState } from 'react';
import './App.css';
import CurrencyList from './components/CurrencyList';
import Calculator from './components/Calculator';
import ThemeToggle from './components/ThemeToggle';
import useExchangeRate from './hooks/useExchangeRate';

function App() {
  const {
    rates,
    loading,
    error,
    lastUpdated,
    refresh,
    getChangeStatus,
    convertKRWToForeign,
    convertForeignToKRW,
  } = useExchangeRate();

  const [selectedCurrency, setSelectedCurrency] = useState(null);

  const handleSelectCurrency = (currency) => {
    setSelectedCurrency(currency);
  };

  const formatLastUpdated = () => {
    if (!lastUpdated) return '';
    return lastUpdated.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <h1>XRate</h1>
          <span className="subtitle">실시간 환율 정보</span>
        </div>
        <div className="header-right">
          <ThemeToggle />
        </div>
      </header>

      <main className="app-main">
        {loading && !Object.keys(rates).length ? (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>환율 정보를 불러오는 중...</p>
          </div>
        ) : error ? (
          <div className="error">
            <p>오류가 발생했습니다: {error}</p>
            <button onClick={refresh}>다시 시도</button>
          </div>
        ) : (
          <>
            <div className="update-info">
              <span>마지막 업데이트: {formatLastUpdated()}</span>
              <button className="refresh-btn" onClick={refresh} disabled={loading}>
                {loading ? '갱신 중...' : '새로고침'}
              </button>
            </div>

            <Calculator
              selectedCurrency={selectedCurrency}
              convertKRWToForeign={convertKRWToForeign}
              convertForeignToKRW={convertForeignToKRW}
              rate={selectedCurrency ? rates[selectedCurrency.code] : null}
            />

            <CurrencyList
              rates={rates}
              getChangeStatus={getChangeStatus}
              onSelectCurrency={handleSelectCurrency}
              selectedCurrency={selectedCurrency}
            />
          </>
        )}
      </main>

      <footer className="app-footer">
        <span className="footer-left">KRW 기준 환율</span>
        <span className="footer-right">Developed by KT KIM 💻</span>
      </footer>
    </div>
  );
}

export default App;
