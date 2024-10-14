import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import MyPic from "../components/MyFeed/MyPic";
import MyProfile from "../components/MyFeed/MyProfile";
import MyHighlight from "../components/MyFeed/MyHighlight";
import MyFeedTabBar from "../components/MyFeed/MyFeedTabBar";
import TimeLine from "../components/Detail/TimeLine";
import { StateContext } from "../App";

import {
  collection,
  query,
  limit,
  orderBy,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../utils/firebase";
import MbHeader from "../components/Detail/MbHeader";

const Wrapper = styled.div`
  width: 934px;
  min-height: 100vh;
  height: fit-content;
  margin: 0 auto;
  background: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.fontColor};

  @media screen and (max-width: 1024px) {
    width: 100%;
  }
  @media screen and (max-width: 630px) {
    /* display: none; */
    width: 430px;
  }
`;

const MyFeed = () => {
  const [myFeeds, setMyFeed] = useState([]);

  const { myProfile } = useContext(StateContext);

  useEffect(() => {
    if (myProfile) {
      const getmyFeed = async (myProfile) => {
        const feedsQuery = query(
          collection(db, "feed"),
          where("uid", "==", myProfile.uid),
          orderBy("createdAt", "desc"),
          limit(15)
        );

        const myFeedSnapshot = await getDocs(feedsQuery);

        if (!myFeedSnapshot.empty) {
          const myFeedData = myFeedSnapshot.docs.map((doc) => doc.data());
          setMyFeed((prevFeed) => [...prevFeed, ...myFeedData]);
        }
      };
      getmyFeed(myProfile);
    }
  }, [myProfile]);

  return (
    <Wrapper>
      <MbHeader/>
      <MyPic myProfile={myProfile} myFeeds={myFeeds} />
      <MyProfile myProfile={myProfile} />
      <MyHighlight />
      <MyFeedTabBar />
      <TimeLine myFeeds={myFeeds} myProfile={myProfile} />
    </Wrapper>
  );
};

export default MyFeed;
