import { updateDoc } from 'firebase/firestore';
import { FIRESTORE } from 'myFirebase';
import React from 'react'

export default function EditMarker() {
    const markerRef = doc(FIRESTORE, "markers", marker.id);
    // await updateDoc(todoRef, { ...todo, isDone: !todo.isDone });

  return (
    <div>
        <p>이미지</p>
        <p>유저닉넴</p>
        <p>장소</p>
        <p>옵션</p>
        <p>코멘트</p>
    </div>
  )
}
