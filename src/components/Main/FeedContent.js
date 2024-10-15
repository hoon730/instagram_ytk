import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import TabBarBtn from "../Common/TabBarBtn";
import { FaRegStar } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import FeedItem from "./FeedItem";
import { db } from "../../utils/firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import WelcomFeed from "./WelcomFeed";
import { StateContext } from "../../App";

const Wrapper = styled.div``;

const FeedArea = styled.div`
  width: 680px;
  margin: 0 auto;

  @media screen and (max-width: 770px) {
    width: 430px;
  }
  @media screen and (max-width: 430px) {
    width: 100%;
  }
`;

const FeedTabBar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${({ theme }) => theme.borderColor};
`;

const FeedTabBtn = styled.div`
  display: flex;
  height: 60px;
  @media screen and (max-width: 630px) {
    height: 50px;
  }
`;

const ActiveBorderArea = styled.div`
  width: 100%;
  height: 3px;
`;

const ActiveBorder = styled.div`
  width: 50%;
  height: 100%;
  background: ${({ theme }) => theme.fontColor};
  transition: transform 0.3s;
  ${({ $tabChange }) =>
    $tabChange === "recommend"
      ? `transform: translateX(0);`
      : `transform: translateX(100%);`}
`;

const LoadingScreen = styled.div`
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.bgColor};
`;

const FeedContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [recommend, setRecommend] = useState(true);
  const [follow, setFollow] = useState(false);
  const [$tabChange, setTabChange] = useState("recommend");
  const [postsWithProfiles, setPostsWithProfiles] = useState([]);
  const { myProfile } = useContext(StateContext);
  const { allProfile } = useContext(StateContext);

  const recommendActive = () => {
    setIsLoading(true);
    setRecommend(true);
    setFollow(false);
    setTabChange("recommend");
  };
  const followActive = () => {
    setIsLoading(true);
    setRecommend(false);
    setFollow(true);
    setTabChange("follow");
  };

  useEffect(() => {
    let postsUnsubscribe = null;

    if (myProfile && myProfile.following) {
      const getPosts = () => {
        const postsQuery = query(
          collection(db, "feed"),
          where("type", "!=", null),
          orderBy("createdAt", "desc")
        );

        postsUnsubscribe = onSnapshot(postsQuery, async (snapshot) => {
          const postDocs = snapshot.docs;

          const posts = await Promise.all(
            postDocs
              .filter((doc) =>
                doc.data().uid !== myProfile.uid && recommend
                  ? !myProfile.following.includes(doc.data().uid)
                  : myProfile.following.includes(doc.data().uid)
              )
              .map(async (doc) => {
                const postData = doc.data();

                const profileData = allProfile.find(
                  (it) => it.uid === postData.uid
                );
                return {
                  id: doc.id,
                  ...postData,
                  profile: profileData,
                };
              })
          );

          setPostsWithProfiles(posts);

          setIsLoading(false);
        });
      };

      getPosts();
    }
    return () => {
      if (postsUnsubscribe) {
        postsUnsubscribe();
      }
    };
  }, [myProfile, recommend]);

  return (
    <Wrapper>
      <FeedArea>
        <FeedTabBar>
          <ActiveBorderArea>
            <ActiveBorder $tabChange={$tabChange} />
          </ActiveBorderArea>
          <FeedTabBtn>
            <TabBarBtn
              onClick={recommendActive}
              width={340}
              iconCode={<FaRegStar />}
              text={"추천 게시물"}
              isActive={recommend}
            />
            <TabBarBtn
              onClick={followActive}
              width={340}
              iconCode={<FiUser />}
              text={"팔로우"}
              isActive={follow}
            />
          </FeedTabBtn>
        </FeedTabBar>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <>
            {postsWithProfiles && postsWithProfiles.length > 0 ? (
              postsWithProfiles.map((post) => (
                <FeedItem key={post.id} feedDetail={post} />
              ))
            ) : recommend ? (
              <WelcomFeed recommend={true} />
            ) : (
              <WelcomFeed recommend={false} />
            )}
          </>
        )}
      </FeedArea>
    </Wrapper>
  );
};

export default FeedContent;
