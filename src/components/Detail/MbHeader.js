import React from "react";
import styled from "styled-components";

import { IoChevronDown } from "react-icons/io5";
import { BsThreads } from "react-icons/bs";
import { LuMenu } from "react-icons/lu";

const Header = styled.div`
  display: none;
  width: 100%;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  background: ${({ theme }) => theme.bgColor};

  @media screen and (max-width: 630px) {
    display: flex;
  }
`;
const IdBox = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
const Id = styled.span`
  font-size: var(--font-20);
  font-weight: var(--font-bold);
  cursor: pointer;
`;
const IdBtn = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const HeaderBtn = styled.div`
  display: flex;
  gap: 24px;
`;
const Threads = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    font-size: var(--font-22);
  }
`;

const Menu = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    font-size: var(--font-24);
  }
`;

const MbHeader = () => {
  return (
    <Header>
      <IdBox>
        <Id>bb_bok</Id>
        <IdBtn>
          <IoChevronDown />
        </IdBtn>
      </IdBox>
      <HeaderBtn>
        <Threads>
          <BsThreads />
        </Threads>
        <Menu>
          <LuMenu />
        </Menu>
      </HeaderBtn>
    </Header>
  );
};

export default MbHeader;
