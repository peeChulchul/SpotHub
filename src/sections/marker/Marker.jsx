import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { STORAGE } from 'myFirebase';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSetQuery } from 'hooks/useQueryHook';
import shortid from 'shortid';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { modalClose } from '../../redux/modules/modalModules';
import swal from 'sweetalert';

export default function Marker() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { lat, lng } = useOutletContext();
  const { uid, avatar, nickname } = useSelector((state) => state.currentUserModules.currentUser);
  const queryClient = useSetQuery({ document: 'markers' });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [formInput, setFormInput] = useState({
    locationName: '',
    option: '',
    comment: '',
    image: null
  });
  const { locationName, option, comment, image } = formInput;
  const [selectedImg, setSelectedImg] = useState(null);
  const [selectedFile, SetSelectedFile] = useState(null);

  useEffect(() => {
    if (!locationName || !option || !comment) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [locationName, option, comment]);

  const changeFormState = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({ ...prev, [name]: value }));
  };


  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    SetSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      const readerResult = reader.result; 
      setSelectedImg(readerResult);
    };
    const result = reader.readAsDataURL(file);
  };

  const fileUpload = async () => {
    if (!selectedFile) {
      return;
    } else {
      try {
        const imageRef = ref(STORAGE, `location/${selectedFile.name}`);
        const uploadImage = await uploadBytes(imageRef, selectedFile);


        const downloadURL = await getDownloadURL(uploadImage.ref);
        return downloadURL;
      } catch (err) {
        console.log('파일 업로드실패', err);
      }
    }
  };

  const handleAddMarkerButton = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      const userConfirm = window.confirm('선택된 이미지가 없습니다. 이대로 등록할까요?');
      if (!userConfirm) {
        return;
      }
    }
    try {
      const downloadImage = await fileUpload();
      const newMarker = {
        uid,
        avatar,
        nickname,
        lat,
        lng,
        id: shortid.generate(),
        image: downloadImage || '',
        locationName,
        option,
        comment,
        timeStamp: new Date().getTime()
      };
      queryClient.mutate({ fieldId: newMarker.id, data: newMarker });
      swal('등록완료!', '새로운 장소가 등록되었습니다.', 'success');
      setFormInput({
        locationName: '',
        option: '',
        comment: '',
        image: null
      });
    } catch (err) {
      console.log('등록실패 err: ', err);
      swal('등록이 완료되지 않았습니다.!', '다시 시도해주세요.', 'error');
    }
    dispatch(modalClose());
    navigate('/');
  };

  const handleCancelButton = async () => {
    const result = await swal({
      title: '작성한 내용이 사라집니다. 창을 닫을까요?',
      icon: 'warning',
      buttons: ['취소', '확인'],
      dangerMode: true
    });

    if (result) {
      setFormInput({
        locationName: '',
        option: '',
        comment: '',
        image: null
      });

      dispatch(modalClose());
      navigate('/');
    }
  };

  return (
    <Form>
      <ImgLabel htmlFor="imgInput">
        <figure>
          <LocationImg src={selectedImg} />
          <p>{image || '이미지 선택'}</p>
        </figure>
        <ImgInput name="image" type="file" id="imgInput" onChange={handleFileSelect} />
      </ImgLabel>
      <User>{nickname}</User>
      <LocationName
        name="locationName"
        placeholder="장소명을 입력해주세요. (최대 30자)"
        value={locationName}
        onChange={changeFormState}
        maxLength={30}
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
        placeholder="장소에 대해 설명해주세요.(최대 150자)"
        value={comment}
        onChange={changeFormState}
        maxLength={150}
      />
      <Buttons>
        <AddButton disabled={isButtonDisabled} onClick={handleAddMarkerButton}>
          등록하기
        </AddButton>
        <CancelButton onClick={handleCancelButton}>닫기</CancelButton>
      </Buttons>
    </Form>
  );
}

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
  margin: 10px auto 0 20px;
  font-size: 12px;
  font-weight: 700;
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

const TextArea = styled.textarea`
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
