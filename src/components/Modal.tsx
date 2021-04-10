import React, { useEffect } from "react";
import styled from "styled-components";

const Background = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.6);
  inset: 0px;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  overflow: auto;
  z-index: 2;
  box-sizing: border-box;
  text-align: center;
  vertical-align: middle;
`;

const Scroller = styled.div`
  position: relative;
  z-index: 3;
  outline: none;
  max-width: 90%;
  width: 30rem;
  margin: 20px auto;
  vertical-align: middle;
  display: inline-block;
  height: max-content;
`;

const Content = styled.div`
  background: white;
  width: 100%;
  padding: 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
`;

interface Props {
  children: any;
  closeModal: () => void;
}

const Modal: React.FC<Props> = ({ children, closeModal }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  return (
    <Background onClick={closeModal}>
      <Scroller>
        <Content onClick={(e) => e.stopPropagation()}>{children}</Content>
      </Scroller>
    </Background>
  );
};

export default Modal;
