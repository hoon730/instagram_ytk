import React from "react";
import styled from "styled-components";
import { HiOutlinePlus } from "react-icons/hi2";

const Wrapper = styled.div`
  /* width: fit-content; */
  width: 100%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const ImgSection = styled.div`
  width: fit-content;
  cursor: pointer;
`;

const GrayLine = styled.span`
  display: inline-block;
  width: 80px;
  height: 80px;
  background: var(--light-gray-color);
  border-radius: 50%;
  position: relative;

  @media screen and (max-width: 1000px) {
    width: 68px;
    height: 68px;
  }
`;

const WhiteLine = styled.span`
  display: inline-block;
  width: 74px;
  height: 74px;
  background: var(--bg-white-color);
  border-radius: 50%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media screen and (max-width: 1000px) {
    width: 65px;
    height: 65px;
  }
`;

const AddBox = styled.span`
  display: inline-block;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;

  @media screen and (max-width: 1000px) {
    width: 60px;
    height: 60px;
  }
`;

const AddIcon = styled.div`
  width: 100%;
  height: 100%;
  background: var(--gray-color);
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    font-size: var(--font-46);
    color: var(--bg-white-color);
  }

  @media screen and (max-width: 1000px) {
    svg {
      font-size: var(--font-46);
    }
  }
`;

const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TextBox = styled.div`
  width: fit-content;
  p {
    font-size: 12px;
  }
`;

const AddHighlight = () => {
  return (
    <Wrapper>
      <ImgSection>
        <GrayLine>
          <WhiteLine>
            <AddBox>
              <AddIcon>
                <HiOutlinePlus />
              </AddIcon>
            </AddBox>
          </WhiteLine>
        </GrayLine>
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
