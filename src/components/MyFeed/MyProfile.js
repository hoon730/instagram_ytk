import React from "react";
import styled from "styled-components";

const Wrapper = styled.div``;

const MyProfileBox = styled.div`
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
    font-size: var(--font-size-28);
    font-weight: var(--font-bold);
  }
  span {
    font-size: var(--font-size-20);
    font-weight: var(--font-bold);
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
  height: 150px;
  /* border: 1px solid red; */
  border-bottom: 1px solid var(--light-gray-color);
  padding: 0px 70px;
  font-size: var(--font-size-16);
`;

const MyProfile = () => {
  return (
    <Wrapper>
      <MyProfileBox>
        <NameBox>
          <MyName>
            <p>cat.h0du</p>
            <span>호두 Walnut</span>
          </MyName>
          <EditBtn></EditBtn>
        </NameBox>
        <MyIntro>
          ㄴㅐ ㅇㅣ름 호두 <br />
          귀ㅇㅕ운 두쨜 고양ㅇㅣㅈㅣ
          <br />
          <br />
          구ㅣ여운 날 봐, ㄷㅐ박임 <br />
          ㅇㅑ옹 🐱💛
          <br />
        </MyIntro>
      </MyProfileBox>
    </Wrapper>
  );
};

export default MyProfile;
