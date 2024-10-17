import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-bottom: 50px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding: 20px 0; */
  /* border-bottom: 1px solid #eeeeee; */
  & Button {
    padding: 0;
    font-size: var(--font-size-16);
  }
`;

const LeftChild = styled.div`
  & Button {
    color: var(--gray-color);
  }
`;

const Title = styled.div`
  font-size: var(--font-size-18);
  font-weight: var(--font-semibold);
  color: var(--font-black-color);
`;

const RightChild = styled.div``;

const Header = ({ title, leftChild, rightChild }) => {
  return (
    <Container>
      <Wrapper>
        <LeftChild>{leftChild}</LeftChild>
        <Title>{title}</Title>
        <RightChild>{rightChild}</RightChild>
      </Wrapper>
    </Container>
  );
};

export default Header;
