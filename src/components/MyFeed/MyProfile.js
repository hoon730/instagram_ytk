import React, { useState } from "react";
import styled from "styled-components";
import { FaGear } from "react-icons/fa6";
import Setup from "../../pages/Setup";

const Wrapper = styled.div`
  @media screen and (max-width: 1024px) {
  }
`;

const MyProfileBox = styled.div`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.borderColor};
`;

const NameBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 70px 0;

  @media screen and (max-width: 1024px) {
    padding: 20px 50px 0;
  }
`;

const MyName = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  p {
    font-size: var(--font-20);
    font-weight: var(--font-bold);
  }
  span {
    font-size: var(--font-16);
    font-weight: var(--font-bold);
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

  @media screen and (max-width: 1024px) {
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
  padding: 10px 70px;
  font-size: var(--font-size-16);

  @media screen and (max-width: 1024px) {
    padding: 10px 50px 10px;
  }
`;

const MyProfile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    setIsOpen((current) => !current);
  };

  return (
    <Wrapper>
      <MyProfileBox>
        <NameBox>
          <MyName>
            <p>bb_bok</p>
            <span>복</span>
          </MyName>
          <EditBtn onClick={onClick}>
            {isOpen ? <Setup onClick={onClick} /> : null}
            <FaGear />
          </EditBtn>
        </NameBox>
        <MyIntro>
          ⋆｡˚ ☁︎ ˚｡⋆｡
          <br />
          <br />
        </MyIntro>
      </MyProfileBox>
    </Wrapper>
  );
};

export default MyProfile;
