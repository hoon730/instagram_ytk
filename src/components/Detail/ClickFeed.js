import React, { useRef, useState } from "react";
import styled from "styled-components";
import ProfileImg from "../Profile/ProfileImg";
import UserId from "../User/UserId";
import CommentItem from "./CommentItem";

import { AnimatePresence, motion } from "framer-motion";

import { IoHeartOutline } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa6";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { IoChevronBack } from "react-icons/io5";
import { IoChevronForwardOutline } from "react-icons/io5";

const BgWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 3;
`;

const Wrapper = styled.div`
  display: flex;
  width: 76%;
  height: 93%;
  background: var(--bg-white-color);
  border-radius: var(--border-radius-12);
  overflow: hidden;
`;

const Slider = styled.div`
  width: 60%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

// const SlideWrapper = styled(motion.div)`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

const Slide = styled(motion.div)`
  width: 100%;
  height: 100%;
`;

const Btns = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    border-radius: 50%;

    svg {
      font-size: var(--font-16);
    }
  }
`;

const LeftBtn = styled.button``;
const RightBtn = styled.button``;

const Pagers = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Pager = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--gray-color);
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);

  &.active {
    background: var(--bg-white-color);
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Desc = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Container = styled.div``;

const UserContainer = styled.div`
  width: 100%;
  padding: 20px;
  border-bottom: 1px solid var(--light-gray-color);
`;

const UserBox = styled.div`
  width: 100%;
  display: flex;
  gap: 15px;
  padding-bottom: 5px;
`;

const Userinfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const UserLocation = styled.span`
  font-size: var(--font-14);
`;

const UserContents = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 15px;
`;

const Content = styled.span`
  margin-left: ${({ size }) => (size ? `${size}px` : 0)};
  font-size: var(--font-14);
`;

const Date = styled.span`
  display: flex;
  align-items: flex-end;
  font-size: var(--font-12);
  color: var(--gray-color);
`;

const CommentList = styled.div`
  padding: 20px;
`;

const WritingComment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 15px 20px;
  border-top: 1px solid var(--light-gray-color);
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Notification = styled.div`
  display: flex;
  /* align-items: center; */
  gap: 8px;

  svg {
    font-size: var(--font-24);
  }
`;
const IconBtns = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  cursor: pointer;

  svg {
    font-size: var(--font-20);
  }
`;

const StyledInput = styled.input`
  width: 100%;
  height: 45px;
  background: var(--light-gray-color);
  border-radius: var(--border-radius-8);
  padding: 0 20px;

  &::placeholder {
    color: var(--gray-color);
    font-weight: var(--font-regular);
  }
`;

const Form = styled.form``;

const slide = {
  initial: (back) => ({
    x: back ? -800 : 800,
  }),
  visible: {
    x: 0,
    transition: {
      type: "tween",
      duration: 0.5,
      ease: [0.42, 0, 0.58, 1],
    },
  },
  exit: (back) => ({
    x: back ? 800 : -800,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  }),
};

const slideArray = [1, 2, 3, 4];

const Clickdetail = ({ location }) => {
  const commentRef = useRef();
  const [comment, setComment] = useState("");
  const [visible, setVisible] = useState(1);
  const [back, setBack] = useState(false);

  const onClick = () => {
    commentRef.current.focus();
  };

  const goLeft = () => {
    setBack(true);
    setVisible((prev) => (prev === 1 ? 4 : prev - 1));
  };

  const goRight = () => {
    setBack(false);
    setVisible((prev) => (prev === 4 ? 1 : prev + 1));
  };

  return (
    <BgWrapper>
      <Wrapper>
        <Slider>
          {/* <SlideWrapper> */}
          <AnimatePresence mode="wait" custom={back}>
            {slideArray.map((idx) =>
              idx === visible ? (
                <Slide
                  key={visible}
                  custom={back}
                  variants={slide}
                  initial="initial"
                  animate="visible"
                  exit="exits"
                >
                  <Img
                    key={visible}
                    src="/images/userImgs/user123456/feedDetail.jpg"
                  />
                </Slide>
              ) : null
            )}
          </AnimatePresence>
          {/* </SlideWrapper> */}
          <Btns>
            <LeftBtn onClick={goLeft}>
              <IoChevronBack />
            </LeftBtn>
            <RightBtn onClick={goRight}>
              <IoChevronForwardOutline />
            </RightBtn>
          </Btns>
          <Pagers>
            <Pager className="active" />
            <Pager />
            <Pager />
            <Pager />
          </Pagers>
        </Slider>
        <Desc>
          <Container>
            <UserContainer>
              <UserBox>
                <ProfileImg
                  size={"40"}
                  url={"/images/userImgs/user123456/profile-photo.jpg"}
                />
                <Userinfo>
                  <UserId type={"feed"} userNickname={"bbok"} more={true} />
                  <UserLocation>대관령 목장</UserLocation>
                </Userinfo>
              </UserBox>
              <UserContents>
                <Content size={"40"}>
                  크리스마스 <br /> 눈썰매타기
                </Content>
                <Date>2023년 12월 25일</Date>
              </UserContents>
            </UserContainer>
            <CommentList>
              <CommentItem onClick={onClick} />
            </CommentList>
          </Container>
          <WritingComment>
            <Top>
              <Notification>
                <IoHeartOutline />
                <span>
                  <b>maratang</b>님 외 <b>109</b>명이 좋아합니다
                </span>
              </Notification>
              <IconBtns>
                <IoPaperPlaneOutline />
                <FaRegBookmark />
              </IconBtns>
            </Top>
            <Form>
              <StyledInput
                ref={commentRef}
                value={comment}
                placeholder="댓글 달기... "
                onChange={(e) => setComment(e.target.value)}
              />
            </Form>
          </WritingComment>
        </Desc>
      </Wrapper>
    </BgWrapper>
  );
};

export default Clickdetail;
