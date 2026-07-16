# Harness Test Report

## 실행 정보

- Harness: `Joseon Match MCP Flow Harness`
- 실행 명령: `python test/harness/mcp_flow_harness.py`
- 실행 일시: `2026-07-16 12:09:04`
- 결과 파일: `test/harness/reports/latest-report.json`
- 전체 결과: `PASS`

## 검증 결과

| 항목 | 결과 | 내용 |
| --- | --- | --- |
| `get_questions` 호출 결과 검증 | PASS | 15개의 양자택일 질문 로드 확인 |
| `calculate_scores` 성향 점수 검증 | PASS | 8개 성향 점수 반환 및 0~10 범위 확인 |
| `find_matching_figure` 인물 매칭 검증 | PASS | 16개 후보 중 최적 인물 반환 및 랭킹 16개 확인 |
| `generate_result` 결과 데이터 검증 | PASS | 제목, 설명, 이미지, 성향 그래프 데이터 포함 확인 |
| 전체 흐름 테스트 | PASS | 질문 조회 → 답변 입력 → 점수 계산 → 인물 매칭 → 결과 생성 완료 |

## 샘플 결과

- 샘플 답변 수: 15개
- 성향 키: `curiosity`, `justice`, `adventure`, `creativity`, `empathy`, `practicality`, `power`, `honor`
- 후보 랭킹 수: 16개
- 샘플 매칭 결과: `local-officer`
- 결과 데이터 필드: `title`, `figure`, `alternatives`, `scores`, `traitChartData`, `topTraits`, `strengths`, `description`, `advice`
- 고도화 결과 필드: `topTraitDetails`, `lowTraits`, `combinationDescription`, `personalitySummary`, `personalizedStrengths`, `caution`, `workStyle`, `relationshipStyle`, `decisionStyle`, `modernAdvice`, `disclaimer`

## 비고

`generate_result` 결과에 `traitChartData` 필드를 추가하여 결과 카드와 성향 그래프에 필요한 데이터를 명시적으로 검증할 수 있도록 개선했습니다.
결과 페이지 고도화 작업 이후에는 상위/하위 성향, 성향 조합, 행동 방식, 강점, 주의점, 안내 문구까지 Harness에서 함께 검증합니다.
