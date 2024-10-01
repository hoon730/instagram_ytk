import React from "react";
import styled from "styled-components";
import ProfileImg from "../Profile/ProfileImg";
import UserId from "../User/UserId";

const Wrapper = styled.div`
  border: 1px solid #f00;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const UserName = styled.p`
  font-size: var(--font-14);
  color: var(--gray-color);
`;

const item = {
  userNickName: "lotte_ria",
  userName: "코드분쇄기",
  // followed: "followed",
  url: "/images/userImgs/user123456/followed_1.jpg",
  createDate: "2일",
  check: "active",
};

const FeedItem = () => {
  return (
    <Wrapper>
      <ProfileSection>
        <ProfileImg type={"active"} size={"62"} url={item.url} />
        <UserInfo>
          <UserId
            type={"feed"}
            userNickname={item.userNickName}
            check={item.active}
            createDate={item.createDate}
            btn={"more"}
          />
          <UserName>{item.userName}</UserName>
        </UserInfo>
      </ProfileSection>
    </Wrapper>
  );
};

export default FeedItem;
