import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Signin from './pages/Signin';
import Layout from './components/common/Layout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // {
      //   path: "",
      //   element: <Home />,
      // },
      // {
      //   path: "/profile",
      //   element: <Profile />,
      // },
    ],
  },
  {
    path: "/Signin",
    element: <Signin />,
  },
  // {
  //   path: "/login",
  //   element: <Login />,
  // },
]);


function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
