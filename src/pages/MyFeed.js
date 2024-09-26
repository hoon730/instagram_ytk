import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 975px;
  height: 100vh;
  margin: 0 auto;
  border: 1px solid lightgray;
`;

const ProfileBg = styled.div`
  width: 100%;
  height: 310px;
  background: url(https://i.pinimg.com/564x/67/f7/ef/67f7ef2b5beba28677efb2c9580290f9.jpg)
    center -600px / cover;
`;

const MyFeedDesc = styled.div`
  width: 100%;
  height: 145px;
  border-bottom: 1px solid var(--gray-color);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MyProfile = styled.div`
  width: 100%;
  height: 335px;
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
    font-size: var(--font-size-34);
    font-weight: var(--font-bold);
  }
  span {
    font-size: var(--font-size-24);
  }
`;

const EditBtn = styled.div`
  width: 50px;
  height: 50px;
  background: gray;
  border-radius: 50%;
`;

const MyIntro = styled.div`
  width: 100%;
  height: 255px;
  /* border: 1px solid #f00; */
  border-bottom: 1px solid var(--gray-color);
  padding: 0px 70px;
  font-size: var(--font-size-22);
`;

const MyFeed = () => {
  return (
    <Wrapper>
      <ProfileBg></ProfileBg>
      <MyFeedDesc>게시글 팔로워 팔로잉 넣을 자리</MyFeedDesc>
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
  );
};

export default MyFeed;
