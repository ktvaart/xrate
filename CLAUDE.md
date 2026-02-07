# XRate - 실시간 환율 앱

## 프로젝트 개요
KRW 기준 실시간 환율 조회 및 계산기 앱 (Vite + React)

## 기술 스택
- React 18 (Functional Components, Hooks)
- Vite (빌드 도구)
- CSS (CSS Variables, Flexbox, Grid)
- Fetch API

## 폴더 구조
```
src/
├── components/
│   ├── ExchangeRateCard.jsx  # 개별 환율 카드
│   ├── Calculator.jsx        # 환율 계산기
│   ├── CurrencyList.jsx      # 통화 목록
│   └── ThemeToggle.jsx       # 다크모드 토글
├── hooks/
│   └── useExchangeRate.jsx   # API 호출 커스텀 훅
├── utils/
│   └── api.js                # API 설정 및 유틸리티
├── App.jsx                   # 메인 앱
├── App.css                   # 앱 스타일
├── index.css                 # 글로벌 스타일 (테마 변수)
└── main.jsx                  # 엔트리 포인트
```

## 주요 기능
1. **실시간 환율 조회** - 60초마다 자동 갱신
2. **환율 계산기** - KRW ↔ 외화 양방향 변환
3. **주요 통화** - USD, JPY, EUR, CNY, GBP
4. **환율 변동 표시** - 상승(빨강), 하락(파랑)
5. **다크모드** - localStorage 저장, 시스템 테마 감지

## API
- **URL**: `https://api.exchangerate-api.com/v4/latest/KRW`
- **인증**: 불필요 (무료 API)
- **응답**: KRW 기준 각 통화 환율

## 실행 방법
```bash
npm install
npm run dev
```

## 데이터 저장 (localStorage)
- `xrate_theme` - 다크/라이트 테마 설정
- `xrate_previous_rates` - 이전 환율 (변동 비교용)

## 스타일 가이드
- CSS 변수로 테마 관리 (`index.css`)
- 환율 상승: `--rate-up` (빨강)
- 환율 하락: `--rate-down` (파랑)
- 반응형 브레이크포인트: 768px
