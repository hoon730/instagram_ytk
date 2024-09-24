import React from "react";
import styled from "styled-components";

const Submit = styled.input`
  width: 400px;
  border-radius: 5px;
  padding: 15px 20px;
  background: var(--sub-purple-color);
  color: #fff;
  font-size: 18px;
`;

const LoginButton = ({value}) => {
  return <Submit type="submit" value={value}/>;
};

export default LoginButton;
