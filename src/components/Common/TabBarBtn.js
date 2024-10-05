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
`;

const Text = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
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
