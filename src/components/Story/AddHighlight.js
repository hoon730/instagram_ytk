import React from "react";
import styled from "styled-components";
import { HiOutlinePlus } from "react-icons/hi2";

const Wrapper = styled.div`
  width: fit-content;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3px;
`;

const ImgSection = styled.div`
  width: fit-content;
  cursor: pointer;
`;

const ActivationArea = styled.span`
  display: inline-block;
  width: ${({ size }) => `${size || 96}`}px;
  height: ${({ size }) => `${size || 96}`}px;
  background: var(--light-gray-color);
  border-radius: 50%;
  position: relative;
`;

const BoundaryLine = styled.span`
  display: inline-block;
  width: ${({ size }) => `${size - 4 || 91}`}px;
  height: ${({ size }) => `${size - 4 || 91}`}px;
  background: var(--bg-white-color);
  border-radius: 50%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const AddBox = styled.span`
  display: inline-block;
  width: ${({ size }) => `${size - 8 || 86}`}px;
  height: ${({ size }) => `${size - 8 || 86}`}px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
`;

const AddIcon = styled.div`
  width: 100%;
  height: 100%;
  background: var(--gray-color);
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    font-size: 45px;
    color: var(--bg-white-color);
  }
`;

const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3px;
`;

const TextBox = styled.div`
  width: fit-content;
  p {
    font-size: 12px;
  }
`;

const AddHighlight = ({ size }) => {
  return (
    <Wrapper>
      <ImgSection>
        <ActivationArea size={size}>
          <BoundaryLine size={size}>
            <AddBox size={size}>
              <AddIcon>
                <HiOutlinePlus />
              </AddIcon>
            </AddBox>
          </BoundaryLine>
        </ActivationArea>
      </ImgSection>
      <TextArea>
        <TextBox>
          <p>추가</p>
        </TextBox>
      </TextArea>
    </Wrapper>
  );
};

export default AddHighlight;
