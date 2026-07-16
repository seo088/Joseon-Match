# Joseon Match

현대 사용자의 성향과 고민을 입력받아 “조선시대였다면 어떤 인물 또는 직업군에 가까웠을지” 매칭하는 MCP 기반 성향 테스트 프로젝트입니다.

## 프로젝트 구조

- `frontend/`: 사용자 웹앱
- `mcp-server/`: MCP Tool, Resource, Prompt 서버
- `docs/`: 설계, 점수 산정, MCP 명세 문서

## 실행 방법

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### MCP Server

```bash
cd mcp-server
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python server.py
```

MCP 서버는 stdio 기반으로 실행됩니다. Codex, Claude Desktop, MCP Inspector 같은 MCP 클라이언트에서 연결해 Tool, Resource, Prompt를 호출할 수 있습니다.

## MCP 항목

- Tools
  - `get_questions`: 검사 문항 조회
  - `calculate_scores`: 응답 기반 성향 점수 계산
  - `find_matching_figure`: 점수 기반 조선 인물/직업군 매칭
  - `generate_result`: 결과 카드 생성
- Resources
  - `joseon://questions`
  - `joseon://figures`
  - `joseon://traits`
- Prompts
  - `profile_interview`
  - `result_writer`

## 현재 상태

요청한 디렉터리 구조를 기준으로 프론트엔드와 MCP 서버 실행 골격을 구성했습니다. 다음 단계에서 실제 공공데이터 또는 크롤링 데이터 확장, 이미지 자산 추가, MCP Harness 검증을 강화합니다.
