import React from "react";
import styled from "styled-components";

const Img = styled.img`
  width: 200px;
`;

const LogoImg = () => {
  return <Img src={"/images/logo.svg"} />;
};

export default LogoImg;
