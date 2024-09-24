import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 75px;
  display: flex;
  align-items: center;
  padding-left: 24px;
  border: 1px solid #eeeeee;
  border-radius: 12px;
  transition: background 0.3s;
  cursor: pointer;
  &:hover {
    background: #eeeeee;
  }
`;

const Text = styled.div`
  line-height: 1.4;
`;

const Keyword = styled.h4`
  font-size: 16px;
  font-weight: 700;
  color: #2b2b2b;
`;

const PostCount = styled.p`
  font-size: 14px;
  color: #bfbfbf;
`;

const HotHashtagItem = ({ keyword, postcount }) => {
  return (
    <Wrapper>
      <Text>
        <Keyword>{keyword}</Keyword>
        <PostCount>{postcount}</PostCount>
      </Text>
    </Wrapper>
  );
};

export default HotHashtagItem;
