import React, { useState } from "react";
import styled from "styled-components";
import ProfileImg from "../components/Profile/ProfileImg";
import PostAndFollow from "../components/User/PostAndFollow";
import Button from "../components/Common/Button";
import MbMenu from "../components/Common/MbMenu/MbMenu";
import MbRecommend from "../components/Detail/MbRecommend";

import { IoChevronDown } from "react-icons/io5";
import { BsThreads } from "react-icons/bs";
import { LuMenu } from "react-icons/lu";
import { GoPlus } from "react-icons/go";

const Wrapper = styled.div`
  margin: 0 auto;
  width: 430px;
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.fontColor};
`;
const Header = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  justify-content: space-between;
`;
const IdBox = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
const Id = styled.span`
  font-size: var(--font-20);
  font-weight: var(--font-bold);
  cursor: pointer;
`;
const IdBtn = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const HeaderBtn = styled.div`
  display: flex;
  gap: 24px;
`;
const Threads = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    font-size: var(--font-22);
  }
`;
const Menu = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    font-size: var(--font-24);
  }
`;

const ProfileBg = styled.img`
  width: 430px;
  height: 150px;
`;

const UserDetail = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 0 16px;
`;

const UserImg = styled.div`
  position: relative;
  z-index: 0;
`;

const ImgEditBtn = styled.label`
  position: absolute;
  bottom: 3px;
  right: 3px;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: ${({ theme }) => theme.subColor};

  svg {
    color: var(--bg-white-color);
  }
`;

const ImgEditInput = styled.input`
  display: none;
`;

const UserDesc = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 16px;
`;
const UserName = styled.span`
  font-size: var(--font-16);
  font-weight: var(--font-medium);
`;
const UserIntro = styled.p`
  font-size: var(--font-14);
`;

const Buttons = styled.div`
  padding: 16px;
  display: flex;
  justify-content: space-between;
`;

const MbDetail = () => {
  const [isRecommend, setIsRecommend] = useState(false);

  return (
    <Wrapper>
      <Header>
        <IdBox>
          <Id>bbbok</Id>
          <IdBtn>
            <IoChevronDown />
          </IdBtn>
        </IdBox>
        <HeaderBtn>
          <Threads>
            <BsThreads />
          </Threads>
          <Menu>
            <LuMenu />
          </Menu>
        </HeaderBtn>
      </Header>
      <ProfileBg src="/images/mb_profile_bg.jpg" />
      <UserDetail>
        <UserImg>
          <ProfileImg
            size={"78"}
            url={"/images/userImgs/user123456/feedDetail.jpg"}
            hover={true}
          />
          <ImgEditBtn htmlFor="file">
            <GoPlus />
          </ImgEditBtn>
          <ImgEditInput type="file" id="file" accept="video/*, image/*" />
        </UserImg>
        <PostAndFollow posting={"73"} follower={"255"} following={"358"} />
      </UserDetail>
      <UserDesc>
        <UserName>bbo</UserName>
        <UserIntro>마라탕 좋아해요</UserIntro>
      </UserDesc>
      <Buttons>
        <Button
          type={"negative"}
          text={"프로필 편집"}
          width={"42%"}
          height={"40px"}
          fontSize={"14"}
        />
        <Button
          type={"negative"}
          text={"프로필 공유"}
          width={"42%"}
          height={"40px"}
          fontSize={"14"}
        />
        <Button
          type={"negative"}
          width={"10%"}
          followed={"unfollowed"}
          height={"40px"}
          onClick={() => setIsRecommend((current) => !current)}
        />
      </Buttons>
      {isRecommend ? <MbRecommend /> : null}
      <MbMenu />
    </Wrapper>
  );
};

export default MbDetail;
