import React from "react";
import styled from "styled-components";
import ProfileImg from "../Profile/ProfileImg";
import UserId from "../User/UserId";

const Wrapper = styled.div`
  height: 100%;
  margin-bottom: 50px;
  padding-bottom: 22px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-bottom: none;
  &:last-child {
    border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  }
`;

const ProfileSection = styled.div`
  margin: 0 36px;
  height: 114px;
  display: flex;
  align-items: center;
  gap: 18px;
  @media screen and (max-width: 1024px) {
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
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4px;

  @media screen and (max-width: 1024px) {
    font-size: var(--font-12);
    .user-id {
      font-size: var(--font-12);
    }
  }
`;

const UserName = styled.p`
  font-size: var(--font-14);
  color: var(--gray-color);
  @media screen and (max-width: 1024px) {
    font-size: var(--font-10);
  }
`;

const PhotoSection = styled.div`
  width: 652px;
  height: 815px;
  margin: 0 auto;
  border-radius: 8px;
  overflow: hidden;
  img {
    width: inherit;
    height: inherit;
    object-fit: cover;
    background-color: ${({ $recommend }) =>
      $recommend ? "antiquewhite" : "lavender"};
  }

  @media screen and (max-width: 1024px) {
    width: 350px;
    height: 350px;
  }
`;

const FeedDescArea = styled.div`
  margin: 0 36px;
  @media screen and (max-width: 1024px) {
    margin: 0 20px;
  }
`;

const FeedDesc = styled.div`
  margin-top: 22px;
  @media screen and (max-width: 1024px) {
    margin-top: 13px;
    & input {
      height: 28px;
      border-radius: 8px;
    }
  }
`;

const FeedTextBox = styled.div`
  margin-top: 5px;
  font-size: var(--font-16);
  color: ${({ theme }) => theme.fontColor};
  line-height: 1.6;

  @media screen and (max-width: 1024px) {
    font-size: var(--font-12);
  }
`;

const WelcomFeed = ({ recommend }) => {
  return (
    <Wrapper>
      <ProfileSection>
        <ProfileImg
          type={"active"}
          hover={"true"}
          size={"62"}
          url={"/images/instagram_official.jpeg"}
        />
        <UserInfo>
          <UserId type={"feed"} userNickname={"Instagram"} hover={"true"} />
          <UserName>인스타그램 공식계정</UserName>
        </UserInfo>
      </ProfileSection>
      <PhotoSection $recommend={recommend}>
        <img
          src={`${
            recommend
              ? "/images/instagram_official.jpg"
              : "/images/instagram_official2.jpg"
          }`}
          alt="welcome feed"
        />
      </PhotoSection>
      <FeedDescArea>
        <FeedDesc>
          <UserInfo>
            <UserId type={"feed"} userNickname={"Instagram"} hover={"true"} />
          </UserInfo>
          <FeedTextBox>
            {recommend ? (
              <>
                환영합니다!
                <br />
                이곳은 당신의 소중한 순간들을 기록하고, 전 세계의 사람들과 함께
                소통할 수 있는 특별한 공간입니다.
                <br />
                사진 한 장, 짧은 영상 하나에도 담긴 이야기를 공유하며, 새로운
                영감을 찾아보세요.
                <br />
                인스타그램에서는 당신의 일상도 예술이 될 수 있고, 작은 순간들도
                특별한 추억으로 남을 수 있습니다.
                <br />
                친구들과 함께 공감하고, 다양한 사람들과의 교류를 통해 더 넓은
                세상으로 나아가는 기회를 잡아보세요.
                <br />
                지금 바로 시작하여 당신만의 독특한 스토리를 펼쳐보세요!
              </>
            ) : (
              <>
                안녕하세요!
                <br />
                지금 팔로우하시면 더 많은 소식과 특별한 콘텐츠를 가장 먼저
                만나볼 수 있습니다.
                <br />
                매일매일 업데이트되는 일상 속 소소한 행복, 여행에서의 멋진 풍경,
                그리고 때로는 생각을 자극하는 인사이트까지, 다양하고 유익한
                이야기들이 기다리고 있어요. <br />
                팔로우를 통해 더욱 깊이 소통하고, 서로의 생각과 감정을 나누는
                즐거움을 느껴보세요.
                <br />
                새로운 콘텐츠는 물론, 이벤트나 특별한 순간들을 놓치지 않도록
                알림을 받을 수 있습니다.
                <br />
                함께 소통하며 더 많은 영감을 공유하고, 재미있고 유익한 시간들을
                만들어가요!
              </>
            )}
          </FeedTextBox>
        </FeedDesc>
      </FeedDescArea>
    </Wrapper>
  );
};

export default WelcomFeed;
