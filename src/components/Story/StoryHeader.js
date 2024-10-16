import React from "react";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import ProfileImg from "../Profile/ProfileImg";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";

const Wrapper = styled.div`
  width: ${({ size }) => `${size || 501}`}px;
  height: 102px;
  /* position: absolute;
  z-index: 2; */
`;

const HeaderArea = styled.div`
  border-radius: 10px 10px 0px 0px;
  background: linear-gradient(rgba(50, 50, 50, 0.8), rgba(255, 255, 255, 0));
  padding: 20px 16px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TimeBar = styled.div`
  width: ${({ size }) => `${size || 469}`}px;
  height: 2px;
  background: var(--light-gray-color);
  margin-bottom: 8px;
`;

const TextIconArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const TextBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserName = styled.p`
  font-size: var(--font-16);
  font-weight: var(--font-bold);
  color: var(--bg-white-color);
`;

const TimeBox = styled.span`
  font-size: var(--font-14);
  color: var(--gray-color);
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    color: var(--bg-white-color);

    &:nth-child(3) {
      font-size: var(--font-24);
    }
    &:nth-child(4) {
      font-size: var(--font-30);
    }
  }
`;

const ViewerArea = styled.div``;

const DmArea = styled.div``;

const StoryHeader = () => {
  return (
    <Wrapper>
      <HeaderArea>
        <TimeBar></TimeBar>
        <TextIconArea>
          <TextBox>
            <ProfileImg size={32} url={"/images/postImgs/user1/profile.jpg"} />
            <UserName>username or storytitle</UserName>
            <TimeBox>올린지 지난 시간</TimeBox>
          </TextBox>
          <IconBox>
            <FaPlay />
            <FaPause />
            <FiMoreHorizontal />
            <IoClose />
          </IconBox>
        </TextIconArea>
      </HeaderArea>
    </Wrapper>
  );
};

export default StoryHeader;
