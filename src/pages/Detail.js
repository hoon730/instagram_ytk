import React from "react";
import styled from "styled-components";
import ClickFeed from "../components/Detail/ClickFeed"
import Follower from "../components/Detail/Follower"

const Wrapper = styled.div``;

const Detail = () => {
  return (
    <Wrapper>
      {/* <ClickFeed /> */}
      <Follower/>
    </Wrapper>
  );
};

export default Detail;
