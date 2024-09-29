import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./Common/Sidebar/SideBar";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
`;

const Container = styled.div`
  width: calc(100% - 380px);
  margin-left: 380px;
`;

const Layout = () => {
  return (
    <Wrapper>
      <SideBar />
      <Container>
        <Outlet />
      </Container>
    </Wrapper>
  );
};

export default Layout;
