import React, { useState } from "react";
import styled from "styled-components";
import { FaGear } from "react-icons/fa6";
import Setup from "../../pages/Setup";

const Wrapper = styled.div``;

const MyProfileBox = styled.div`
  width: 100%;
  /* border-top: 1px solid ${({ theme }) => theme.borderColor}; */
`;

const NameBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 70px 0px;

  @media screen and (max-width: 900px) {
    padding: 10px 50px 0px;
  }

  @media screen and (max-width: 500px) {
    padding: 10px 20px 0px 50px;
  }
`;

const MyName = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  p {
    font-size: var(--font-22);
    font-weight: var(--font-bold);

    @media screen and (max-width: 780px) {
      font-size: var(--font-20);
    }
  }
  span {
    font-size: var(--font-18);
    font-weight: var(--font-bold);

    @media screen and (max-width: 780px) {
      font-size: var(--font-16);
    }
  }
`;

const EditBtn = styled.div`
  width: 36px;
  height: 36px;
  background: ${({ theme }) => theme.nonActiveBtnColor};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    font-size: var(--font-22);
    color: #fff;
  }

  @media screen and (max-width: 1000px) {
    width: 30px;
    height: 30px;
    svg {
      font-size: var(--font-18);
    }
  }
`;

const MyIntro = styled.div`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  padding: 10px 70px 30px;
  font-size: var(--font-16);

  @media screen and (max-width: 900px) {
    padding: 10px 50px 30px;
  }

  @media screen and (max-width: 780px) {
    font-size: var(--font-14);
  }
`;

const MyProfile = ({ myProfile }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    setIsOpen((current) => !current);
  };

  return (
    <Wrapper>
      <MyProfileBox>
        <NameBox>
          <MyName>
            <p>{myProfile?.userId}</p>
            <span>{myProfile?.userName}</span>
          </MyName>
          <EditBtn onClick={onClick}>
            {isOpen ? <Setup onClick={onClick} myProfile={myProfile} /> : null}
            <FaGear />
          </EditBtn>
        </NameBox>
        <MyIntro>{myProfile?.introduction}</MyIntro>
      </MyProfileBox>
    </Wrapper>
  );
};

export default MyProfile;
