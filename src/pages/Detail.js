import React from "react";
import styled from "styled-components";
import MyFeed from "./MyFeed";
import Clickdetail from "../components/Detail/ClickFeed copy";

const Wrapper = styled.div``;

const Detail = () => {
  return (
    <Wrapper>
      <MyFeed />
      {/* <Clickdetail/> */}
    </Wrapper>
  );
};

export default Detail;
