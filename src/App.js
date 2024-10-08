import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
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

import { auth } from "./utils/firebase";
import Setup from "./pages/Setup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Main />,
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
    ],
  },
  {
    path: "/login",
    element: <Login />,
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
          {isLoading ? <Loading /> : <RouterProvider router={router} />}
        </ThemeContext.Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
