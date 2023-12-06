import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { AUTH, STORAGE } from 'myFirebase';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function Marker() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [formInput, setFormInput] = useState({
    location: '',
    option: '',
    comment: '',
    image: null
  });
  const { location, option, comment, image } = formInput;

  //1. 이미지 선택
  //2. 이미지 업로드 storage
  //3. 업로드 이미지 URL 가져오기
  // 4. URL과 함께 마커 정보 저장하기. firestore

  //파일 업로드하기
  const FileUpload = async () => {
    // ${AUTH.currentUser.uid}는=: 현재 사용자의 UID, selectedFile.name: 사용자가 선택한 파일의 이름
    // const imageRef = ref(STORAGE, `${AUTH.currentUser.uid}/${selectedFile.name}`);
    // await uploadBytes(imageRef, selectedFile);

    //인증되지 않은 사용자로 테스트
    const imageRef = ref(STORAGE, `non_authenticated_users/${selectedFile.name}`);
    await uploadBytes(imageRef, selectedFile);

    // 파일 URL 가져오기 firebase getDownloadURL 메서드
    const downloadURL = await getDownloadURL(imageRef);
    console.log('업로드 완료!', downloadURL);
  };

  //마커 등록하기
  const handleAddMarkerButton = () => {
    if (selectedFile) {
      FileUpload();
    } else {
      console.error('파일을 선택해주세요.');
    }
  };

  // 등록취소
  const handleCancelButton = () => {
    // 사용자가 입력한 정보 초기화
    setFormInput({
      location: '',
      option: '',
      comment: '',
      image: null
    });

    // 선택된 파일 초기화
    setSelectedFile(null);
  };

  // Input 이벤트 핸들러
  const changeFormInput = (field, value) => {
    setFormInput((prevFormInput) => ({
      ...prevFormInput,
      [field]: value
    }));
  };

  // 업로드 이미지 선택
  const handleFileSelect = (event) => {
    const file = event.target.files;

    if (file && file.length > 0) {
      const selectedOne = file[0];

      //setSelectedFile + 이미지 프리뷰
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedFile(e.target.result);
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
          value={location}
          onChange={(e) => changeFormInput('location', e.target.value)}
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
          {/* 얘도 이벤트 핸들러 하나만 쓰자 */}
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
  width: 94%;
  height: 40px;
  border: none;
  padding: 5px;
  border: none;
  border-bottom: 1px solid grey;
  outline: none;
  color: grey;
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
  color: #aba9a9;
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
