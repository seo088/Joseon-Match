# MCP Spec

## Tools

- `get_questions`: 검사 문항을 반환합니다.
- `calculate_scores`: `{ questionId: choiceId }` 응답을 trait 점수로 변환합니다.
- `find_matching_figure`: trait 점수와 가장 가까운 조선 인물/직업군을 찾습니다.
- `generate_result`: 결과 카드 데이터를 생성합니다.

## Resources

- `joseon://questions`: 검사 문항 JSON
- `joseon://figures`: 인물/직업군 JSON
- `joseon://traits`: trait 설명 JSON

기준 데이터 규모:

- 질문: 15개
- 성향: 8개
- 결과 후보: 16개

## Prompts

- `profile_interview`: 사용자 성향 질문 생성을 요청합니다.
- `result_writer`: 결과 카드 문구 생성을 요청합니다.
