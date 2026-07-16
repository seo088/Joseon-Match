# Scoring Rule

각 선택지는 하나 이상의 trait 점수를 가집니다. 사용자가 선택한 답변의 trait 점수를 합산한 뒤, 각 인물의 기준 trait 벡터와 거리 합이 가장 작은 인물을 결과로 선택합니다.

현재 trait:

- `curiosity`: 탐구심
- `justice`: 정의감
- `adventure`: 모험심
- `creativity`: 창의성
- `empathy`: 공감 능력
- `practicality`: 현실 감각
- `power`: 권력 지향
- `honor`: 명예 지향

문항 수는 15개이며 모든 문항은 양자택일입니다. 사용자에게는 성향 점수와 trait 이름을 질문 도중 표시하지 않습니다.
