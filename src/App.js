import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/theme";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Signup from "./pages/Signup";
import { auth } from "./firebase";
import { useEffect } from "react";
import ProtectedPage from "./components/ProtectedPage";

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
        element: (
          <ProtectedPage>
            <Detail />
          </ProtectedPage>
        ),
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
]);

export const ThemeContext = React.createContext();
function App() {
  const [darkMode, setDarkMode] = useState(false);

  const changeDark = () => {
    setDarkMode((current) => !current);
  };

  const init = async () => {
    await auth.authStateReady();
  };
  useEffect(() => {
    init();
  }, []);
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
