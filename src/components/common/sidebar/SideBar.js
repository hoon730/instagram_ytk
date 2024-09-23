import React from "react";
import styled from "styled-components";
import MenuItem from "./MenuItem";

const StyledAside = styled.aside`
  width: 380px;
  height: 100vh;
  padding: 32px 37.5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid var(--light-gray-color);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Stlyedh1 = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Logo = styled.img``;

const MenuList = styled.div``;

const SideBar = () => {
  return (
    <StyledAside>
      <Wrapper>
        <Stlyedh1>
          <Logo src={"/images/logo.svg"} />
        </Stlyedh1>
        <MenuList>
          <MenuItem />
        </MenuList>
      </Wrapper>
    </StyledAside>
  );
};

export default SideBar;
