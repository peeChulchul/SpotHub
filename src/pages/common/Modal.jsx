import { useDispatch, useSelector } from 'react-redux';
import { modalClose } from '../../redux/modules/modalModules';
import Portal from './Portal';
import styled from 'styled-components';
import { useNavigate } from 'react-router';

const ModalContainer = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .modal__contents {
    z-index: 15;
  }
`;
const BackDrop = styled.div`
  position: fixed;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: black;
  z-index: 10;
  opacity: 0.6;
  cursor: pointer;
`;

export const Modal = ({ children }) => {
  const { isOpen } = useSelector((modules) => modules.modalModules);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <BackDrop
        className="modal__dropdown"
        onClick={() => {
          dispatch(modalClose());
          navigate('/');
        }}
      />
      <ModalContainer>
        <div className="modal__contents">{children}</div>
      </ModalContainer>
    </Portal>
  );
};
