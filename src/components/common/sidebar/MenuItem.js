import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 305px;
  height: 70px;
  padding-left: 30px;
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  transition: background 0.1s;
  border-radius: var(--border-radius-12);

  &:hover {
    background: var(--font-black-color);
    color: var(--bg-white-color);
    font-weight: var(--font-bold);
  }
`;
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  svg {
    font-size: 24px;
    transition: color 0.3s;
  }
`;
const MenuText = styled.span`
  font-size: 24px;
  transition: color 0.3s;
`;

const MenuItem = ({ name, iconCode, path }) => {
  const navigate = useNavigate();

  return (
    <Wrapper
      onClick={() => {
        if (path) navigate(`${path}`);
      }}
    >
      <IconWrapper>{iconCode}</IconWrapper>
      <MenuText>{name}</MenuText>
    </Wrapper>
  );
};

export default MenuItem;
