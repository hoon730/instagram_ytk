import React from "react";
import styled from "styled-components";
import StoryItem from "../Story/StoryItem";

const BoxArea = styled.div`
  border-bottom: 1px solid lightgray;
`;

const HighlightBox = styled.div`
  border: 1px solid blue;
  width: 100%;
  display: flex;
  padding: 20px 70px;
  gap: 50px;
`;

const storys = [
  { userId: "l", imgPath: "/images/postImgs/user1/hicover1.jpg" },
  { userId: "u", imgPath: "/images/postImgs/user1/hicover2.jpg" },
  { userId: "c", imgPath: "/images/postImgs/user1/hicover3.jpg" },
  { userId: "k", imgPath: "/images/postImgs/user1/hicover4.jpg" },
];

const NewMyHighlight = () => {
  return (
    <>
      <BoxArea>
        <HighlightBox>
          {storys.map((it, idx) => (
            <StoryItem
              key={idx}
              userId={it.userId}
              imgPath={it.imgPath}
              type={"inactive"}
            />
          ))}
        </HighlightBox>
      </BoxArea>
    </>
  );
};

export default NewMyHighlight;
