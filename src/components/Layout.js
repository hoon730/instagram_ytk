import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./Common/Sidebar/SideBar";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
`;

const Margin = styled.div`
  width: 20%;
  @media screen and (max-width: 1024px) {
    width: 92px;
  }

  @media screen and (max-width: 630px) {
    width: 0;
  }
`;

const Container = styled.div`
  width: 80%;

  @media screen and (max-width: 1024px) {
    width: calc(100% - 92px);
  }

  @media screen and (max-width: 630px) {
    width: 100%;
  }
`;

const Layout = () => {
  return (
    <Wrapper>
      <SideBar />
      <Margin />
      <Container>
        <Outlet />
      </Container>
    </Wrapper>
  );
};

export default Layout;
