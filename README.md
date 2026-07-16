# 현대판 조선시대 직업/관상 테스트 MCP

Codex를 이용해 생성하는 MCP 프로젝트입니다. 사용자의 고민, 관심사, 성향 문장을 입력받아 “과거 조선시대였다면 어떤 인물 또는 직업군에 가까웠을지” 매칭하는 테스트 서비스를 목표로 합니다.

## 현재 단계

환경 세팅 단계입니다. MCP 서버 실행, Harness 검증, 기본 Tool/Resource/Prompt 등록 골격을 준비했습니다.

## 프로젝트 방향

- 입력: 사용자의 고민 또는 성향 문장
- 분석: 키워드 추출, 성향 분류, 조선시대 직업군 데이터와 매칭
- 결과: “당신은 저잣거리 최고의 전기수 자질이 있군요!”처럼 재미있는 결과 카드 생성
- 데이터 후보: 공공데이터포털 한국학중앙연구원 인물 정보, 조선시대 직업군 설명 데이터, 크롤링 기반 보조 데이터
- 기술 요소: MCP Tool, MCP Resource, MCP Prompt, Harness 기반 검증

## 실행 방법

```bash
npm install
npm start
```

서버는 stdio 기반 MCP 서버이므로 일반 터미널에서 `npm start` 실행 시 입력을 기다립니다. 실제 동작 확인은 Harness를 사용합니다.

```bash
npm test
```

성공 시 다음 메시지가 출력됩니다.

```text
조선시대 직업 테스트 MCP 환경 검증 통과
```

## 준비된 MCP 항목

- Tools
  - `analyze_user_profile`: 사용자 입력 분석 골격
  - `match_joseon_role`: 조선시대 직업 매칭 골격
  - `generate_questionnaire`: 간단 검사지 생성 골격
- Resources
  - `joseon://project-plan`: 프로젝트 구현 계획
  - `joseon://role-seed`: 초기 직업군 샘플 데이터
- Prompts
  - `profile_interview`: 성향 인터뷰 프롬프트
  - `result_writer`: 결과 카드 작성 프롬프트

## 다음 구현 단계

1. 조선시대 직업군 데이터 구조 확정
2. 사용자 문장 키워드 추출 로직 구현
3. 키워드와 직업군 traits 사이의 점수 기반 매칭 구현
4. 검사지 생성 및 응답 기반 매칭 구현
5. 결과 카드 생성 형식 고도화
