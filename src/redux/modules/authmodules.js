import { createSlice } from '@reduxjs/toolkit';

const 유저의데이터형식 = { uid: '', avatar: '', nickname: '' };

const initialState = {
  isLoading: true,
  massage: null,
  error: null,
  currentUser: null
};

// 1. 네트워크 통신에 관련된 로직은 pending시 로딩은 true로  error및 massage는 null로 바꿔주어야한다 (네트워크 통신시 시간이 걸림)
// 2. 실시간 유저감지된 값으로 currentUser에 값을넣어주어야한다. 실시간 유저감시는 Authentication에서 값을 내려주어야한다!!.
// 3. Authentication에서 회원가입 시 가입된 유저의 데이터를 db에 저장해주어야한다.
// 4. 로그인시 실시간 유저감지중이라면 자동으로 currentUser값을 바꿔줄 것이므로 별다른 조작을 할 필요없다. 그렇지 않을시 cuurentUser에 값을 넣어줘야한다.
// 5. 로그아웃시 실시간 유저감지중이라면 자동으로 currentUser값을 바꿔줄 것이므로 별다른 조작을 할 필요없다. 그렇지 않을시 cuurentUser에 값을 넣어줘야한다.
// 6. 유저의 정보가 업데이트 되었을시 해당하는 유저의 데이터를 db에서 찾아 업데이트된 부분을 최신화 시켜주어야한다.

const authModules = createSlice({ name: 'authModules', initialState, reducers: {} });

export default authModules.reducer;
