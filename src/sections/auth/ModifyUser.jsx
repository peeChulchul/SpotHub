import { updateProfile } from 'firebase/auth';
import { AUTH, STORAGE } from 'myFirebase';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modalClose } from '../../redux/modules/modalModules';
import styled from 'styled-components';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useSelectQuery, useSelectQueryReference, useUpdateQuery, useUpdateQueryReference } from 'hooks/useQueryHook';
import { currentUserFullfild } from '../../redux/modules/currentUserModules';
import swal from 'sweetalert';

const Container = styled.div`
  width: 300px;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 20px 0px;
  gap: 20px;
  align-items: center;
  .btnBox {
    display: flex;
    gap: 16px;
  }
`;

const Avatar = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 100%;
  cursor: pointer;
  background-image: ${({ $avatar }) =>
    $avatar
      ? `url(${$avatar})`
      : `url('https://i.namu.wiki/i/Bge3xnYd4kRe_IKbm2uqxlhQJij2SngwNssjpjaOyOqoRhQlNwLrR2ZiK-JWJ2b99RGcSxDaZ2UCI7fiv4IDDQ.webp')`};
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
`;

const Modifybox = styled.div`
  gap: 16px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const PropertyWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: calc(var(--spacing) * 2);
  padding: calc(var(--spacing) * 2) calc(var(--spacing) * 4);
  font-size: var(--font-md);
  color: var(--color-black);
  border-radius: 8px;
  font-weight: 600;
  background-color: var(--color-dark-pink);
  cursor: pointer;
  filter: brightness(1.05);
  path {
    fill: var(--color-black);
  }
  &:hover {
    color: var(--color-primary-alt);
    filter: brightness(1.1);
  }
  &:hover path {
    fill: var(--color-primary-alt);
  }
  #fileUpload {
    display: none;
  }
`;

const PreviewImg = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 100%;
  cursor: pointer;
`;

export default function ModifyUser() {
  const { currentUser } = useSelector((modules) => modules.currentUserModules);
  const [newNickName, setNewNickName] = useState();
  const [currentAvatar, setCurrentAvater] = useState();
  const [privewImg, setPrivewImg] = useState();
  const [selectedFile, SetSelectedFile] = useState(null);
  const dispatch = useDispatch();
  const fileUploadRef = useRef();
  const { data: comments, isLoading } = useSelectQueryReference({
    document: 'comment',
    fieldId: 'uid',
    condition: currentUser.uid
  });
  const { mutate: updateComment } = useUpdateQueryReference({ document: 'comment' });

  console.log(comments);

  useEffect(() => {
    setNewNickName(currentUser.nickname);
    setCurrentAvater(currentUser.avatar);
  }, [currentUser]);

  const fileUpload = async () => {
    if (!selectedFile) {
      return;
    } else {
      try {
        const imageRef = ref(STORAGE, `${AUTH.currentUser.uid}/${selectedFile.name}`);
        const uploadSnapshot = await uploadBytes(imageRef, selectedFile);

        //저장된 이미지 URL 받아오기
        const downloadURL = await getDownloadURL(uploadSnapshot.ref);
        console.log('Storage 저장 완료! downloadURL: ', downloadURL);
        return downloadURL;
      } catch (err) {
        console.log('파일 업로드실패', err);
      }
    }
  };

  function onClickFileUpload() {
    fileUploadRef.current.click();
  }

  function onChangeFile(file) {
    if (!file) {
      return alert('파일을 첨부해주세요');
    }
    const fileExtension = ['png', 'jpg', 'jpeg', 'webp'];
    const extension = file.name.split('.').pop()?.toLowerCase();

    if (fileExtension.includes(extension)) {
      SetSelectedFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onload = () => {
          setPrivewImg(reader.result);
          resolve();
        };
      });
    } else {
      swal('파일 업로드 실패', 'png, jpg, jpeg, webp 형식만 지원합니다.', 'error')
    }
  }

  function onChangeNickname(e) {
    setNewNickName(e.target.value);
  }

  console.log(currentUser);
  async function onClickSave() {
    const downloadImage = await fileUpload();

    console.log(downloadImage);
    updateComment({
      ref: comments,
      data: { avatar: downloadImage ? downloadImage : currentAvatar, nickname: newNickName }
    });
    await updateProfile(AUTH.currentUser, {
      displayName: newNickName,
      photoURL: downloadImage ? downloadImage : currentAvatar
    });
    dispatch(
      currentUserFullfild({
        ...currentUser,
        avatar: downloadImage ? downloadImage : currentAvatar,
        nickname: newNickName
      })
    );
    setPrivewImg(null);
    SetSelectedFile(null);
  }

  return (
    <Container>
      {privewImg ? <Avatar $avatar={privewImg} /> : <Avatar $avatar={currentAvatar} />}

      <Modifybox>
        <PropertyWrapper onClick={onClickFileUpload}>
          <input
            type="file"
            onChange={(e) => {
              onChangeFile(e.target.files[0]);
            }}
            ref={fileUploadRef}
            id="fileUpload"
          />
          아바타 수정
        </PropertyWrapper>

        <input onChange={onChangeNickname} value={newNickName}></input>
        <PropertyWrapper onClick={onClickSave}>변경사항 저장</PropertyWrapper>
      </Modifybox>
    </Container>
  );
}
