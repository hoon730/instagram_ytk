import React from "react";
import styled from "styled-components";
import { RxMagnifyingGlass } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";

const Wrapper = styled.div`
  width: 100%;
  ${({ height }) => (isNaN(height) ? `height: ${height}px;` : "")}
  padding: 12px;
  border-radius: 8px;
  background: #eeeeee;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ItemArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & > svg {
    color: #bfbfbf;
  }
  &.deleteBtn {
    display: none;
    background: #bfbfbf;
    border-radius: 50%;
    cursor: pointer;
    & > svg {
      width: 70%;
      color: #ffffff;
    }
    &.active {
      display: block;
    }
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 24px;
  font-size: 16px;
  background: none;
  color: #2b2b2b;
`;

const SearchBar = ({ height }) => {
  return (
    <Wrapper height={height}>
      <ItemArea>
        <RxMagnifyingGlass />
      </ItemArea>
      <SearchInput type="text" placeholder="검색"></SearchInput>
      <ItemArea className="deleteBtn">
        <AiOutlineClose />
      </ItemArea>
    </Wrapper>
  );
};

export default SearchBar;
