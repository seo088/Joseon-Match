# MCP Spec

## Tools

- `get_questions`: 검사 문항을 반환합니다.
- `calculate_scores`: `{ questionId: choiceId }` 응답을 0~10 정규화 trait 점수로 변환합니다.
- `find_matching_figure`: 정규화 trait 점수와 가장 가까운 조선 인물/직업군을 찾고 대안 결과 2개를 함께 반환합니다.
- `generate_result`: 결과 카드 데이터를 생성합니다. 기본 결과 정보에 더해 상위/하위 성향, 성향 조합 설명, 개인화 요약, 강점, 주의점, 행동 방식, 현대식 조언, 안내 문구를 반환합니다.

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

## `generate_result` 주요 출력 필드

- `title`: 최종 결과 제목
- `figure`: 매칭 인물 또는 직업군 정보
- `scores`: 8개 정규화 성향 점수
- `traitChartData`: 성향 그래프 표시용 데이터
- `topTraitDetails`: 상위 성향 3개
- `lowTraits`: 하위 성향 1~2개
- `combinationDescription`: 상위 성향 2개 조합 해석
- `personalitySummary`: 4~6문장 성향 요약
- `personalizedStrengths`: 인물 고정 강점과 상위 성향 기반 강점
- `caution`: 가장 두드러진 성향 기반 주의 문장
- `workStyle`: 일할 때의 행동 방식
- `relationshipStyle`: 사람들과 있을 때의 관계 방식
- `decisionStyle`: 선택의 순간 판단 방식
- `modernAdvice`: 현대식 조언
- `disclaimer`: 오락 및 자기 탐색용 콘텐츠 안내 문구
