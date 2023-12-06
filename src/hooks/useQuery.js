import { doc, setDoc, getDocs, collection, updateDoc, deleteDoc, where, query } from 'firebase/firestore';
import { FIRESTORE } from 'myFirebase';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
export default function useQueryHook({ document }) {
  const { isLoding, isError, data } = useQuery({ queryKey: [document], queryFn: getFirestore });
  const [selectValue, setSelectValue] = useState();

  //   최상위 컬렉션 전체를 읽어올때 사용 O
  async function getFirestore() {
    const querySnapshot = await getDocs(collection(FIRESTORE, document));
    const result = [];
    querySnapshot.forEach((doc) => {
      result.push(doc.data());
    });
    return result;
  }

  //   특정조건의 문서들을 읽어와야할때 O
  async function getFirestoreSelect({ fieldId, condition }) {
    const q = query(collection(FIRESTORE, document), where(fieldId, '==', condition));
    const querySnapshot = await getDocs(q);
    const result = [];

    querySnapshot.forEach((doc) => {
      result.push(doc.data());
    });

    setSelectValue(result);
    return result;
  }

  // 최초로 데이터를 생성할때 사용 O
  async function setFirestore({ fieldId, data }) {
    try {
      await setDoc(doc(FIRESTORE, document, fieldId), {
        ...data
      });
    } catch (error) {
      console.log(error);
    }
  }

  //   문서를 업데이트할때 사용 O
  async function updateFirestore({ fieldId, data }) {
    try {
      await updateDoc(doc(FIRESTORE, document, fieldId), {
        ...data
      });
    } catch (error) {
      console.log(error);
    }
  }

  //   문서를 삭제할때
  async function dleeteFirestore({ fieldId }) {
    try {
    } catch (error) {}
    await deleteDoc(doc(FIRESTORE, document, fieldId));
  }

  return { isLoding, isError, data, selectValue, getFirestoreSelect, setFirestore, updateFirestore, dleeteFirestore };
}
