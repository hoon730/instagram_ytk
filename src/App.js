import React, { useEffect, useState } from "react";
import { ThemeProvider, styled } from "styled-components";
import { lightTheme, darkTheme } from "./styles/theme";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import MyFeed from "./pages/MyFeed";
import Login from "./pages/Login";
import Search from "./pages/Search";
import Layout from "./components/Layout";
import New from "./pages/New";
import Loading from "./components/Common/Loading";
import ClickStory from "./components/Story/ClickStory";

import { auth } from "./utils/firebase";
import Setup from "./pages/Setup";
import Signup from "./pages/Signup";
import ProtectedPage from "./components/ProtectedPage";
import SetStorage from "./pages/SetStorage";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.bgColor};
`;

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedPage>
        <Layout />
      </ProtectedPage>
    ),
    children: [
      {
        path: "",
        element: (
          <ProtectedPage>
            <Main />
          </ProtectedPage>
        ),
      },
      {
        path: "detail",
        element: <Detail />,
      },
      {
        path: "new",
        element: <New />,
      },
      {
        path: "myfeed",
        element: <MyFeed />,
      },
      {
        path: "setup",
        element: <Setup />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "clickstory",
        element: <ClickStory />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/setStorage",
    element: <SetStorage />,
  },
]);

export const ThemeContext = React.createContext();
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady();
    await setIsLoading(false);
  };
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    init();
  }, []);

  const changeDark = () => {
    setDarkMode((current) => !current);
  };

  return (
    <>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <ThemeContext.Provider value={{ changeDark, darkMode }}>
          <GlobalStyles />
          {isLoading ? (
            <Wrapper>
              <Loading />
            </Wrapper>
          ) : (
            <RouterProvider router={router} />
          )}
        </ThemeContext.Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
