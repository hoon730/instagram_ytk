import React from "react";
import styled from "styled-components";

const ImgBox = styled.div`
  width: 55px;
  height: 55px;
  /* background: var(--main-color); */
  border-radius: 50%;
  overflow: hidden;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  background: dodgerblue;
`;

const UserImg = ({ type }) => {
  return (
    <ImgBox>
      <Img />
    </ImgBox>
  );
};

export default UserImg;
