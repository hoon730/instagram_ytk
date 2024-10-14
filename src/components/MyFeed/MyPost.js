import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { auth, db } from "../../utils/firebase";
import {
  collection,
  query,
  limit,
  onSnapshot,
  orderBy,
  where,
  getDocs,
} from "firebase/firestore";
import TimeLine from "../Detail/TimeLine";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  margin-bottom: 5px;
  background: ${({ theme }) => theme.bgColor};

  @media screen and (max-width: 1000px) {
    width: 100%;
  }

  @media screen and (max-width: 430px) {
    width: 100%;
  }
`;

const MyPost = () => {
  const [isClicked, setIsClicked] = useState(false);

  const onClick = () => {
    setIsClicked((current) => !current);
  };

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

  return (
    <Wrapper>
      <TimeLine />
    </Wrapper>
  );
};

export default MyPost;
