import React from "react";
import styled from "styled-components";

const Submit = styled.input`
  width: 100%;
  border-radius: 5px;
  padding: 15px 20px;
  background: var(--sub-purple-color);
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: opacity 0.3s;
  &:hover {
    opacity: 0.9;
  }
`;

const LoginBtn = ({ value }) => {
  return <Submit type="submit" value={value} />;
};

export default LoginBtn;
