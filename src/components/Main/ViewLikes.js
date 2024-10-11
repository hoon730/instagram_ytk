import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import ProfileImg from "../Profile/ProfileImg";
import UserId from "../User/UserId";

const Wrapper = styled(motion.div)`
  width: 380px;
  padding: 20px 0px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: var(--border-radius-12);
  box-shadow: 0 0 20px ${({ theme }) => theme.shadowAlpha};
  position: absolute;
  ${({ top }) => (top ? `top: ${top}px;` : "top: 22px;")}
  left: 0;
  background: ${({ theme }) => theme.bgColor};
  z-index: 3;
`;

const Header = styled.div`
  font-size: var(--font-16);
  text-align: center;
  border-bottom: 1px solid var(--light-gray-color);
  margin-bottom: 10px;
  padding-bottom: 20px;
`;

const DescSection = styled.div`
  width: 100%;
  height: 300px;
  overflow-y: auto;
`;

const ProfileSection = styled.div`
  margin: 0 36px;
  height: 114px;
  display: flex;
  align-items: center;
  gap: 18px;
  margin: 0 20px;
  height: 66px;
  & .storyFirstCircle {
    width: 46px;
    height: 46px;
    & .storySecondCircle {
      width: 42px;
      height: 42px;
      & .storyThirdCircle {
        width: 38px;
        height: 38px;
      }
    }
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4px;
  .user-id {
    font-size: var(--font-14);
  }
  .user-check {
    width: 14px;
  }
`;

const UserName = styled.p`
  color: var(--gray-color);
  font-size: var(--font-12);
`;

const Follow = styled.span`
  width: 60px;
  font-size: var(--font-12);
  color: ${({ theme }) => theme.subColor};
  cursor: pointer;
`;

const ViewLikes = ({ likeUser }) => {
  console.log(likeUser);
  return (
    <Wrapper>
      <Header>좋아요</Header>
      <DescSection>
        {likeUser
          ? likeUser.map((it, idx) => (
              <ProfileSection key={idx}>
                <ProfileImg size={"62"} url={it.profilePhoto} />
                <UserInfo>
                  <UserId
                    type={"feed"}
                    userNickname={it.userId}
                    check={it.badge}
                  />
                  <UserName>{it.userName}</UserName>
                </UserInfo>
                <Follow>{it.follow > 0 ? "" : "팔로우"}</Follow>
              </ProfileSection>
            ))
          : null}
      </DescSection>
    </Wrapper>
  );
};

export default ViewLikes;
