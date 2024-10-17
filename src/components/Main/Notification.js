import React from "react";
import styled from "styled-components";
import NotificationItem from "./NotificationItem";
import { FaArrowLeft } from "react-icons/fa6";

const Wrapper = styled.div`
  width: 380px;
  padding: 20px 20px;
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 8px;
  background: ${({ theme }) => theme.bgColor};
  box-shadow: 0 5px 6px ${({ theme }) => theme.shadowAlpha};
  margin-top: 45px;
  z-index: 1;
  @media screen and (max-width: 1024px) {
    right: 0;
  }
  @media screen and (max-width: 630px) {
    width: calc(100% + 4px);
    height: 100vh;
    border-radius: 0;
    margin-top: -45px;
  }
`;

const NotificationHeader = styled.div`
  display: none;
  @media screen and (max-width: 630px) {
    display: block;
    width: 100%;
    height: 74px;
    display: flex;
    align-items: center;
    gap: 15px;
    font-size: var(--font-20);
    font-weight: var(--font-bold);
  }
`;

const BackBtn = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  color: ${({ theme }) => theme.fontColor};
`;

const NotificationList = styled.ul`
  width: 100%;
  cursor: pointer;
`;

const itemArray = [
  {
    id: "notification01",
    type: "like",
    feedbackUser: "lotte_ria",
    url: "/images/userImgs/user123456/followed_1.jpg",
  },
  {
    id: "notification02",
    type: "follow",
    feedbackUser: "burxxxking",
    url: "/images/userImgs/user123456/followed_2.jpg",
  },
  {
    id: "notification03",
    type: "like",
    feedbackUser: "bas_bg",
    url: "/images/userImgs/user123456/followed_3.jpg",
  },
  {
    id: "notification04",
    type: "comment",
    userNickName: "burxxxking",
    feedbackUser: "westside",
    comment: "나도 가고싶당",
    url: "/images/userImgs/user123456/followed_4.jpg",
  },
  {
    id: "notification05",
    type: "like",
    feedbackUser: "inner_v",
    url: "/images/userImgs/user123456/followed_5.jpg",
  },
];

const Notification = ({ setHeart }) => {
  return (
    <Wrapper>
      <NotificationHeader>
        <BackBtn onClick={() => setHeart(false)}>
          <FaArrowLeft />
        </BackBtn>
        알림
      </NotificationHeader>
      <NotificationList>
        {itemArray.map((it) => (
          <NotificationItem key={it.id} {...it} />
        ))}
      </NotificationList>
    </Wrapper>
  );
};

export default Notification;
