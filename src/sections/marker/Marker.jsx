import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { FIRESTORE, STORAGE } from 'myFirebase';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQueryHook, useUpdateQuery } from 'hooks/useQueryHook';
import { addDoc, collection } from 'firebase/firestore';
import uuid from 'react-uuid';
import shortid from 'shortid';
import { useNavigate } from 'react-router-dom';
// import DefaultImg from './default.jpg';
// TODO: 모든 값 입력시 버튼 활성화 -> img 추가시 image부분 상태 변경
// TODO: 이미지 프리뷰
// toastify로 알럿 변경

export default function Marker() {
  const navigate = useNavigate();
  const { isLoading, isError, data: markers } = useQueryHook({ document: 'markers' });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [formInput, setFormInput] = useState({
    marker: '',
    option: '',
    comment: '',
    image: ''
  });
  const { marker, option, comment, image } = formInput;

  //수정모드, 수정된 데이터
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState(null);

  //등록 버튼 비활성화
  useEffect(() => {
    if (!marker || !option || !comment) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  });

  // Form Input 이벤트 핸들러
  const changeFormState = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({ ...prev, [name]: value }));
  };

  const locationId = '11.111.111'; // 나중에 임포트
  const locationImagePath = `location/${locationId}`; // 나중에 currentUser정보도?

  //이미지 프리뷰
  const imgPreview = () => {
    // const selectedOne = file[0];
    //이미지 프리뷰
    // const reader = new FileReader();
    //   setFormInput((prev) => ({
    //     ...prev,
    //     image: result
    //   }));
    // };
    // reader.readAsDataURL(file);
  };

  //업로드할 이미지 파일 선택
  const handleFileSelect = (event) => {
    const file = event.target.files;
    // 파일이 선택되었는지 확인
    if (file && file.length > 0) {
      console.log('file', file);
      setFormInput((prev) => ({ ...prev, [image]: file }));
    }
  };

  // useEffect(() => {
  //   console.log('FormInput State Updated:', formInput);
  // }, [formInput]);

  //파일 업로드하기
  const FileUpload = async () => {
    if (!image) {
      return;
    } else {
      try {
        // const imageRef = ref(STORAGE, `${AUTH.currentUser.uid}/${image.name}`);
        const imageRef = ref(STORAGE, `${locationImagePath}/${image.name}`);
        await uploadBytes(imageRef, image);
        const downloadURL = await getDownloadURL(imageRef);
        // image 상태 업데이트
        setFormInput((prev) => ({
          ...prev,
          [image]: downloadURL
        }));
        console.log('downloadURL: ', downloadURL);
      } catch (err) {
        console.log('파일 업로드실패', err);
      }
    }
  };

  //마커 등록하기
  const handleAddMarkerButton = async (e) => {
    e.preventDefault();
    try {
      const userConfirm = window.confirm('선택된 이미지가 없습니다. 이대로 등록할까요?');
      if (!userConfirm) {
        return;
      } else {
        FileUpload();

        const newMarker = {
          // uid: '', 현재 사용자정보 import 해오기/ 전역
          // location: '', 현재 활성화된 마커 location 정보 import 해오기

          id: shortid.generate(),
          image,
          marker,
          option,
          comment,
          timeStamp: new Date() //포멧팅?
        };
        const collectionRef = collection(FIRESTORE, 'markers');
        await addDoc(collectionRef, newMarker);
        console.log('등록에 성공하였습니다.');
        alert('등록되었습니다!');
      }
    } catch (err) {
      console.log('등록실패 err: ', err);
      alert('등록에 실패하였습니다. 다시 시도해주세요.');
    }
    //모달 닫는부분 코드
  };

  // 등록취소 버튼 핸들러
  const handleCancelButton = () => {
    const userConfirmed = window.confirm('작성한 내용이 사라집니다. 창을 닫을까요?');
    if (!userConfirmed) {
      return;
    } else {
      // 사용자가 입력한 정보 초기화
      setFormInput({
        marker: '',
        option: '',
        comment: '',
        image: null
      });

      //모달 닫는 부분 코드
      navigate('/');
    }
  };

  // 수정하기 버튼 핸들러
  // const hadleEditButton = () => {
  //   setIsEditMode(true);
  //   setEditData(data); //상세보기 데이터 가져오기
  //   setFormInput({
  //     marker: data.marker,
  //     option: data.option,
  //     comment: data.comment,
  //     image: data.image
  //   });
  // };

  //수정완료 버튼 이벤트 핸들러

  // const handleCompleteEditButton = () => {
  //   const useConfirm = window.confirm('수정하시겠습니까?');
  //   if (!useConfirm) {
  //     return;
  //   } else {
  //     const updateData = {
  //       // uid 와 location은 수정하지 않으므로 생략
  //       image,
  //       marker,
  //       option,
  //       comment,
  //       timeStamp: new Date() //포멧팅?
  //     };
  //     try {
  //       //파이어스토어 내용 수정 로직
  //       useUpdateQuery({
  //         document: 'marker',
  //         fieldId: '????',
  //         data: updateData
  //       });
  //       // 성공알림.
  //     } catch (err) {
  //       console.log('수정 실패 ==> ', err);
  //       // error 메세지 alert
  //     }
  //   }
  // };

  return (
    <Container>
      <Form>
        <ImgLabel htmlFor="imgInput">
          <figure>
            <LocationImg name="image" src={image} alt="Image Preview" />
            <p>이미지 선택</p>
          </figure>
          <ImgInput type="file" accept="image/*" id="imgInput" onChange={handleFileSelect} />
        </ImgLabel>
        <User>사용자 닉네임</User>
        <LocationName
          name="marker"
          placeholder="장소명을 입력해주세요."
          value={marker}
          onChange={(e) => changeFormState(e)}
        />
        <SelectBox name="option" value={option} onChange={changeFormState}>
          <option value="">선택하기</option>
          <option value="쓰레기통">쓰레기통</option>
          <option value="화장실">화장실</option>
          <option value="의류수거함">의류수거함</option>
          <option value="폐건전지">폐건전지</option>
        </SelectBox>
        <TextArea
          name="comment"
          placeholder="장소에 대한 의견을 남겨주세요!"
          value={comment}
          onChange={(e) => changeFormState(e)}
        />
        <Buttons>
          <AddButton disabled={isButtonDisabled} onClick={handleAddMarkerButton}>
            {isEditMode ? '수정완료' : '등록하기'}
          </AddButton>
          <CancelButton onClick={handleCancelButton}>닫기</CancelButton>
        </Buttons>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background: rgba(137, 137, 137, 0.5);
  backdrop-filter: blur(5px);
  /* margin: 0; */
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 500px;
  background-color: #fff;
  padding: 20px;
  gap: 20px;
`;

const ImgLabel = styled.label`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 250px;
  border: 1px solid lightgray;
  overflow: hidden;
  &:hover {
    cursor: pointer;
  }
`;

const LocationImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImgInput = styled.input`
  display: none;
`;

const User = styled.h3`
  /* position: absolute; */
  margin: 10px auto 0 15px;
  font-size: 12px;
  color: #111;
`;

const LocationName = styled.input`
  width: 90%;
  height: 25px;
  font-size: 12px;
  padding: 5px;
  border: none;
  border-bottom: 1px solid grey;
  outline: none;
`;

// 여유있으면 커스텀 모달 만들어보기
const SelectBox = styled.select`
  width: 91%;
  height: 40px;
  border: none;
  padding: 5px;
  border: none;
  border-bottom: 1px solid grey;
  outline: none;
  color: #111;
  font-size: 12px;
`;

const TextArea = styled.input`
  width: 90%;
  height: 70px;
  font-size: 12px;
  resize: none;
  padding: 5px;
  border: none;
  border-bottom: 1px solid grey;
  outline: none;
  color: #111;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 20px;
`;

const AddButton = styled.button`
  padding: 10px 40px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => (props.disabled ? 'lightgray' : '#FF6000')};
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
`;
const CancelButton = styled.button`
  padding: 10px 40px;
  border: none;
  border-radius: 5px;
  background-color: #ffe6c7;
  &:hover {
    cursor: pointer;
  }
`;
