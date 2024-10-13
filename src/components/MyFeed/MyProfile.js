import React, { useState } from "react";
import styled from "styled-components";
import { FaGear } from "react-icons/fa6";
import Setup from "../../pages/Setup";

const Wrapper = styled.div``;

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
`;

const MyIntro = styled.div`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  padding: 10px 70px;
  font-size: var(--font-size-16);
`;

const MyProfile = ({ myProfile, handleEditphoto }) => {
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
            {isOpen ? (
              <Setup
                onClick={onClick}
                myProfile={myProfile}
                handleEditphoto={handleEditphoto}
              />
            ) : null}
            <FaGear />
          </EditBtn>
        </NameBox>
        <MyIntro>{myProfile?.introduction}</MyIntro>
      </MyProfileBox>
    </Wrapper>
  );
};

export default MyProfile;
