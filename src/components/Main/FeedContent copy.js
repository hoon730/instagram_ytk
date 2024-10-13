import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TabBarBtn from "../Common/TabBarBtn";
import { FaRegStar } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import FeedItem from "./FeedItem";
import Loading from "../Common/Loading";
import { auth, db } from "../../utils/firebase";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
  Unsubscribe,
  getDocs,
} from "firebase/firestore";
import ClickFeed from "../Detail/ClickFeed";
import WelcomFeed from "./WelcomFeed";

const Wrapper = styled.div``;

const FeedArea = styled.div`
  width: 680px;
  margin: 0 auto;

  @media screen and (max-width: 1024px) {
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

const FeedContent = () => {
  const [recommend, setRecommend] = useState(true);
  const [follow, setFollow] = useState(false);
  const [$tabChange, setTabChange] = useState("recommend");
  const [myProfile, setMyProfile] = useState(null);
  const [postsWithProfiles, setPostsWithProfiles] = useState([]);

  const recommendActive = () => {
    setRecommend(true);
    setFollow(false);
    setTabChange("recommend");
  };
  const followActive = () => {
    setRecommend(false);
    setFollow(true);
    setTabChange("follow");
  };

  // 처음 마운트될 때 한 번만 프로필 정보를 가져오는 useEffect
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

  // myProfile이 존재할 때 실시간으로 posts를 구독하는 useEffect
  useEffect(() => {
    let postsUnsubscribe = null;

    if (myProfile && myProfile.following) {
      const getPosts = () => {
        const postsQuery = query(
          collection(db, "feed"),
          where("type", "!=", null),
          orderBy("createdAt", "desc")
        );

        // 실시간 구독
        postsUnsubscribe = onSnapshot(postsQuery, async (snapshot) => {
          const postDocs = snapshot.docs;

          // posts 배열에 포함된 uid와 profile의 uid를 맞춰 profile 정보도 가져오기
          const posts = await Promise.all(
            postDocs
              .filter((doc) =>
                doc.data().uid !== myProfile.uid && recommend
                  ? !myProfile.following.includes(doc.data().uid)
                  : myProfile.following.includes(doc.data().uid)
              )
              .map(async (doc) => {
                const postData = doc.data();

                // 각 post의 uid에 맞는 profile 가져오기
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
                  profile: profileData, // profile 데이터를 post에 추가
                };
              })
          );

          setPostsWithProfiles(posts); // 프로필과 결합된 posts 배열 설정
        });
      };

      getPosts();
    }
    // 컴포넌트 언마운트 시 구독 해제
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
        {postsWithProfiles && postsWithProfiles.length > 0 ? (
          postsWithProfiles.map((post) => (
            <FeedItem key={post.id} myProfile={myProfile} feedDetail={post} />
          ))
        ) : recommend ? (
          <WelcomFeed recommend={true} />
        ) : (
          <WelcomFeed recommend={false} />
        )}
      </FeedArea>
    </Wrapper>
  );
};

export default FeedContent;
