import React from "react";
import styled from "styled-components";
import ProfileImg from "../components/Profile/ProfileImg";
import PostAndFollow from "../components/User/PostAndFollow";
import Button from "../components/Common/Button";

import { IoChevronDown } from "react-icons/io5";
import { BsThreads } from "react-icons/bs";
import { LuMenu } from "react-icons/lu";
import MbMenu from "../components/Common/MbMenu/MbMenu";
import MbRecommend from "../components/Detail/MbRecommend";

const Wrapper = styled.div`
  margin: 0 auto;
  width: 430px;
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
`;
const IdBtn = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const HeaderBtn = styled.div`
  display: flex;
  gap: 24px;
`;
const Threads = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    font-size: var(--font-22);
  }
`;
const Menu = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
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
        <ProfileImg
          size={"78"}
          url={"/images/userImgs/user123456/feedDetail.jpg"}
        ></ProfileImg>
        <PostAndFollow posting={"73"} follower={"255"} following={"358"} />
      </UserDetail>
      <UserDesc>
        <UserName>bbo</UserName>
        <UserIntro>마라탕 좋아해요</UserIntro>
      </UserDesc>
      <MbRecommend/>
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
        />
      </Buttons>
      <MbMenu />
    </Wrapper>
  );
};

export default MbDetail;
