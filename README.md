# Next.js with Supabase Playground

직접 구성해보고 빠르게 만들어보면서 지식을 체화한다.

## 주요 기능

- 카카오 OAuth 기능 구현
- Supabase를 활용한 데이터베이스 활용
  - `Notes`, `Profiles`, `Likes` 테이블 구성
- Server Action 활용
  - 노트 추가 및 삭제
  - 유저 좋아요 생성 및 제거

## 프로토타입

[피그마 디자인](https://www.figma.com/file/v6HH9gNN4Ec2mk9SlTTGJW/Next.js-with-Supabase-Playground?type=design&node-id=0%3A1&mode=design&t=gD5gL27MQXO5Je6v-1)

## 느낀 점

### Next.js 관련

- 캐싱, form 태그 등에서 웹 표준을 많이 활용하게 되는 것 같다.
- 소규모 프로젝트에서는 오버 엔지니어링인 것 같다.
- 해야 하는 과정이 많다 보니 작업 속도가 빠르게 나오지 않는다.
- `use client`, `use server`를 구별하면서 파일을 작게 쪼개는 과정이 상당히 귀찮다.
- `server component`에서 `mutation` 작업이 익숙하지 않아서 그런지 번거롭게 힘들다.
- 복잡한 기능은 어떻게 구현해야 할 지 아직은 모르겠다.

### Supabase 관련

- 사이드 프로젝트 진행 시 가장 걱정되는 데이터, 유저 문제를 정말 쉽게 해결할 수 있다.
- 특히 OAuth도 손쉽게 처리해준 점이 좋았다.
- DB 관련 지식이 부족해서 많은 삽질을 겪었다.
- DB 관련 지식이 부족해서 복잡한 기능은 지금 구현하기에 무리가 있다.
- 그럼에도 Supabase 덕분에 간단한 기능이나마 직접 구현할 수 있었다.
- 데이터 타입이 안맞는 부분이 있는 것 같다. 타입 및 데이터 변환에서 삽집 좀 했다.
