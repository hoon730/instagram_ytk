import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SearchResult from "./SearchResult";
import { RxMagnifyingGlass } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const SearchBarr = styled.div`
  width: 100%;
  padding: 10px 14px;
  border-radius: 8px;
  background: ${({ theme }) => theme.iconBgColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SearchArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const ItemArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & > svg {
    color: var(--gray-color);
  }
  &.deleteBtn {
    width: 16px;
    display: none;
    background: var(--gray-color);
    border-radius: 50%;
    cursor: pointer;
    & > svg {
      width: 70%;
      color: ${({ theme }) => theme.iconBgColor};
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
  color: ${({ theme }) => theme.fontColor};
  &::placeholder {
    font-size: 14px;
    color: ${({ theme }) => theme.fontColor};
  }
`;

const ResultArea = styled.div`
  display: none;
  &.active {
    display: block;
  }
`;

const SearchBar = () => {
  const [text, setText] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [resultActive, setResultActive] = useState(false);
  const navigate = useNavigate();

  const deleteBtnActive = (e) => {
    setText(e.target.value);
    setIsActive(true);
    if (e.target.value === "") {
      setIsActive(false);
      setResultActive(false);
    } else {
      setIsActive(true);
      setResultActive(true);
    }
  };

  const moveResult = (e) => {
    if (e.key === "Enter") {
      if (text.startsWith("#")) {
        navigate(`/search?q=${text.toLocaleLowerCase().slice(1)}`);
        inputReset();
      }
    }
  };

  const inputReset = () => {
    setText("");
    setIsActive(false);
    setResultActive(false);
  };

  return (
    <Wrapper>
      <SearchBarr>
        <SearchArea>
          <ItemArea>
            <RxMagnifyingGlass size="20" />
          </ItemArea>
          <SearchInput
            onChange={deleteBtnActive}
            onKeyUp={moveResult}
            value={text}
            type="text"
            placeholder="검색"
          ></SearchInput>
        </SearchArea>
        <ItemArea
          className={`deleteBtn ${isActive ? "active" : ""}`}
          onClick={inputReset}
        >
          <AiOutlineClose />
        </ItemArea>
      </SearchBarr>
      <ResultArea className={resultActive ? "result active" : "result"}>
        <SearchResult text={text} />
      </ResultArea>
    </Wrapper>
  );
};

export default SearchBar;
