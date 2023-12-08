// import { updateDoc } from 'firebase/firestore';
// import { useQueryHook, useUpdateQuery } from 'hooks/useQueryHook';
// import { FIRESTORE } from 'myFirebase';
// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import styled from 'styled-components';

// export default function EditMarker() {
//   const [editData, setEditData] = useState(null);
//   const [markersData, setMarkersData] = useState(null);
//   const [isButtonDisabled, setIsButtonDisabled] = useState(true);

//   const { uid, avatar, nickname } = useSelector((state) => state.currentUserModules.currentUser);
//   const { data: markers } = useQueryHook({ document: 'markers' });
//   const updateQuery = useUpdateQuery({ document: 'markers' });
//   const { markerId } = useParams();

//   const [formInput, setFormInput] = useState({
//     locationName: '',
//     option: '',
//     comment: '',
//     image: ''
//   });
//   const { locationName, option, comment, image } = formInput;
//   const [selectedImg, setSelectedImg] = useState(null);
//   const [selectedFile, SetselectedFile] = useState(null);

//   // Form Input 이벤트 핸들러
//   const changeFormState = (e) => {
//     const { name, value } = e.target;
//     setFormInput((prev) => ({ ...prev, [name]: value }));
//   };
//   //업로드할 이미지 파일 선택
//   const handleFileSelect = (event) => {
//     const file = event.target.files[0];
//     console.log('file: ', file);
//     if (file) {
//       console.log('업로드할 이미지 파일이 선택되었음.');
//     }
//     SetselectedFile(file);
//     // 이미지 프리뷰
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       console.log('파일 읽기 완료');
//       const readerResult = reader.result; // 파일 내용 여기 들어있음 이상한 문자
//       // console.log('readerResult', readerResult);
//       setSelectedImg(readerResult);
//     };
//     const result = reader.readAsDataURL(file);
//     console.log('result', result);
//   };

//   // 수정하기 버튼 핸들러
//   const hadleModifyButton = () => {
//     // setIsModifyMode(true);
//     const selectOne = markers.find((marker) => {
//       return marker.id === markerId;
//     });
//     setEditData(selectOne);
//     setFormInput({
//       locationName: editData.locationName,
//       option: editData.option,
//       comment: editData.comment,
//       image: editData.image
//     });
//   };

//   //수정완료 버튼 이벤트 핸들러

//   const handleCompleteModify = () => {
//     // const useConfirm = window.confirm('수정하시겠습니까?');
//     // if (!useConfirm) return;
//     // const updateData = {
//     //   // uid 와 location은 수정하지 않으므로 생략
//     //   image,
//     //   locationName,
//     //   option,
//     //   comment,
//     //   timeStamp: new Date() //포멧팅?
//     // };
//     // try {
//     //   //파이어스토어 내용 수정 로직
//     //   useUpdateQuery({
//     //     document: 'markers',
//     //     fieldId: paramId,
//     //     data: updateData
//     //   });
//     //   console.log('수정완료');
//     //   alert('수정이 완료되었습니다.');
//     //   setIsModifyMode(false);
//     //   setEditData(null);
//     //   // 모달창 닫기 ????
//     //   navigate('/');
//     // } catch (err) {
//     //   console.log('수정 실패 ==> ', err);
//     //   alert('수정에 실패하였습니다. 다시 시도해주세요.');
//     // }
//   };

//   //삭제하기 이벤트핸들러
//   const hadleDeleteButton = () => {
//     alert('삭제버튼 클릭됨!');
//     //   const userConfirm = window.confirm('마커를 삭제하시겠습니까?')
//     //   if(!userConfirm) return;
//     try {
//       //   deleteQuery.mutate(paramId);
//     } catch (err) {
//       console.log('삭제 실패', err);
//     }
//   };

//   // 등록취소 버튼 핸들러
//   const handleCancelButton = () => {
//     const userConfirmed = window.confirm('작성한 내용이 사라집니다. 창을 닫을까요?');
//     if (!userConfirmed) {
//       return;
//     } else {
//       // 사용자가 입력한 정보 초기화
//       setFormInput({
//         locationName: '',
//         option: '',
//         comment: '',
//         image: null
//       });
//     }
//     // 목록 다시 보여주기
//   };

