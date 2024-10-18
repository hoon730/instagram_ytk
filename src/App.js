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

import Setup from "./pages/Setup";
import Signup from "./pages/Signup";
import ProtectedPage from "./components/ProtectedPage";
import SetStorage from "./pages/SetStorage";

import { auth, db } from "./utils/firebase";
import {
  collection,
  onSnapshot,
  query,
  where,
  limit,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import NotLoggedIn from "./components/NotLoggedIn";
import FindPw from "./pages/FindPw";

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
        path: "profile",
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
        element: <Search page={"search"} />,
      },
      {
        path: "explore",
        element: <Search page={"explore"} />,
      },
      {
        path: "reels",
        element: <Search page={"reels"} />,
      },
      {
        path: "clickstory",
        element: <ClickStory />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <NotLoggedIn>
        <Login />
      </NotLoggedIn>
    ),
  },
  {
    path: "/signup",
    element: (
      <NotLoggedIn>
        <Signup />
      </NotLoggedIn>
    ),
  },
  {
    path: "/findPw",
    element: (
      <NotLoggedIn>
        <FindPw />
      </NotLoggedIn>
    ),
  },
  {
    path: "/setStorage",
    element: <SetStorage />,
  },
]);

export const ThemeContext = React.createContext();
export const StateContext = React.createContext();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady();
    await setIsLoading(false);
  };
  const [darkMode, setDarkMode] = useState(false);
  const [allProfile, setAllProfile] = useState(null);
  const [myProfile, setMyProfile] = useState(null);

  useEffect(() => {
    init();

    let allProfileUnsubscribe = null;
    const fetchAllProfile = async () => {
      const profileQuery = query(collection(db, "profile"));
      allProfileUnsubscribe = onSnapshot(profileQuery, (snapshot) => {
        const profiles = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllProfile(profiles);
      });
    };
    fetchAllProfile();
    return () => {
      allProfileUnsubscribe && allProfileUnsubscribe();
    };
  }, []);

  useEffect(() => {
    let myProfileUnsubscribe = null;
    const fetchMyProfile = async (uid) => {
      const myProfileQuery = query(
        collection(db, "profile"),
        where("uid", "==", uid),
        limit(1)
      );
      myProfileUnsubscribe = onSnapshot(myProfileQuery, (snapshot) => {
        const profile = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMyProfile(profile[0]);
      });
    };
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchMyProfile(user.uid);
      } else {
        setMyProfile(null);
      }
    });
    return () => {
      if (myProfileUnsubscribe) {
        myProfileUnsubscribe();
      }
      unsubscribe();
    };
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
            <StateContext.Provider value={{ allProfile, myProfile }}>
              <RouterProvider router={router} />
            </StateContext.Provider>
          )}
        </ThemeContext.Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
