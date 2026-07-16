# 당신이 조선시대에 태어났다면?

현대 사용자의 선택을 바탕으로 “조선시대였다면 어떤 인물 또는 직업군에 가까웠을지” 매칭하는 MCP 기반 성향 테스트 웹앱입니다.

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

현재 초기 버전은 별도 데이터베이스 없이 JSON 파일을 사용합니다. 사용자가 15개의 양자택일 질문에 답하면 8가지 숨겨진 성향 점수를 계산하고, 16개의 조선시대 인물 또는 직업 중 가장 가까운 결과를 보여줍니다.

사용자 화면에서는 질문이 어떤 성향을 측정하는지 표시하지 않습니다. 새로고침해도 진행 상황과 결과가 유지되도록 `localStorage`를 사용합니다.

## 실행 흐름

1. 메인 화면
2. 퀴즈 시작
3. MCP `get_questions` 흐름에 해당하는 질문 데이터 로드
4. 사용자가 15개 질문에 답변
5. `calculate_scores`로 8개 성향 점수 계산
6. `find_matching_figure`로 16개 결과 중 최적 인물 선택
7. `generate_result`로 결과 카드 생성
8. 인물 이미지, 설명, 강점, 성향 그래프 표시
