import React from "react";
import styled from "styled-components";

const Img = styled.img`
  width: 200px;
`;

const LogoImg = () => {
  return <Img src={"/images/logo_light.svg"} />;
};

export default LogoImg;
