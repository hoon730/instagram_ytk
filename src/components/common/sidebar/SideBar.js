import React from "react";
import styled from "styled-components";
import { menuData } from "../../../utils/utils";
import { toolData } from "../../../utils/utils";
import MenuItem from "./MenuItem";
import ToolItem from "./ToolItem";
import { useNavigate } from "react-router-dom";

const StyledAside = styled.aside`
  width: 380px;
  height: 100vh;
  padding: 0 37.5px;
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
  max-width: 305px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const Logo = styled.img``;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ToolList = styled.div`
  display: flex;
  gap: 10px;
`;

const SideBar = () => {
  const navigate = useNavigate();

  return (
    <StyledAside>
      <Wrapper>
        <Stlyedh1>
          <Logo
            src={"/images/logo.svg"}
            onClick={() => {
              navigate("/");
            }}
          />
        </Stlyedh1>
        <MenuList>
          {menuData.map((it) => (
            <MenuItem key={it.id} {...it} />
          ))}
        </MenuList>
      </Wrapper>
      <ToolList>
        {toolData.map((it) => (
          <ToolItem key={it.id} {...it} />
        ))}
      </ToolList>
    </StyledAside>
  );
};

export default SideBar;
