## 아웃소싱 프로젝트

### 소개
-SpotHub은 지도서비스를 활용하여 사용자들이 서로 쓰레기통, 개방화장실, 폐건전지 수거함, 의류수거함 위치를 공유하는 서비스입니다.

### 주요 기능

1. **위치 공유:** 사용자들은 쓰레기통, 개방화장실 등의 위치를 지도에 핀으로 표시하고 해당 장소에 대한 정보를 공유할 수 있습니다.
2. **회원제:** 회원가입 후 자신이 확인한 시설의 위치를 추가하거나 다른 사용자가 남긴 정보에 대한 리뷰를 남길 수 있습니다.
3. **실시간 업데이트:** 지도에 표시된 정보는 실시간으로 업데이트되어 사용자들에게 최신 정보를 제공합니다.

### 사이트
<img width="1280" alt="image" src="https://github.com/nbc-9gling/news-feed/assets/144536397/1e39950f-6265-4625-8bf2-ebfe8744afca">

### 기술 스택 및 사용 라이브러리
- react
- rtk
- react-router-dom
- react-query
- styled-components
- styled-reset
- uuid

### 외부 서비스 및 도구

- 데이터베이스: Firebase
- 지도 API: 카카오맵
- 디자인 및 협업 도구: Figma, Notion

### 프로젝트 설치

### clone repository

```
github.com/Solyi-Park/REACT-Outsourcing-pj.git
```

### Install npm dependencies

```
yarn
yarn install
```

### Start dev-server

```
yarn start
```

### 요구사항

### 🔵 필수 구현 사항

##### 로그인, 회원 가입
- ✔️ 지도상에 Marker를 표시하고 활용해 보세요
- ❌ Youtube API
- ❌ 설문조사

- ✔️ 상태관리 라이브러리는 RTK를 사용하고, React-query 또는 Redux Thunk 사용은 택1 진행
- ✔️ irebase 또는 json-server 택1 진행


### 🔵 추가 구현 사항
- ❌ 무한스크롤 구현 (Intersection Observer API (Web API)를 사용해보기)
- ❌ Youtube API 요청을 통해 pagination 구현
- ❌ React Query의 Optimistic Update 적용해보기
- ✔️ firebase Auth 를 사용하여, 로그인 회원가입 기능 구현

