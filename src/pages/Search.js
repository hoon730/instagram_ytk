import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
`;

const Container = styled.div`
  width: 936px;
  margin: 0 auto;
`;

const Header = styled.div`
  width: 100%;
  height: 100px;
  border: 1px solid #f00;
`;

const Keyword = styled.div`
  font-size: var(--font-size-28);
  font-weight: var(--font-bold);
`;

const Search = () => {
  return (
    <Wrapper>
      <Container>
        <Header>
          <Keyword>#여행</Keyword>
        </Header>
      </Container>
    </Wrapper>
  );
};

export default Search;
