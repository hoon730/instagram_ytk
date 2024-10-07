import React from "react";
import styled from "styled-components";
import MyFeed from "./MyFeed";
import Clickdetail from "../components/Detail/ClickFeed copy";
import MbDetail from "./MbDetail";

const Wrapper = styled.div``;

const Detail = () => {
  return (
    <Wrapper>
      {/* <MyFeed /> */}
      <MbDetail/>
      {/* <Clickdetail/> */}
    </Wrapper>
  );
};

export default Detail;
