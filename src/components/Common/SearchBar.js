import React, { useState } from "react";
import styled from "styled-components";
import { RxMagnifyingGlass } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";

const Wrapper = styled.div`
  width: 100%;
  padding: 10px 14px;
  border-radius: 8px;
  background: var(--light-gray-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ItemArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & > svg {
    color: var(--gray-color);
  }
  &.deleteBtn {
    display: none;
    background: var(--gray-color);
    border-radius: 50%;
    cursor: pointer;
    & > svg {
      width: 70%;
      color: var(--bg-white-color);
    }
    &.active {
      display: flex;
    }
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 24px;
  font-size: 16px;
  background: none;
  color: var(--font-black-color);
  &::placeholder {
    font-size: 14px;
  }
`;

const SearchBar = () => {
  const [text, setText] = useState("");
  const [isActive, setIsActive] = useState(false);

  const deleteBtnActive = (e) => {
    setText(e.target.value);
    setIsActive(true);
    if (e.target.value === "") setIsActive(false);
    else setIsActive(true);
  };

  const inputReset = () => {
    setText("");
    setIsActive(false);
  };

  return (
    <Wrapper>
      <ItemArea>
        <RxMagnifyingGlass size="20" />
      </ItemArea>
      <SearchInput
        onChange={deleteBtnActive}
        value={text}
        type="text"
        placeholder="검색"
      ></SearchInput>
      <ItemArea
        className={`deleteBtn ${isActive ? "active" : ""}`}
        onClick={inputReset}
      >
        <AiOutlineClose />
      </ItemArea>
    </Wrapper>
  );
};

export default SearchBar;
