import React from "react";
import styled from "styled-components";

const Input = styled.input`
  width: 400px;
  border: 1px solid #bfbfbf;
  border-radius: 5px;
  padding: 15px 20px;
  font-size: 18px;
`;

const LoginInput = (props) => {
  console.log(props);
  return (
    <Input
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
    />
  );
};

export default LoginInput;
