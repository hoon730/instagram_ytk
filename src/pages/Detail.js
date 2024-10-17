import React from "react";
import styled from "styled-components";
import MyFeed from "./MyFeed";
import MbHeader from "../components/Detail/MbHeader";
import { useSearchParams } from "react-router-dom";

const Wrapper = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.fontColor};
  position: relative;
  overflow: hidden;
`;

const Detail = () => {
  const [serachPrams] = useSearchParams();
  const uid = serachPrams.get("uid");
  return (
    <Wrapper>
      <MbHeader />
      <MyFeed uid={uid} />
    </Wrapper>
  );
};

export default Detail;
