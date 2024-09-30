import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { menuData } from "../../../utils/utils";
import { toolData } from "../../../utils/utils";
import MenuItem from "./MenuItem";
import ToolItem from "./ToolItem";
import New from "../../../pages/New";

const StyledAside = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
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
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const Logo = styled.img`
  width: 130px;
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ToolList = styled.div`
  display: flex;
  gap: 8px;
`;

const NewBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  overflow: hidden;
`;

const SideBar = () => {
  const navigate = useNavigate();
  const newBgRef = useRef();
  const [activeId, setActiveId] = useState(null);
  const [openNew, setOpenNew] = useState(false);

  const onClick = () => {
    setOpenNew(true);
  };

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
            <MenuItem
              key={it.id}
              {...it}
              isActive={activeId === it.id}
              setIsActive={() => setActiveId(it.id)}
              onClick={onClick}
            />
          ))}
          {openNew ? (
            <NewBg
              ref={newBgRef}
              onClick={(e) => {
                if (e.target === newBgRef.current) setOpenNew(false);
              }}
            >
              <New />
            </NewBg>
          ) : null}
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
