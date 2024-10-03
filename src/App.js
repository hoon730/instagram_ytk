import "./App.css";
import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/theme";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import MyFeed from "./pages/MyFeed";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import SearchResult from "./pages/SearchResult";
import New from "./pages/New";
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
        path: "search-result",
        element: <SearchResult />,
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
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export const ThemeContext = React.createContext();
function App() {
  const [darkMode, setDarkMode] = useState(false);

  const changeDark = () => {
    setDarkMode((current) => !current);
  };

  return (
    <>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <ThemeContext.Provider value={{ changeDark, darkMode }}>
          <GlobalStyles />
          <RouterProvider router={router} />
        </ThemeContext.Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
