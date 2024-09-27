import React from "react";
import styled from "styled-components";
import CommentInput from "../components/Common/CommentInput";
import Button from "../components/Common/Button";
import HoverProfile from "../components/User/HoverProfile";

const Wrapper = styled.div``;

const Profile = styled.div``;

const Detail = () => {
  return (
    <Wrapper>
      <Profile>
        <CommentInput width={"600px"} />
        <Button width={"300px"} type={"positive"} />
        <HoverProfile />
      </Profile>
    </Wrapper>
  );
};

export default Detail;
