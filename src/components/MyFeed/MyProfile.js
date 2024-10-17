import React, { useContext, useState } from "react";
import styled from "styled-components";
import { FaGear } from "react-icons/fa6";
import Setup from "../../pages/Setup";
import MbButtons from "./MbButtons";
import { StateContext } from "../../App";

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

  @media screen and (max-width: 630px) {
    padding: 0 15px;
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
  }

  @media screen and (max-width: 630px) {
    p {
      font-size: var(--font-16);
    }
    span {
      font-size: var(--font-14);
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
  @media screen and (max-width: 630px) {
    display: none;
  }
`;

const MyIntro = styled.div`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  padding: 30px 70px;
  font-size: var(--font-16);

  /* @media screen and (max-width: 900px) {
    padding: 10px 50px 10px;
  } */

  @media screen and (max-width: 900px) {
    padding: 25px 20px 25px 50px;
    font-size: var(--font-14);
  }

  @media screen and (max-width: 630px) {
    padding: 20px 0 0 15px;
    font-size: var(--font-14);
    border-bottom: none;
  }
`;

const MyProfile = ({ userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { myProfile } = useContext(StateContext);
  const { allProfile } = useContext(StateContext);

  const feedProfile = userId
    ? allProfile.find((it) => it.userId === userId)
    : myProfile;

  const onClick = () => {
    setIsOpen((current) => !current);
  };

  return (
    <Wrapper>
      <MyProfileBox>
        <NameBox>
          <MyName>
            <p>{feedProfile?.userId}</p>
            <span>{feedProfile?.userName}</span>
          </MyName>
          <EditBtn onClick={onClick}>
            {isOpen ? (
              <Setup onClick={onClick} myProfile={feedProfile} />
            ) : null}
            <FaGear />
          </EditBtn>
        </NameBox>
        <MyIntro>{feedProfile?.introduction}</MyIntro>
        <MbButtons myProfile={feedProfile} />
      </MyProfileBox>
    </Wrapper>
  );
};

export default MyProfile;
