import { useDispatch, useSelector } from 'react-redux';
import { modalClose } from '../../redux/modules/modalModules';
import Portal from './Portal';
import styled from 'styled-components';

const ModalContainer = styled.div`
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .modal__dropdown {
  }
  .modal__container {
    z-index: 100%;
  }
`;
const BackDrop = styled.div`
  position: fixed;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: black;
  z-index: 100;
  opacity: 0.6;
`;

export const Modal = () => {
  const { isOpen, children } = useSelector((modules) => modules.modalModules);
  const dispatch = useDispatch();
  console.log(isOpen);
  if (!isOpen) {
    return null;
  }

  //   const onCancelInternal = () => {
  //     onCancel?.();
  //     closeModal();
  //   };

  //   const onSubmitInternal = () => {
  //     onSubmit?.();
  //     closeModal();
  //   };

  return (
    <Portal>
      <BackDrop
        className="modal__dropdown"
        onClick={() => {
          dispatch(modalClose());
        }}
      />
      <ModalContainer>
        <div className="modal__contents">
          <div>{children}</div>

          <div className="modal__actions">
            {/* <button onClick={onCancelInternal}>cancel</button>
            <button onClick={onSubmitInternal}>submit</button> */}
          </div>
        </div>
      </ModalContainer>
    </Portal>
  );
};
