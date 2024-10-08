import React from "react";
import styled from "styled-components";
import MyFeed from "./MyFeed";
import MbDetail from "./MbDetail";
import UserId from "../components/User/UserId";

const Wrapper = styled.div``;

const Detail = () => {
  return (
    <Wrapper>
      <MyFeed />
      {/* <MbDetail/> */}
      {/* <Clickdetail/> */}
    </Wrapper>
  );
};

export default Detail;
