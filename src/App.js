import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import Login from "./pages/Login";
import Layout from "./components/Layout";


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
  }
])

function App() {
  return (
    <>
    <GlobalStyles />
    <RouterProvider router={router}/>
    </>
  );
}

export default App;
