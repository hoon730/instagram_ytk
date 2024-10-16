import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 75px;
  display: flex;
  align-items: center;
  padding-left: 24px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 12px;
  transition: background 0.3s;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.iconBgColor};
  }
`;

const Text = styled.div`
  line-height: 1.4;
`;

const Keyword = styled.h4`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.fontColor};
`;

const PostCount = styled.p`
  font-size: 14px;
  color: var(--gray-color);
`;

const HotHashtagItem = ({ keyword, postcount }) => {
  const navigate = useNavigate();
  return (
    <Wrapper
      onClick={() =>
        navigate(`/search?q=${keyword.toLocaleLowerCase().slice(1)}`)
      }
    >
      <Text>
        <Keyword>{keyword}</Keyword>
        <PostCount>{postcount}</PostCount>
      </Text>
    </Wrapper>
  );
};

export default HotHashtagItem;
