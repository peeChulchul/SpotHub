import { doc, setDoc, getDocs, collection, updateDoc, deleteDoc, where, query } from 'firebase/firestore';
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
export async function getFirestoreWhere({ document, fieldId, condition }) {
  const q = query(collection(FIRESTORE, document), where(fieldId, '==', condition));
  const querySnapshot = await getDocs(q);
  const result = [];

  querySnapshot.forEach((doc) => {
    result.push(doc.data());
  });

  return result;
}

// 최초로 데이터를 생성할때 사용 O
export async function setFirestore({ document, fieldId, data }) {
  try {
    await setDoc(doc(FIRESTORE, document, fieldId), {
      ...data
    });
  } catch (error) {
    console.log(error);
  }
}

//   문서를 업데이트할때 사용 O
export async function updateFirestore({ document, fieldId, data }) {
  try {
    await updateDoc(doc(FIRESTORE, document, fieldId), {
      ...data
    });
  } catch (error) {
    console.log(error);
  }
}

//   문서를 삭제할때
export async function dleeteFirestore({ document, fieldId }) {
  try {
  } catch (error) {}
  await deleteDoc(doc(FIRESTORE, document, fieldId));
}
