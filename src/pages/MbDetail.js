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
import MyPostItem from "../components/MyFeed/MyPostItem";
import TabBarBtn from "../components/Common/TabBarBtn";
import { BsGrid3X3Gap } from "react-icons/bs";
import { BiMoviePlay } from "react-icons/bi";
import { TbUserSquare } from "react-icons/tb";
import { px } from "framer-motion";

const Wrapper = styled.div`
  display: none;
  width: 430px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.fontColor};
  @media screen and (max-width: 630px) {
    display: block;
  }
  @media screen and (max-width: 430px) {
    width: 100%;
  }
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
  height: 160px;
  margin-top: 50px;
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
  padding: 16px 16px 0px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ActiveBorderArea = styled.div`
  width: 100%;
  height: 2px;
`;

const ActiveBorder = styled.div`
  width: 33%;
  height: 100%;
  background: var(--font-black-color);
  transition: transform 0.3s;
  ${({ $isOn }) => `transform: translateX(${$isOn}%);`}
`;

const MbTabBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

const tabWidth = 143;

const MbPostContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const MbPostBox = styled.div`
  width: 430px;
  display: flex;
  gap: 5px;
`;

const MbDetail = () => {
  const [isRecommend, setIsRecommend] = useState(false);

  const [posts, setPosts] = useState(true);
  const [reels, setReels] = useState(false);
  const [tagged, setTagged] = useState(false);
  const [isOn, setIsOn] = useState(0);

  const postsActive = () => {
    setPosts(true);
    setReels(false);
    setTagged(false);
    setIsOn(0);
  };
  const reelsActive = () => {
    setPosts(false);
    setReels(true);
    setTagged(false);
    setIsOn(100);
  };
  const taggedActive = () => {
    setPosts(false);
    setReels(false);
    setTagged(true);
    setIsOn(200);
  };

  return (
    <Wrapper>
      <Header>
        <IdBox>
          <Id>bb_bok</Id>
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
      <ProfileBg src="/images/postImgs/user1/bg.jpg" />
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
        <PostAndFollow posting={"18"} follower={"777"} following={"333"} />
      </UserDetail>
      <UserDesc>
        <UserName>복</UserName>
        <UserIntro>⋆｡˚ ☁︎ ˚｡⋆｡</UserIntro>
      </UserDesc>
      <Buttons>
        <Button
          width={"42%"}
          height={"40px"}
          fontSize={"14"}
          type={"negative"}
          text={"프로필 편집"}
        />
        <Button
          width={"42%"}
          height={"40px"}
          fontSize={"14"}
          type={"negative"}
          text={"프로필 공유"}
        />
        <Button
          width={"10%"}
          height={"40px"}
          type={"negative"}
          followed={"unfollowed"}
          onClick={() => setIsRecommend((current) => !current)}
        />
      </Buttons>
      {isRecommend ? <MbRecommend /> : null}
      <ActiveBorderArea>
        <ActiveBorder $isOn={isOn} />
      </ActiveBorderArea>
      <MbTabBox>
        <TabBarBtn
          onClick={postsActive}
          width={tabWidth}
          iconCode={<BsGrid3X3Gap />}
          isActive={posts}
        />
        <TabBarBtn
          onClick={reelsActive}
          width={tabWidth}
          iconCode={<BiMoviePlay />}
          isActive={reels}
        />
        <TabBarBtn
          onClick={taggedActive}
          width={tabWidth}
          iconCode={<TbUserSquare />}
          isActive={tagged}
        />
      </MbTabBox>
      <MbPostContainer>
        <MbPostBox>
          <MyPostItem size={140} url={"/images/postImgs/user1/post1.jpg"} />
          <MyPostItem size={140} url={"/images/postImgs/user1/post2.jpg"} />
          <MyPostItem size={140} url={"/images/postImgs/user1/post3.jpg"} />
        </MbPostBox>
        <MbPostBox>
          <MyPostItem size={140} url={"/images/postImgs/user1/post4.jpg"} />
          <MyPostItem size={140} url={"/images/postImgs/user1/post5.jpg"} />
          <MyPostItem size={140} url={"/images/postImgs/user1/post6.jpg"} />
        </MbPostBox>
        <MbPostBox>
          <MyPostItem size={140} url={"/images/postImgs/user1/post7.jpg"} />
          <MyPostItem size={140} url={"/images/postImgs/user1/post8.jpg"} />
          <MyPostItem size={140} url={"/images/postImgs/user1/post9.jpg"} />
        </MbPostBox>
        <MbPostBox>
          <MyPostItem size={140} url={"/images/postImgs/user1/post10.jpg"} />
          <MyPostItem size={140} url={"/images/postImgs/user1/post11.jpg"} />
          <MyPostItem size={140} url={"/images/postImgs/user1/post12.jpg"} />
        </MbPostBox>
        <MbPostBox>
          <MyPostItem size={140} url={"/images/postImgs/user1/post13.jpg"} />
          <MyPostItem size={140} url={"/images/postImgs/user1/post14.jpg"} />
          <MyPostItem size={140} url={"/images/postImgs/user1/post15.jpg"} />
        </MbPostBox>
        <MbPostBox>
          <MyPostItem size={140} url={"/images/postImgs/user1/post16.jpg"} />
          <MyPostItem size={140} url={"/images/postImgs/user1/post18.jpg"} />
          <MyPostItem size={140} url={"/images/postImgs/user1/post19.jpg"} />
        </MbPostBox>
      </MbPostContainer>
      <MbMenu />
    </Wrapper>
  );
};

export default MbDetail;
