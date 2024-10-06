import React from 'react'
import styled from 'styled-components'
import NotificationItem from './NotificationItem';

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
`;

const NotificationList = styled.ul`
  padding: 5px 10px 5px 5px;
  border-radius: var(--border-radius-8);
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: ${({ theme }) => theme.iconBgColor};
  }
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
    id: "notification01",
    type: "like",
    feedbackUser: "inner_v",
    url: "/images/userImgs/user123456/followed_5.jpg",
  },
];

const Notification = () => {
  return (
    <Wrapper>
      {itemArray.map((it) => (
        <NotificationList>
          <NotificationItem key={it.id} {...it} />
        </NotificationList>
      ))}
    </Wrapper>
  )
}

export default Notification