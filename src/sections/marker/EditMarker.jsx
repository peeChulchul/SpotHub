import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { STORAGE } from 'myFirebase';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQueryHook, useSetQuery, useUpdateQuery, useSelectQuery } from 'hooks/useQueryHook';
import { addDoc, collection } from 'firebase/firestore';
import shortid from 'shortid';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { modalClose } from '../../redux/modules/modalModules';
import swal from 'sweetalert';

export default function Marker() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { markerId } = useParams();
  const { nickname } = useSelector((state) => state.currentUserModules.currentUser);

  const { data: selectedMarker } = useSelectQuery({ document: 'markers', fieldId: 'id', condition: markerId });
  const updateQuery = useUpdateQuery({ document: 'markers' });
  const [formInput, setFormInput] = useState({
    locationName: '',
    option: '',
    comment: '',
    image: ''
  });
  const { locationName, option, comment, image } = formInput;
  const [selectedImg, setSelectedImg] = useState('');
  const [selectedFile, SetSelectedFile] = useState('');
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    if (selectedMarker) {
      setFormInput({
        locationName: selectedMarker[0].locationName,
        option: selectedMarker[0].option,
        comment: selectedMarker[0].comment
      });
      setSelectedImg(selectedMarker[0].image);
    }
  }, [selectedMarker]);

  const changeFormState = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    SetSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const readerResult = reader.result;
        setSelectedImg(readerResult);
      };
      const result = reader.readAsDataURL(file);
    }
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
        console.log('수정 실패 ==> ', err);
      }
    }
  };

  const handleCancelButton = () => {
    const userConfirmed = window.confirm('작성한 내용이 사라집니다. 창을 닫을까요?');
    if (!userConfirmed) {
      return;
    } else {
      setFormInput({
        locationName: '',
        option: '',
        comment: '',
        image: null
      });
    }
    dispatch(modalClose());
    navigate('/');
  };

  const handleCompleteModify = async () => {
    const userConfirm = await swal({
      title: '수정하시겠습니까?',
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '확인',
      cancelButtonText: '취소'
    });
    if (!userConfirm) return;
    const downloadImage = await fileUpload();
    const updateData = {
      image: downloadImage || '',
      locationName,
      option,
      comment,
      timeStamp: new Date().getTime()
    };
    try {
      updateQuery.mutate({
        document: 'markers',
        fieldId: markerId,
        data: updateData
      });
      swal('수정완료!', '정보가 업데이트 되었습니다.', 'success');
      setEditData(null);
    } catch (err) {
      console.log('수정 실패 ==> ', err);
      swal('업데이트 실패', '다시 시도해주세요.', 'error');
    }
    dispatch(modalClose());
    navigate('/');
  };

  return (
    <>
      <Form>
        <ImgLabel htmlFor="imgInput">
          <figure>
            <LocationImg src={selectedImg} />
            <p>{selectedImg ? '' : '이미지 선택'}</p>
          </figure>
          <ImgInput name="image" type="file" accept="image/*" id="imgInput" onChange={handleFileSelect} />
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
          <CompletEditButton onClick={handleCompleteModify}>수정완료</CompletEditButton>
          <CancelButton onClick={handleCancelButton}>취소</CancelButton>
        </Buttons>
      </Form>
    </>
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

const CompletEditButton = styled.button`
  padding: 10px 40px;
  border: none;
  border-radius: 5px;
  background-color: #ff6000;
  &:hover {
    cursor: pointer;
  }
`;

//?
const CancelButton = styled.button`
  padding: 10px 40px;
  border: none;
  border-radius: 5px;
  background-color: #ffe6c7;
  &:hover {
    cursor: pointer;
  }
  //
`;

// const DeleteButton = styled.p`
//   padding: 10px 40px;
//   border: ${(props) => (props.$isModifyMode ? 'none' : '1px solid #111')};
//   border-radius: 5px;
//   background-color: ${(props) => (props.$isModifyMode ? '#FF6000' : 'transparent')};
//   cursor: pointer;
// `;
