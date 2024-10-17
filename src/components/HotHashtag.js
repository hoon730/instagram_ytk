import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import styled from "styled-components";
import { db } from "../utils/firebase";
import HotHashtagItem from "./HotHashtagItem";
import Footer from "./Common/Footer/Footer";

const Wrapper = styled.div`
  width: 380px;
  height: 100%;
  padding: 36px;
  text-align: left;
  border-left: 1px solid ${({ theme }) => theme.borderColor};
  position: fixed;
  right: 0;
  @media screen and (max-width: 1350px) {
    display: none;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 22px;
  color: ${({ theme }) => theme.fontColor};
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const HotHashtag = () => {
  const [hotTagInfo, setHotTagInfo] = useState([]);

  useEffect(() => {
    const fetchHashtags = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "feed"));
        let allHashtags = [];

        querySnapshot.docs.map((doc) => {
          const data = doc.data();
          if (data.hashtag) {
            allHashtags.push(...data.hashtag);
          }
        });

        const hashtagCountFun = allHashtags.reduce((accu, curr) => {
          accu[curr] = (accu[curr] || 0) + 1;
          return accu;
        }, {});

        const entries = Object.entries(hashtagCountFun);

        const sortedEntries = entries.sort((a, b) => b[1] - a[1]).slice(0, 6);

        setHotTagInfo(sortedEntries);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHashtags();
  }, []);

  return (
    <Wrapper>
      <Title>🔥지금 뜨는 #해시태그</Title>
      <ItemList>
        {hotTagInfo.map(([key, value], idx) => (
          <HotHashtagItem
            key={`hotHashtag${idx}`}
            keyword={key}
            postcount={`게시물 ${value}만개`}
          />
        ))}
      </ItemList>
      <Footer direction={"column"} />
    </Wrapper>
  );
};

export default HotHashtag;
