import React from "react";
import styled from "styled-components";
import { LuCamera } from "react-icons/lu";

const PicBox = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
`;

const Pic = styled.img`
  width: 100px;
  height: 100px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 50%;
  background: #eee;
`;

const ChangePic = styled.div`
  width: 30px;
  height: 30px;
  background: ${({ theme }) => theme.buttonHoverColor};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  position: absolute;
  bottom: 0;
  right: 0;

  svg {
    font-size: var(--font-18);
  }
`;

const EditPicBox = () => {
  return (
    <PicBox>
      <Pic />
      <ChangePic>
        <LuCamera />
      </ChangePic>
    </PicBox>
  );
};

export default EditPicBox;
