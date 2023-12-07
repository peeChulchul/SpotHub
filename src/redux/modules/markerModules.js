import { createSlice } from '@reduxjs/toolkit';

const 마커의데이터형식 = { location: '', uploadimage: '', adress: '', uid: '', locationId: '', report: [] };

const initialState = {
  isLoading: true,
  massage: null,
  error: null,
  marker: []
};

// 1. 네트워크 통신에 관련된 로직은 pending시 로딩은 true로  error및 massage는 null로 바꿔주어야한다 (네트워크 통신시 시간이 걸림)
// 2. 마커를 실시간으로 감지해야할지 고민이 필요함
// 3. 마커가 추가되었을시 실시간 감지중이라면 자동으로 갱신, 그렇지않다면 marker배열에 데이터 추가 ,
// 4. 마커 삭제시 실시간 감지중이라면 자동으로 갱신 , 그렇지않다면 marker배열에 데이터제거,
// 5. 마커 수정시  실시간 감지중이라면 자동으로 갱신 , 그렇지않다면 marker배열에 데이터수정 (추가, 삭제가 아닌 수정시에는 실시간 감지를 못할가능성이 높음{불변성으로 인해})

const markerModules = createSlice({ name: 'markerModules', initialState, reducers: {} });

export default markerModules.reducer;
