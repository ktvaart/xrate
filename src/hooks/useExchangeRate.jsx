import { useState, useEffect, useCallback } from 'react';
import { fetchExchangeRates, CURRENCIES } from '../utils/api';

const STORAGE_KEY = 'xrate_previous_rates';

const useExchangeRate = () => {
  const [rates, setRates] = useState({});
  const [previousRates, setPreviousRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const loadPreviousRates = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error loading previous rates:', e);
    }
    return {};
  };

  const savePreviousRates = (rates) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(rates));
    } catch (e) {
      console.error('Error saving previous rates:', e);
    }
  };

  const loadRates = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchExchangeRates('KRW');

      const prev = loadPreviousRates();
      setPreviousRates(prev);

      const filteredRates = {};
      CURRENCIES.forEach(currency => {
        if (data.rates[currency.code]) {
          filteredRates[currency.code] = data.rates[currency.code];
        }
      });

      setRates(filteredRates);
      setLastUpdated(new Date());

      savePreviousRates(filteredRates);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRates();

    const interval = setInterval(loadRates, 60000);

    return () => clearInterval(interval);
  }, [loadRates]);

  const getChangeStatus = (currencyCode) => {
    const current = rates[currencyCode];
    const previous = previousRates[currencyCode];

    if (!current || !previous) return 'neutral';
    if (current > previous) return 'up';
    if (current < previous) return 'down';
    return 'neutral';
  };

  const convertKRWToForeign = (krwAmount, currencyCode) => {
    const rate = rates[currencyCode];
    if (!rate) return 0;
    return krwAmount * rate;
  };

  const convertForeignToKRW = (foreignAmount, currencyCode) => {
    const rate = rates[currencyCode];
    if (!rate) return 0;
    return foreignAmount / rate;
  };

  return {
    rates,
    previousRates,
    loading,
    error,
    lastUpdated,
    refresh: loadRates,
    getChangeStatus,
    convertKRWToForeign,
    convertForeignToKRW,
  };
};

export default useExchangeRate;
