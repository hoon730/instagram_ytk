import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: ${({ width }) => `${width}px` || "auto"};
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--dark-gray-color);
  cursor: pointer;
  &.active {
    font-weight: var(--font-bold);
    color: ${({ theme }) => theme.fontColor};
  }
  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`;

const Text = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  @media screen and (max-width: 1024px) {
    font-size: var(--font-14);
    gap: 6px;
  }
`;

const TabBarBtn = ({ width, iconCode, text, isActive, onClick }) => {
  return (
    <Wrapper
      className={isActive ? "active" : null}
      width={width}
      onClick={onClick}
    >
      <Text>
        {iconCode}
        {text}
      </Text>
    </Wrapper>
  );
};

export default TabBarBtn;
