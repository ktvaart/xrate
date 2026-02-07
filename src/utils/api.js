const API_BASE_URL = 'https://api.exchangerate-api.com/v4/latest';

export const fetchExchangeRates = async (baseCurrency = 'KRW') => {
  try {
    const response = await fetch(`${API_BASE_URL}/${baseCurrency}`);
    if (!response.ok) {
      throw new Error('Failed to fetch exchange rates');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw error;
  }
};

export const CURRENCIES = [
  { code: 'USD', name: '미국 달러', symbol: '$', flag: '🇺🇸' },
  { code: 'JPY', name: '일본 엔', symbol: '¥', flag: '🇯🇵' },
  { code: 'EUR', name: '유로', symbol: '€', flag: '🇪🇺' },
  { code: 'CNY', name: '중국 위안', symbol: '¥', flag: '🇨🇳' },
  { code: 'GBP', name: '영국 파운드', symbol: '£', flag: '🇬🇧' },
];

export const formatNumber = (num, decimals = 2) => {
  return new Intl.NumberFormat('ko-KR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
};
