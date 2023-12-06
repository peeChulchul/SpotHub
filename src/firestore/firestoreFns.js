import { doc, setDoc, getDocs, collection, updateDoc, deleteDoc, where } from 'firebase/firestore';
import { FIRESTORE } from 'myFirebase';

//   최상위 컬렉션 전체를 읽어올때 사용
export async function getFirestore({ document }) {
  await getDocs(collection(FIRESTORE, document));
}

//   특정조건의 문서들을 읽어와야할때
export async function getFirestoreWhere({ document, fieldId, condition }) {
  await getDocs(doc(FIRESTORE, document), where(fieldId, '==', condition));
}

// 최초로 데이터를 생성할때 사용
export async function setFirestore({ document, fieldId, data }) {
  await setDoc(doc(FIRESTORE, document, fieldId), {
    data
  });
}

//   문서를 업데이트할때 사용
export async function updateFirestore({ document, fieldId, data }) {
  await updateDoc(doc(FIRESTORE, fieldId), {
    data
  });
}

//   문서를 삭제할때
export async function dleeteFirestore({ document, fieldId, data }) {
  await deleteDoc(doc(FIRESTORE, fieldId));
}
