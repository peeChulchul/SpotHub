import { doc, setDoc, getDocs, collection, updateDoc, deleteDoc, where, query, writeBatch } from 'firebase/firestore';
import { FIRESTORE } from 'myFirebase';

//   최상위 컬렉션 전체를 읽어올때 사용 O
export async function getFirestore({ document }) {
  const querySnapshot = await getDocs(collection(FIRESTORE, document));
  const result = [];
  querySnapshot.forEach((doc) => {
    result.push(doc.data());
  });
  return result;
}

//   특정조건의 문서들을 읽어와야할때 O
export async function getFirestoreSelect({ document, fieldId, condition }) {
  const q = query(collection(FIRESTORE, document), where(fieldId, '==', condition));
  const querySnapshot = await getDocs(q);
  const result = [];

  querySnapshot.forEach((doc) => {
    result.push(doc.data());
  });

  return result;
}
//   특정조건의 문서레퍼런스를  읽어와야할때 O

export async function getFirestoreSelectReference({ document, fieldId, condition }) {
  const q = query(collection(FIRESTORE, document), where(fieldId, '==', condition));
  const querySnapshot = await getDocs(q);

  return querySnapshot;
}

// 최초로 데이터를 생성할때 사용 O
export async function setFirestore({ document, fieldId, data }) {
  await setDoc(doc(FIRESTORE, document, fieldId), {
    ...data
  });
}

//   문서를 업데이트할때 사용 O
export async function updateFirestore({ document, fieldId, data }) {
  await updateDoc(doc(FIRESTORE, document, fieldId), {
    ...data
  });
}
export async function updateFirestoreReference({ data, ref }) {
  const batch = writeBatch(FIRESTORE);
  await ref.forEach((doc) => {
    const docRef = doc.ref;
    batch.update(docRef, data);
  });
  try {
    await batch.commit();
    console.log('일괄 업데이트가 성공적으로 수행되었습니다.');
  } catch (error) {
    console.error('일괄 업데이트 중 오류 발생:', error);
  }
}

//   문서를 삭제할때
export async function dleeteFirestore({ document, fieldId }) {
  await deleteDoc(doc(FIRESTORE, document, fieldId));
}
