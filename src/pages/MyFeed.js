import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MyPic from "../components/MyFeed/MyPic";
import MyProfile from "../components/MyFeed/MyProfile";
import MyHighlight from "../components/MyFeed/MyHighlight";
import MyFeedTabBar from "../components/MyFeed/MyFeedTabBar";
import TimeLine from "../components/Detail/TimeLine";

import {
  collection,
  query,
  limit,
  orderBy,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../utils/firebase";

const Wrapper = styled.div`
  width: 934px;
  min-height: 100vh;
  height: fit-content;
  margin: 0 auto;
  background: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.fontColor};

  @media screen and (max-width: 780px) {
    width: 100%;
  }
`;

const MyFeed = () => {
  const [myProfile, setMyProfile] = useState(null);
  const [myFeeds, setMyFeed] = useState([]);
  const [editprofilePhoto, setEditProfilePhoto] = useState();
  const [editProfileName, setEditProfileName] = useState();
  const [editProfileIntro, setEditProfileIntro] = useState();

  const handleEditphoto = (url) => {
    setEditProfilePhoto(url);
  };

  const handleEditName = (userId) => {
    setEditProfileName(userId);
  };

  const handleEditIntro = (text) => {
    setEditProfileIntro(text);
  };

  useEffect(() => {
    const userUid = auth.currentUser?.uid;
    if (userUid) {
      const getMyProfile = async (uid) => {
        const profileQuery = query(
          collection(db, "profile"),
          where("uid", "==", uid),
          limit(1)
        );
        const profileSnapshot = await getDocs(profileQuery);

        if (!profileSnapshot.empty) {
          const profileData = profileSnapshot.docs[0].data();
          setMyProfile(profileData);
        }
      };

      getMyProfile(userUid);
    }
  }, []);

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
      <MyPic
        myProfile={myProfile}
        myFeeds={myFeeds}
        editprofilePhoto={editprofilePhoto}
        setEditProfilePhoto={setEditProfilePhoto}
      />
      <MyProfile myProfile={myProfile} handleEditphoto={handleEditphoto} />
      <MyHighlight />
      <MyFeedTabBar />
      <TimeLine myFeeds={myFeeds} myProfile={myProfile} />
    </Wrapper>
  );
};

export default MyFeed;