//   return (
//     <>
//       <Form>
//         <ImgLabel htmlFor="imgInput">
//           <figure>
//             <LocationImg src={selectedImg} />
//             <p>{image || '이미지 선택'}</p>
//           </figure>
//           <ImgInput name="image" type="file" accept="image/*" id="imgInput" onChange={handleFileSelect} />
//         </ImgLabel>
//         <User>{nickname}</User>
//         <LocationName
//           name="locationName"
//           placeholder="장소명을 입력해주세요."
//           value={locationName}
//           onChange={changeFormState}
//         />
//         <SelectBox name="option" value={option} onChange={changeFormState}>
//           <option value="">선택하기</option>
//           <option value="쓰레기통">쓰레기통</option>
//           <option value="화장실">화장실</option>
//           <option value="의류수거함">의류수거함</option>
//           <option value="폐건전지">폐건전지</option>
//         </SelectBox>
//         <TextArea
//           name="comment"
//           placeholder="장소에 대한 의견을 남겨주세요!"
//           value={comment}
//           onChange={changeFormState}
//         />
//         <Buttons>
//           <ModifyAndDeleteButton $isModifyMode={markerId} onClick={markerId ? handleCompleteModify : hadleModifyButton}>
//             {markerId ? '수정완료' : '수정하기'}
//           </ModifyAndDeleteButton>
//           <ModifyAndDeleteButton onClick={markerId ? handleCancelButton : hadleDeleteButton}>
//             {markerId ? '취소' : '삭제'}
//           </ModifyAndDeleteButton>
//         </Buttons>
//       </Form>
//     </>
//   );
// }

// const Form = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   width: 400px;
//   height: 500px;
//   background-color: #fff;
//   padding: 20px;
//   gap: 20px;
// `;

// const ImgLabel = styled.label`
//   position: relative;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 250px;
//   height: 250px;
//   border: 1px solid lightgray;
//   overflow: hidden;
//   &:hover {
//     cursor: pointer;
//   }
// `;

// const LocationImg = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
// `;

// const ImgInput = styled.input`
//   display: none;
// `;

// const User = styled.h3`
//   /* position: absolute; */
//   margin: 10px auto 0 20px;
//   font-size: 12px;
//   font-weight: 700;
//   color: #111;
// `;

// const LocationName = styled.input`
//   width: 90%;
//   height: 25px;
//   font-size: 12px;
//   padding: 5px;
//   border: none;
//   border-bottom: 1px solid grey;
//   outline: none;
// `;

// // 여유있으면 커스텀 모달 만들어보기
// const SelectBox = styled.select`
//   width: 91%;
//   height: 40px;
//   border: none;
//   padding: 5px;
//   border: none;
//   border-bottom: 1px solid grey;
//   outline: none;
//   color: #111;
//   font-size: 12px;
// `;

// const TextArea = styled.input`
//   width: 90%;
//   height: 70px;
//   font-size: 12px;
//   resize: none;
//   padding: 5px;
//   border: none;
//   border-bottom: 1px solid grey;
//   outline: none;
//   color: #111;
// `;

// const Buttons = styled.div`
//   display: flex;
//   justify-content: space-around;
//   gap: 20px;
// `;

// const AddButton = styled.button`
//   padding: 10px 40px;
//   border: none;
//   border-radius: 5px;
//   background-color: ${(props) => (props.disabled ? 'lightgray' : '#FF6000')};
//   cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
// `;
// const CancelButton = styled.button`
//   padding: 10px 40px;
//   border: none;
//   border-radius: 5px;
//   background-color: #ffe6c7;
//   &:hover {
//     cursor: pointer;
//   }
// `;

// const ModifyAndDeleteButton = styled.p`
//   padding: 10px 40px;
//   border: ${(props) => (props.$isModifyMode ? 'none' : '1px solid #111')};
//   border-radius: 5px;
//   background-color: ${(props) => (props.$isModifyMode ? '#FF6000' : 'transparent')};
//   cursor: pointer;
// `;
