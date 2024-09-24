import React, { useState } from "react";
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
  transition: color 0.2s;
  border-radius: var(--border-radius-12);

  &.active {
    background: var(--font-black-color);
    color: var(--bg-white-color);
    font-weight: var(--font-bold);
  }

  &:hover {
    color: var(--gray-color);
  }
`;
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  svg {
    font-size: 24px;
  }
`;
const MenuText = styled.span`
  font-size: 24px;
`;

const MenuItem = ({ id, name, iconCode, path }) => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  const handleOnClick = () => {
    setIsActive((isActive) => !isActive);
    if (path) navigate(`${path}`);
  };

  return (
    <Wrapper className={id === 1 ? "active" : ""} onClick={handleOnClick}>
      <IconWrapper>{iconCode}</IconWrapper>
      <MenuText>{name}</MenuText>
    </Wrapper>
  );
};

export default MenuItem;
