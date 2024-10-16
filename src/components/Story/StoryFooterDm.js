import React from "react";
import styled from "styled-components";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FiSend } from "react-icons/fi";

const Wrapper = styled.div`
  width: ${({ size }) => `${size || 501}`}px;
  bottom: 28px;
  position: absolute;
  /* z-index: 2; */
`;

const FooterArea = styled.div`
  border-radius: 0px 0px 10px 10px;
  background: linear-gradient(rgba(255, 255, 255, 0), rgba(50, 50, 50, 0.8));
  padding: 20px 0;
  background-position: center 160px;
`;

const TextIconArea = styled.div``;

const DmArea = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0px 10px;
`;

const DmTextBox = styled.div`
  width: ${({ size }) => `${size || 400}`}px;
  height: 44px;
  border: 2px solid var(--bg-white-color);
  border-radius: 50px;
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    color: var(--bg-white-color);
    font-size: var(--font-24);
  }
`;

const StoryFooterDm = () => {
  return (
    <Wrapper>
      <FooterArea>
        <TextIconArea>
          <DmArea>
            <DmTextBox></DmTextBox>
            <IconBox>
              <FaRegHeart />
              {/* <FaHeart /> */}
              <FiSend />
            </IconBox>
          </DmArea>
        </TextIconArea>
      </FooterArea>
    </Wrapper>
  );
};

export default StoryFooterDm;
