import { useDeleteQuery, useQueryHook, useSetQuery, useUpdateQuery } from 'hooks/useQueryHook';
import React, { useEffect } from 'react';

export default function Index() {
  // const [userLoading, userError, userData] = useQueryHook({ document: 'user' });
  const { isLoading: testLoading, isError: testError, data: testData } = useQueryHook({ document: 'test' });
  const { mutate: setQuery } = useSetQuery({
    document: 'test',
    fieldId: 'test001',
    data: { name: '테스트트', value: '테스트트' }
  });
  const { mutate: updateQuery } = useUpdateQuery({
    document: 'test',
    fieldId: 'test001',
    data: { name: '테스트트업데이트', value: '테스트트업데이트' }
  });
  const { mutate: deleteQuery } = useDeleteQuery({
    document: 'test',
    fieldId: 'test001'
  });

  console.log(testData);
  console.log(testLoading);

  return (
    <div>
      Index
      <button onClick={setQuery}>테스트추가버튼</button>
      <button onClick={updateQuery}>테스트업데이트버튼</button>
      <button onClick={deleteQuery}>테스트삭제버튼</button>
    </div>
  );
}
