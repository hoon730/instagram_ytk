import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../utils/firebase";
import MyPostItem from "../components/MyFeed/MyPostItem";
import { TbMovieOff } from "react-icons/tb";

const Wrapper = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.bgColor};
`;

const ReelsArea = styled.div`
  width: 700px;
  margin: 80px auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

const NoResult = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.borderColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: var(--font-20);
  color: ${({ theme }) => theme.nonActiveBtnColor};
`;

const Reels = () => {
  const [reelsFeed, setReelsFeed] = useState([]);
  useEffect(() => {
    const fetchReels = async () => {
      try {
        const r = await query(
          collection(db, "feed"),
          where("type", "==", "reels")
        );
        const querySnapshot = await getDocs(r);
        let reels = [];

        querySnapshot.docs.map((doc) => {
          const data = doc.data();
          if (data) {
            reels.push(data);
          }
        });

        setReelsFeed(reels);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReels();
  }, []);

  return (
    <Wrapper>
      <ReelsArea>
        {reelsFeed.map((it, index) => (
          <MyPostItem key={index} page={"reels"} url={it.imgPath} />
        ))}
        {reelsFeed.length % 2 === 1 ? (
          <NoResult>
            <TbMovieOff size={80} />
            검색 결과가 없습니다.
          </NoResult>
        ) : null}
      </ReelsArea>
    </Wrapper>
  );
};

export default Reels;
