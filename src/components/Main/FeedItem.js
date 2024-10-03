import React, { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import ProfileImg from "../Profile/ProfileImg";
import UserId from "../User/UserId";
import Slide from "./Slide";
import FeedIcon from "./FeedIcon";

// 데이터
import Data from "../../data.json";
const user = Data.user;
const profile = Data.profile;
const feed = Data.feed;
const userId = "lualbvqvQmVWkfDU7JUKJRYdqf3";

const Wrapper = styled.div`
  border: 1px solid var(--light-gray-color);
  padding-bottom: 50px;
`;

const ProfileSection = styled.div`
  margin: 0 36px;
  height: 114px;
  display: flex;
  align-items: center;
  gap: 18px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const UserName = styled.p`
  font-size: var(--font-14);
  color: var(--gray-color);
`;

const PhotoSection = styled.div`
  width: 652px;
  height: 815px;
  margin: 0 auto;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
`;

const FeedDescArea = styled.div`
  margin: 0 36px;
`;

const FeedDesc = styled.div`
  margin-top: 22px;
`;

// const FeedText = styled.textarea`
//   width: 100%;
//   height: auto;
//   padding: 5px 0%;
//   border: none;
//   resize: none;
//   overflow: hidden;
//   border: 1px solid #f00;
// `;

const FeedText = styled.div`
  border: 1px solid #f00;
  font-size: var(--font-16);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-wrap: break-word;
  position: relative;
`;

const MoreText = styled.span`
  margin-left: 5px;
  color: var(--sub-purple-color);
  cursor: pointer;
`;

const MoreSpan = styled.span`
  border: 1px solid #f00;
  background: #fff;
  position: absolute;
  bottom: 0;
  right: 0;
`;

const FeedItem = () => {
  const myProfile = profile.find((it) => it.userId === userId);
  const feedProfile = profile.find((it) => it.userId === feed[0].userId);
  const feedUser = user.find((it) => it.userId === feed[0].userId);
  const feedDetail = feed[0].feedDetail[1];

  // const [textVal, setTextVal] = useState(feedDetail.content);
  // const textRef = useRef();
  // const handleResizeHeight = useCallback((e) => {
  //   setTextVal(e.target.value);
  //   textRef.current.style.height = textRef.current.scrollHeight + "px";
  // }, []);

  // useEffect(() => {
  //   const lines = textRef.current.value.split("\n");
  //   if (lines.length > 2) {
  //     setTextVal(`${lines.slice(0, 2).join("\n")}...`);
  //   }
  // }, []);

  //const lines = feedDetail.content.split("\n").slice(0, 2);

  const [more, setMore] = useState(false);
  //const [lines, setLines] = useState(feedDetail.content.split("\n"));
  // const [lines, setLines] = useState(
  //   "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).".split(
  //     "\n"
  //   )
  // );
  const [chunks, setChunks] = useState([]);

  useEffect(() => {
    const text =
      "It is a long established fact that a reader will be distracted by the readable content of a page when \nlooking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).";

    const measureTextWidth = (text) => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      context.font = "16px Noto Sans KR"; // 글꼴과 크기를 설정
      return context.measureText(text).width;
    };

    const getTextChunks = (text, maxWidth) => {
      let currentChunk = "";
      let currentWidth = 0;
      const result = [];

      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const charWidth = measureTextWidth(char);

        if (currentWidth + charWidth > maxWidth) {
          result.push(currentChunk);
          currentChunk = char;
          currentWidth = charWidth;
        } else {
          currentChunk += char;
          currentWidth += charWidth;
        }
      }

      if (currentChunk) {
        result.push(currentChunk); // 남아있는 텍스트를 배열에 추가
      }

      return result;
    };

    const chunksArray = getTextChunks(text, 600); // 100px 너비로 텍스트 자르기
    setChunks(chunksArray);
  }, []);

  // const textRef = useRef();

  // useEffect(() => {
  //   if (textRef.current.scrollHeight > 48 || lines.length > 2) {
  //     setLines(lines.slice(0, 2));
  //     setMore(true);
  //   }
  // }, []);
  // const showMore = () => {
  //   setMore(false);
  // };

  return (
    <Wrapper>
      <ProfileSection>
        <ProfileImg
          type={"active"}
          size={"62"}
          url={feedProfile.profilePhoto}
        />
        <UserInfo>
          <UserId
            type={"feed"}
            userNickname={feedUser.userNickname}
            check={feedProfile.badge ? "active" : ""}
            createDate={feedDetail.createDate}
            btn={"more"}
          />
          <UserName>{feedProfile.userName}</UserName>
        </UserInfo>
      </ProfileSection>
      <PhotoSection>
        <Slide imgPath={feedDetail.imgPath} />
      </PhotoSection>
      <FeedDescArea>
        <FeedIcon user={user} feedDetail={feedDetail} myProfile={myProfile} />
        <FeedDesc>
          <UserInfo>
            <UserId
              type={"feed"}
              userNickname={feedUser.userNickname}
              check={feedProfile.badge ? "active" : ""}
            />
          </UserInfo>
          {/* <FeedText
            ref={textRef}
            value={textVal}
            onChange={handleResizeHeight}
            readOnly
          ></FeedText> */}
          {/* <FeedText ref={textRef}>
            {lines.map((it, idx) => (
              <span key={idx}>
                {it}
                {idx !== lines.length - 1 ? <br /> : null}
              </span>
            ))}
            {more ? (
              <MoreSpan>
                ...<MoreText onClick={showMore}>더 보기</MoreText>
              </MoreSpan>
            ) : null}
          </FeedText> */}
          <div>
            {chunks.map((chunk, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                {chunk}
              </div>
            ))}
          </div>
        </FeedDesc>
      </FeedDescArea>
    </Wrapper>
  );
};

export default FeedItem;
