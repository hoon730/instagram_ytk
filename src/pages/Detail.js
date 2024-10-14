import React from "react";
import styled from "styled-components";
import MyFeed from "./MyFeed";

const Wrapper = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.fontColor};
`;

const Detail = () => {
  return (
    <Wrapper>
      <MyFeed />
    </Wrapper>
  );
};

export default Detail;
