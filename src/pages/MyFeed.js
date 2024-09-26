import React from "react";
import styled from "styled-components";
import SideBar from "../components/Common/Sidebar/SideBar";
import ProfileImg from "../components/Profile/ProfileImg";
import PostAndFollow from "../components/User/PostAndFollow";

const Container = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  width: 935px;
  height: 100vh;
  margin: 0 auto;
  border: 1px solid lightgray;
`;

const MyPic = styled.div`
  width: 100%;
  height: 410px;
  /* border: 1px solid red; */
  position: relative;
`;

const ProfileBg = styled.div`
  width: 100%;
  height: 310px;
  background: url(https://i.pinimg.com/564x/67/f7/ef/67f7ef2b5beba28677efb2c9580290f9.jpg)
    center -600px / cover;
`;

const ProfileImgBox = styled.div`
  position: absolute;
  top: 220px;
  left: 70px;
`;

const MyFeedDesc = styled.div`
  width: 635px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 250px;
`;

const MyProfile = styled.div`
  width: 100%;
  height: 250px;
  border-top: 1px solid var(--light-gray-color);
`;

const NameBox = styled.div`
  width: 100%;
  height: 80px;
  /* border-bottom: 1px solid var(--gray-color); */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 70px;
`;

const MyName = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  p {
    font-size: var(--font-size-26);
    font-weight: var(--font-bold);
  }
  span {
    font-size: var(--font-size-20);
  }
`;

const EditBtn = styled.div`
  width: 40px;
  height: 40px;
  background: gray;
  border-radius: 50%;
`;

const MyIntro = styled.div`
  width: 100%;
  height: 170px;
  /* border: 1px solid #f00; */
  border-bottom: 1px solid var(--light-gray-color);
  padding: 0px 70px;
  font-size: var(--font-size-16);
`;

const MyFeed = () => {
  return (
    <Container>
      <SideBar />
      <Wrapper>
        <MyPic>
          <ProfileBg></ProfileBg>
          <ProfileImgBox>
            <ProfileImg
              size={170}
              url={"/images/userImgs/user123456/profile-photo.jpg"}
            />
          </ProfileImgBox>
          <MyFeedDesc>
            <PostAndFollow posting={"33"} follower={2198} following={4} />
          </MyFeedDesc>
        </MyPic>
        <MyProfile>
          <NameBox>
            <MyName>
              <p>bbbok</p>
              <span>bbo</span>
            </MyName>
            <EditBtn></EditBtn>
          </NameBox>
          <MyIntro>
            언제나 너만 바라봐 나도 모르게 괜히 웃음이 나와
            <br />난 크게 소리 외치고 싶어 좋아 니 모든 것이 좋아 머리부터
            발끝까지도 조그만 행동까지 하나 하나 다 좋아
            <br /> 니 모든 것이 좋아 너와 함께라면 즐거워 시간이 지날수록 더
            좋아져 난 니가 필요해 매일같이 있게 해달라고 난 기도해 나 오직
            너만이와 행복하게 살수가 있어
            <br />
            <br />
            좋아 니 모든 것이 좋아 머리부터 발끝까지도 조그만 행동까지 하나 하나
            다 좋아
          </MyIntro>
        </MyProfile>
      </Wrapper>
    </Container>
  );
};

export default MyFeed;
