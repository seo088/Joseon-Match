# Architecture

Joseon Match는 React 프론트엔드와 Python MCP 서버를 분리한 구조입니다.

- Frontend: 사용자의 검사 흐름, 결과 화면, 시각화 담당
- MCP Server: 문항 데이터, 점수 계산, 인물 매칭, 결과 생성 담당
- Data: `mcp-server/data/*.json`의 seed 데이터를 먼저 사용하고, 이후 공공데이터 또는 크롤링 데이터로 확장합니다.
