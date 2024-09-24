import React from "react";
import styled from "styled-components";

const LiText = styled.li`
  color: #bfbfbf;
  font-size: 14px;
`;

const FooterListText = ({ text }) => {
  return <LiText>{text}</LiText>;
};

export default FooterListText;
