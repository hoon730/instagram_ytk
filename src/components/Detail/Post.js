import React, { useState } from "react";
import styled from "styled-components";
import { IPost } from "./TimeLine";
import { auth, db, storage } from "../../utils/firebase";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import {
  deleteObject,
  ref,
  getDownloadURL,
  StorageError,
  StorageErrorCode,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

import ClickFeed from "./ClickFeed";

const Wrapper = styled.div`
  width: 305px;
  height: 305px;
  border-radius: var(--border-radius-8);
  overflow: hidden;
  cursor: pointer;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Post = ({ }) => {
  const [isClicked, setIsClicked] = useState(false);

  const showFeed = () => {
    setIsClicked((current) => !current);
  };

  return (
    <>
      <Wrapper onClick={showFeed}>
       
      </Wrapper>
      {isClicked ? (
        <ClickFeed
          onClick={showFeed}
         
        />
      ) : null}
    </>
  );
};

export default Post;
