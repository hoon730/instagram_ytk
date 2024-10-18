import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  margin: 5px 0 22px;
`;

const EllipsisText = styled.div`
  font-size: var(--font-14);
  color: ${({ theme }) => theme.fontColor};

  ${({ $showMore }) =>
    $showMore
      ? ""
      : `display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-wrap: break-word;`}
  p {
    line-height: 1.6;
  }

  @media screen and (max-width: 1024px) {
    font-size: var(--font-12);
  }
`;

const OriginalText = styled.div`
  font-size: var(--font-16);
  word-wrap: break-word;
  overflow: hidden;
  height: 0;
  p {
    line-height: 1.6;
  }

  @media screen and (max-width: 1024px) {
    font-size: var(--font-12);
  }
`;

const MoreText = styled.span`
  margin: 30px 10px 0;
  color: ${({ theme }) => theme.subColor};
  float: right;
  shape-outside: border-box;
  cursor: pointer;
  @media screen and (max-width: 1024px) {
    font-size: var(--font-12);
    margin: 25px 10px 0;
  }
`;

const HashTag = styled.span`
  color: ${({ theme }) => theme.subColor};
  cursor: pointer;
  @media screen and (max-width: 1024px) {
    font-size: var(--font-12);
  }
`;

const FeedText = ({ feedDetail, myFeed, post, all }) => {
  const lines = feedDetail
    ? feedDetail.content.split("\n")
    : myFeed
    ? myFeed.content.split("\n")
    : post.content.split("\n");

  const [isEllipsed, setIsEllipsed] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const commentRef = useRef(null);
  const originalCommentRef = useRef(null);

  useEffect(() => {
    if (all) {
      setShowMore(true);
    }

    const handleMoreButton = () => {
      if (!originalCommentRef.current || !commentRef.current) return;
      const { clientHeight: originalHeight } = originalCommentRef.current;
      const { clientHeight: commentHeight } = commentRef.current;
      setIsEllipsed(originalHeight !== commentHeight);
    };

    handleMoreButton();
    window.addEventListener("resize", handleMoreButton);
    return () => window.addEventListener("resize", handleMoreButton);
  }, []);

  const moreView = () => {
    setShowMore(true);
    setIsEllipsed(false);
  };

  return (
    <Wrapper className="feed_wrapper">
      <EllipsisText $showMore={showMore}>
        {!all && isEllipsed && <MoreText onClick={moreView}>더보기</MoreText>}
        <p ref={commentRef}>
          {lines.map((it, idx) => (
            <React.Fragment key={idx}>
              {it
                .split(" ")
                .map((word, idx) =>
                  word.startsWith("#") ? (
                    <HashTag key={idx}>{word} </HashTag>
                  ) : (
                    <React.Fragment key={idx}>{word} </React.Fragment>
                  )
                )}
              <br />
            </React.Fragment>
          ))}
        </p>
      </EllipsisText>
      <OriginalText>
        <p ref={originalCommentRef}>
          {lines.map((it, idx) => (
            <React.Fragment key={idx}>
              {it
                .split(" ")
                .map((word, idx) =>
                  word.startsWith("#") ? (
                    <HashTag key={idx}>{word}</HashTag>
                  ) : (
                    <React.Fragment key={idx}>{word}</React.Fragment>
                  )
                )}
              <br />
            </React.Fragment>
          ))}
        </p>
      </OriginalText>
    </Wrapper>
  );
};

export default FeedText;
