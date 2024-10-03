import React, { useRef, useState } from "react";
import styled from "styled-components";
import ProfileImg from "../Profile/ProfileImg";
import UserId from "../User/UserId";
import CommentItem from "./CommentItem";

import { IoIosCloseCircle } from "react-icons/io";
import { IoHeartOutline } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa6";
import { IoPaperPlaneOutline } from "react-icons/io5";

const feed = [
  {
    type: "img",
    imgPath: ["images/userImgs/lualbvqvQmVWkfDU7JUKJRYdqf3/feed1.jpg"],
    content:
      "#브런치 먹으러 다녀왔어요! 분위기가 정말 좋고 커피도 맛있었어요 ☕️ #카페투어 #소확행 #힐링",
  },
  {
    type: "img",
    imgPath: [
      "images/userImgs/lualbvqvQmVWkfDU7JUKJRYdqf3/feed2.jpg",
      "images/userImgs/lualbvqvQmVWkfDU7JUKJRYdqf3/feed3.jpg",
      "images/userImgs/lualbvqvQmVWkfDU7JUKJRYdqf3/feed4.jpg",
      "images/userImgs/lualbvqvQmVWkfDU7JUKJRYdqf3/feed5.jpg",
    ],
  },
];

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

const CloseBtn = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 4;
  display: ${({ toggleBg }) => (toggleBg ? "block" : "none")};

  svg {
    font-size: 30px;
    color: var(--bg-white-color);
  }
`;

const Wrapper = styled.div`
  width: 80%;
  height: 93%;
  background: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.fontColor};
  border-radius: var(--border-radius-12);

  @media screen and (max-width: 1400px) {
    position: relative;
    height: 0;
    padding-top: 56.25%;

    .inner {
      width: 100%;
      height: 100%;
    }
  }

  @media screen and (max-width: 1000px) {
    .slider {
      width: 55%;
    }
    .desc {
      width: 45%;

      .user_container {
        padding: 10px;
      }
      .comment_list {
        padding: 10px;
      }
      .writing_comment {
        padding: 10px;
      }
    }
  }
`;

const Inner = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 93%;
  background: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.fontColor};
  border-radius: var(--border-radius-12);
`;

const limit = feed[1].imgPath.length - 1;

const Slider = styled.div`
  width: 60%;
  height: 100%;
  position: relative;
  border-radius: var(--border-radius-12) 0 0 var(--border-radius-12);
  overflow: hidden;
`;

const Slides = styled.ul`
  width: ${100 * (feed[1].imgPath.length || 1)}%;
  height: 100%;
  display: flex;
  transform: translateX(
    ${({ visible }) => `${-visible * (100 / feed[1].imgPath.length) || 0}%`}
  );
  transition: transform 0.5s;
`;

const Slide = styled.li`
  width: 100%;
  height: 100%;
  img {
    width: inherit;
    height: inherit;
    object-fit: cover;
  }
`;

const SlideButtons = styled.div`
  width: 100%;
  padding: 0 22px;
  position: absolute;
  top: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SlideButton = styled.span`
  width: 26px;
  height: 26px;
  cursor: pointer;
  &.prev {
    transform: rotate(180deg);
    visibility: ${({ visible }) => (visible === 0 ? "hidden" : "visible")};
  }
  &.next {
    visibility: ${({ visible }) => (visible === limit ? "hidden" : "visible")};
  }
  & img {
    width: inherit;
    height: inherit;
  }
`;

const SlideButtonImg = () => {
  return (
    <>
      <img src={"/images/slide-button.svg"} />
    </>
  );
};

const Pagers = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Pager = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--dark-gray-color);
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  cursor: pointer;

  &.active {
    background: var(--bg-white-color);
  }
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
  align-items: center;
  font-size: var(--font-14);
  gap: 8px;

  svg {
    font-size: var(--font-20);
  }
`;
const IconBtns = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  cursor: pointer;

  svg {
    font-size: var(--font-16);
  }
`;

const StyledInput = styled.input`
  width: 100%;
  height: 35px;
  background: var(--light-gray-color);
  border-radius: var(--border-radius-8);
  padding: 0 20px;

  &::placeholder {
    color: var(--gray-color);
    font-weight: var(--font-regular);
  }
`;

const Form = styled.form``;

const Clickdetail = ({ location }) => {
  const bgWrapperRef = useRef();
  const commentRef = useRef();
  const [isShowngBg, setIsShowingBg] = useState(true);
  const [comment, setComment] = useState("");
  const [visible, setVisible] = useState(0);

  const moveSlide = (e, num) => {
    if (e.target.localName === "img") {
      setVisible(num + visible);
    } else {
      setVisible(num);
    }
  };

  const onClick = () => {
    commentRef.current.focus();
  };

  const toggleBg = () => {
    setIsShowingBg(false);
  };

  return (
    <>
      <CloseBtn toggleBg={toggleBg} onClick={toggleBg}>
        <IoIosCloseCircle />
      </CloseBtn>
      {isShowngBg ? (
        <BgWrapper ref={bgWrapperRef}>
          <Wrapper>
            <Inner className="inner">
              <Slider className="slider">
                <Slides visible={visible}>
                  {feed[1].imgPath.map((it, idx) => (
                    <Slide key={idx}>
                      <img src={it} />
                    </Slide>
                  ))}
                </Slides>
                <SlideButtons>
                  <SlideButton
                    className="prev"
                    visible={visible}
                    onClick={(e) => moveSlide(e, -1)}
                  >
                    <SlideButtonImg />
                  </SlideButton>
                  <SlideButton
                    className="next"
                    visible={visible}
                    onClick={(e) => moveSlide(e, 1)}
                  >
                    <SlideButtonImg />
                  </SlideButton>
                </SlideButtons>
                <Pagers>
                  {feed[1].imgPath.map((i, idx) => (
                    <Pager
                      key={idx}
                      className={idx === visible ? "active" : ""}
                      idx={idx}
                      onClick={(e) => moveSlide(e, idx)}
                    />
                  ))}
                </Pagers>
              </Slider>
              <Desc className="desc">
                <Container>
                  <UserContainer className="user_container">
                    <UserBox>
                      <ProfileImg
                        size={"40"}
                        url={"/images/userImgs/user123456/profile-photo.jpg"}
                      />
                      <Userinfo>
                        <UserId
                          type={"feed"}
                          userNickname={"bbok"}
                          more={true}
                        />
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
                  <CommentList className="comment_list">
                    <CommentItem onClick={onClick} />
                  </CommentList>
                </Container>
                <WritingComment className="writing_comment">
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
            </Inner>
          </Wrapper>
        </BgWrapper>
      ) : null}
    </>
  );
};

export default Clickdetail;
