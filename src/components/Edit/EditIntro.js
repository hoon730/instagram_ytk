import React from "react";
import styled from "styled-components";
import EditPicBox from "./EditPicBox";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
`;

const UserNicknam = styled.div`
  font-size: var(--font-size-24);
  font-weight: var(--font-bold);
`;
const UserName = styled.div`
  font-size: var(--font-size-16);
`;

const EditIntro = () => {
  return (
    <Wrapper>
      <EditPicBox />
      <UserNicknam>bbbok</UserNicknam>
      <UserName>bbo</UserName>
    </Wrapper>
  );
};

export default EditIntro;
