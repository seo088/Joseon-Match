# Scoring Rule

각 선택지는 하나 이상의 trait 점수를 가집니다. 사용자가 선택한 답변의 trait 점수를 합산한 뒤, 성향별 최대 가능 점수를 기준으로 0~10 점수로 정규화합니다.

현재 trait:

- `curiosity`: 탐구심
- `justice`: 정의감
- `adventure`: 모험심
- `creativity`: 창의성
- `empathy`: 공감 능력
- `practicality`: 현실 감각
- `power`: 영향력
- `honor`: 명예 지향

문항 수는 15개이며 모든 문항은 상황 기반 양자택일입니다. 사용자에게는 성향 점수와 trait 이름을 질문 도중 표시하지 않습니다.

## Matching

1. 선택지 점수를 합산해 `rawScores`를 계산합니다.
2. 각 성향의 문항 내 최대 가능 점수를 합산해 `maximumScores`를 계산합니다.
3. `rawScores / maximumScores * 10`으로 `normalizedScores`를 계산합니다.
4. 사용자 성향과 인물 성향 사이의 유클리드 거리를 계산합니다.
5. 사용자 상위 3개 성향과 인물 상위 3개 성향이 겹칠 때마다 `0.8`의 보너스를 거리에서 차감합니다.
6. 최종 거리가 가장 작은 인물을 결과로 선택하고, 다음 2명을 대안 결과로 보관합니다.
