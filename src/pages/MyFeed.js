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
  onSnapshot,
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
  const [postsWithProfiles, setPostsWithProfiles] = useState([]);

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
    let postsUnsubscribe = null;

    if (myProfile && myProfile.following) {
      const getPosts = (following) => {
        const postQuery = query(
          collection(db, "feed"),
          where("uid", "in", following),
          where("type", "!=", null),
          orderBy("createdAt", "desc"),
          limit(5)
        );

        postsUnsubscribe = onSnapshot(postQuery, async (snapshot) => {
          const postDocs = snapshot.docs;

          const posts = await Promise.all(
            postDocs.map(async (doc) => {
              const postData = doc.data();

              const profileQuery = query(
                collection(db, "profile"),
                where("uid", "==", postData.uid),
                limit(1)
              );
              const profileSnapshot = await getDocs(profileQuery);

              let profileData = {};
              if (!profileSnapshot.empty) {
                profileData = profileSnapshot.docs[0].data();
              }

              return {
                id: doc.id,
                ...postData,
                profile: profileData,
              };
            })
          );
          setPostsWithProfiles(posts);
        });
      };
      getPosts(myProfile.following);
    }

    return () => {
      if (postsUnsubscribe) {
        postsUnsubscribe();
      }
    };
  }, [myProfile]);

  console.log(myProfile);

  return (
    <Wrapper>
      <MyPic />
      <MyProfile />
      <MyHighlight />
      <MyFeedTabBar />
      <TimeLine />
    </Wrapper>
  );
};

export default MyFeed;
