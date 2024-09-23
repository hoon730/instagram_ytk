import "./App.css";
import GlobalStyles from "./styles/GlobalStyles";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import Login from "./pages/Login";
import SideBar from "./components/common/sidebar/SideBar";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <SideBar />
        <main>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </Wrapper>
    </>
  );
}

export default App;
