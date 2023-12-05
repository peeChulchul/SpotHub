import React from 'react';
import styled from 'styled-components';

export default function Pin() {
  return (
    <Container>
      <Form>
        <ImgContainer>
          {/* <LocationImg src={} alt="선택된 이미지" /> */}
          {/* 아무데나 눌러도 업로드 가능하게 띄우려면? */}
          <ImgLabel htmlFor="imgInput">이미지 선택</ImgLabel>
          <ImgInput type="file" accept="image" id="imgInput" />
        </ImgContainer>
        <User>사용자 닉네임</User>
        <LocationName placeholder="장소명을 입력해주세요."></LocationName>
        <SelectBox>
          <option name="" id="">
            선택하기
          </option>
          <option name="" id="">
            쓰레기통
          </option>
          <option name="" id="">
            화장실
          </option>
          <option name="" id="">
            의류수거함
          </option>
          <option name="" id="">
            폐건전지
          </option>
        </SelectBox>
        <TextArea placeholder="장소에 대한 의견을 남겨주세요!"></TextArea>
        <Buttons>
          <Button>등록</Button>
          <Button>취소</Button>
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

const ImgContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 250px;
  border-radius: 5px;
  background-color: rebeccapurple;
`;

const LocationImg = styled.img`
  width: 100%;
  height: 100%;
`;

const ImgLabel = styled.label`
  position: absolute;
  color: white;
`;

const ImgInput = styled.input`
  display: none;
`;

const User = styled.h3`
  /* position: absolute; */
  margin: 10px auto 0 5px;
  font-size: 12px;
  color: #111;
`;

const LocationName = styled.input`
  width: 95%;
  height: 25px;
  font-size: 14px;
  padding: 10px;
  border: 1px solid #111;
  outline: none;
`;

// 여유있으면 커스텀 모달 만들어보기
const SelectBox = styled.select`
  width: 100%;
  height: 40px;
  border: none;
  padding: 10px;
  border: 1px solid #111;
  color: grey;
  font-size: 14px;
`;

const TextArea = styled.textarea`
  width: 95%;
  height: 70px;
  font-size: 14px;
  resize: none;
  padding: 10px;
  border: 1px solid #111;
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
  background-color: #111;
  color: #fff;
`;
