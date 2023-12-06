import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { AUTH, FIRESTORE, STORAGE } from 'myFirebase';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQueryHook } from 'hooks/useQueryHook';
import { addDoc, collection } from 'firebase/firestore';
import DefaultImg from './default.jpg';

export default function Marker() {

  const { isLoading, isError, data: user } = useQueryHook({ document: 'user' });
  const [selectedFile, setSelectedFile] = useState(null);
  const [formInput, setFormInput] = useState({
    marker: '',
    option: '',
    comment: '',
    imageUrl: ''
  });
  const { marker, option, comment, imageUrl} = formInput;

  //  위치정보 가져오기  나중에 user -> location / 두개 쓰는 경우 비구조화 할당한 애들 이름 같으면 안됨.
  const [location, setLocation] = useState('');
  const locationId = location;
  const locationImagePath = `locationImg/${locationId}`; // 나중에 currentUser정보도?

  //파일 업로드하기
  const FileUpload = async () => {
    if (!selectedFile) {
      return;
    } else {
      try {
        // const imageRef = ref(STORAGE, `${AUTH.currentUser.uid}/${selectedFile.name}`);
        const imageRef = ref(STORAGE, `${locationImagePath}/${selectedFile.name}`);
        await uploadBytes(imageRef, selectedFile);
        const downloadURL = await getDownloadURL(imageRef);

        setFormInput((prev) => ({
          ...prev,
          [imageUrl]: downloadURL
        }))
        console.log('downloadURL: ', downloadURL);
      } catch (err) {
        console.log('파일 업로드실패', err)
      }
    }
  };

  //마커 등록하기
  const handleAddMarkerButton = async (e) => {
    e.preventDefault();
    // 등록버튼 클릭시 처리될 내용:
    //currentUserId, 위치정보, 이미지, 옵션, 장소, 코멘트
    try {
      FileUpload();
      const newMarker = {
        imageUrl,
        marker,
        option,
        comment
        // uid: AUTH 로 유저정보 가져오기
        // location
      };
      const collectionRef = collection(FIRESTORE, 'markers');
      await addDoc(collectionRef, newMarker);
      console.log('등록에 성공하였습니다.');


    } catch (err) {
      console.log('등록실패 err: ', err);
      alert('등록에 실패하였습니다. 다시 시도해주세요.');
    }
  };

  // 등록취소 버튼 핸들러
  const handleCancelButton = () => {
    // 사용자가 입력한 정보 초기화
    setFormInput({
      marker: '',
      option: '',
      comment: '',
      imageUrl: ''
    });
    // 선택된 파일 초기화
    setSelectedFile(null);
  };

  // Input 이벤트 핸들러
  const changeFormInput = (field, value) => {
    setFormInput((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  // 업로드 이미지 선택
  const handleFileSelect = (event) => {
    const file = event.target.files;
    // 파일이 선택되었는지 확인
    if (file && file.length > 0) {
      const selectedOne = file[0];

      //setSelectedFile + 이미지 프리뷰
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedFile(selectedOne);
        changeFormInput('image', e.target.result);
      };

      reader.readAsDataURL(selectedOne);
    }
  };

  // useEffect(() => {
  //   console.log('selectedFile이 업데이트!:', selectedFile);
  // }, [selectedFile]);
  return (
    <Container>
      <Form>
        <ImgLabel onClick={handleFileSelect} htmlFor="imgInput">
          <figure>
            <LocationImg src={selectedFile} alt="Image Preview" />
            <p>이미지 선택</p>
          </figure>
          <ImgInput type="file" accept="image/*" id="imgInput" onChange={handleFileSelect} />
        </ImgLabel>
        <User>사용자 닉네임</User>
        <LocationName
          placeholder="장소명을 입력해주세요."
          value={marker}
          onChange={(e) => changeFormInput('marker', e.target.value)}
        />
        <SelectBox value={option} onChange={(e) => changeFormInput('option', e.target.value)}>
          <option value="">선택하기</option>
          <option value="쓰레기통">쓰레기통</option>
          <option value="화장실">화장실</option>
          <option value="의류수거함">의류수거함</option>
          <option value="폐건전지">폐건전지</option>
        </SelectBox>
        <TextArea
          placeholder="장소에 대한 의견을 남겨주세요!"
          value={comment}
          onChange={(e) => changeFormInput('comment', e.target.value)}
        />
        <Buttons>
          <Button onClick={handleAddMarkerButton}>등록</Button>
          <Button onClick={handleCancelButton}>취소</Button>
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
  color: #111
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 20px;
`;

const Button = styled.button`
  padding: 10px 40px;
  border: none;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
`;
