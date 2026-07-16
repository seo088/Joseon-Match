# Joseon Match MCP Harness

이 Harness는 MCP 서버의 핵심 Tool 구현체를 호출하여 과제 요구 흐름을 검증합니다.

## 실행

```bash
python test/harness/mcp_flow_harness.py
```

## 검증 항목

- `get_questions` 호출 결과가 15개인지 검증
- `calculate_scores`가 8개 성향 점수를 반환하는지 검증
- `find_matching_figure`가 16개 후보 중 하나를 반환하는지 검증
- `generate_result`가 제목, 설명, 이미지, 성향 그래프 데이터를 포함하는지 검증
- 질문 조회 → 답변 입력 → 점수 계산 → 인물 매칭 → 결과 생성 전체 흐름 검증

## 리포트

기본 실행 시 `test/harness/reports/latest-report.json` 파일에 결과가 저장됩니다.
