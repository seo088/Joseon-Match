# Architecture

Joseon Match는 React 프론트엔드와 Python MCP 서버를 분리한 구조입니다.

- Frontend: React Router 기반 검사 흐름, localStorage 진행 저장, 결과 화면, Recharts 시각화 담당
- MCP Server: 문항 데이터, 점수 계산, 인물 매칭, 결과 생성 담당
- Data: JSON 파일로 관리하며 초기 버전에서는 별도 데이터베이스를 사용하지 않습니다.

사용자 화면에는 각 문항이 측정하는 성향 정보를 표시하지 않습니다.
