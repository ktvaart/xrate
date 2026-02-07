# XRate - 실시간 환율 앱

KRW 기준 실시간 환율 조회 및 계산기 앱

## 기술 스택

- React 19
- Vite 7
- CSS (CSS Variables, Flexbox, Grid)

## 설치 방법

```bash
# 저장소 클론
git clone <repository-url>
cd xrate

# 의존성 설치
npm install
```

## 실행 방법

```bash
# 개발 서버 실행
npm run dev
```

## 접속 경로

개발 서버 실행 후 브라우저에서 접속:

```
http://localhost:5173
```

## 기타 스크립트

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과물 미리보기
npm run preview

# ESLint 검사
npm run lint
```

## 주요 기능

- 실시간 환율 조회 (60초마다 자동 갱신)
- 환율 계산기 (KRW ↔ 외화 양방향 변환)
- 주요 통화 지원 (USD, JPY, EUR, CNY, GBP)
- 환율 변동 표시 (상승/하락)
- 다크모드 지원
