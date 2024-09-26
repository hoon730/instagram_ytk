import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import MyFeed from "./pages/MyFeed";
import Login from "./pages/Login";
import Layout from "./components/Layout";
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
        path: "setup",
        element: <Setup />,
      },
      {
        path: "myfeed",
        element: <MyFeed />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
