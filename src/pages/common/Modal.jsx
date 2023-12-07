import { useDispatch, useSelector } from 'react-redux';
import { modalclose } from 'redux/modules/modalModules';
import Portal from './Portal';
import styled from 'styled-components';

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
`;

export const Modal = () => {
  const { isOpen, children } = useSelector((modules) => modules.modalModules);
  const dispatch = useDispatch();
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
      <ModalContainer>
        <div
          className="modal__dropdown"
          onClick={() => {
            dispatch(modalclose());
          }}
        />

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
