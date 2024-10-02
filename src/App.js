import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Signup from "./pages/Signup";
import { auth } from "./firebase";
import { useEffect } from "react";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "",
        element: <Main/>,
      },
      {
        path: "detail",
        element: <Detail/>,
      }
    ],
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/signup",
    element: <Signup/>
  }
])

function App() {
  const init = async () => {
    await auth.authStateReady();
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <>
    <GlobalStyles />
    <RouterProvider router={router}/>
    </>
  );
}

export default App;
