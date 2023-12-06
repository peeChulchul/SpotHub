import {
  dleeteFirestore,
  getFirestore,
  getFirestoreWhere,
  setFirestore,
  updateFirestore
} from 'firestore/firestoreFns';
import useQueryHook from 'hooks/useQuery';
import useQuery from 'hooks/useQuery';
import React, { useEffect } from 'react';

export default function Index() {
  // const [userLoading, userError, userData] = useQueryHook({ document: 'user' });
  const {
    isLoding: testLoading,
    isError: testError,
    data: testData,
    selectValue: testSelectValue,
    getFirestoreSelect,
    setFirestore,
    updateFirestore,
    dleeteFirestore
  } = useQueryHook({ document: 'test' });

  useEffect(() => {
    // 데이터 읽어오기
    // (async () => {
    //   const testfn = await getFirestore({ document: 'user' });
    // })();
    ('');
    // 특정 데이터만 읽어오기
    // (async () => {
    //   const testfn = await getFirestoreWhere({
    //     document: 'user',
    //     fieldId: 'uid',
    //     condition: 'O6nusyNaTqUCPyaIqWNIHpz0wT22'
    //   });
    // })();
    ('');

    // 문서필드 최초 생성
    // (async () => {
    //   const testfn = await setFirestore({
    //     document: 'test',
    //     fieldId: 'test001',
    //     data: { name: '테스트001', value: '테스트001' }
    //   });
    // })();
    ('');
    // 문서내용수정 업데이트
    // (async () => {
    //   const testfn = await updateFirestore({
    //     document: 'test',
    //     fieldId: 'test001',
    //     data: { name: 'test002' }
    //   });
    // })();
    ('');
    // 문서 삭제
    // (async () => {
    //   const testfn = await dleeteFirestore({
    //     document: 'test',
    //     fieldId: 'test001'
    //   });
    // })();

    (async () => {})();
    getFirestoreSelect({
      fieldId: 'name',
      condition: '토스트'
    });
  }, []);
  console.log(testData, testSelectValue, testError, testLoading);

  return <div>Index</div>;
}
