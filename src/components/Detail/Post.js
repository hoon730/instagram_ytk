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
  width: 100%;
  height: 100%;
  border-radius: var(--border-radius-8);
  overflow: hidden;
  cursor: pointer;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;
const Video = styled.video`
  width: 100%;
  height: 100%;
`;

const Post = ({ userName, createdAt, post, photo, video, userId, id }) => {
  // const [isEditing, setIsEditing] = useState(false);
  // const [editedPost, setEditedPost] = useState(post);
  // const [editedPhoto, setEditedPhoto] = useState(null);

  // const onChange = (e) => {
  //   setEditedPost(e.target.value);
  // };

  // const handleEdit = () => {
  //   setIsEditing(true);
  // };

  // const handleCancel = () => {
  //   setIsEditing(false);
  // };

  // const onClickSetContent = (e) => {
  //   const { files } = e.target;
  //   if (files && files.length === 1) setEditedPhoto(files[0]);
  // };

  // const user = auth.currentUser;
  // const onDelete = async () => {
  //   const ok = window.confirm("정말로 지금 게시물을 삭제하시겠습니까?");
  //   if (!ok || user.uid !== userId) return;
  //   try {
  //     await deleteDoc(doc(db, `content`, id));
  //     if (photo) {
  //       const photoRef = ref(storage, `contents/${user.uid}/${id}`);
  //       await deleteObject(photoRef);
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  // const onUpDate = async () => {
  //   try {
  //     if (user.uid !== userId) return;

  //     const postDoc = await getDoc(doc, "contents", id);

  //     if (!postDoc.exists()) throw new Error("게시글이 존재하지 않습니다");
  //     const postData = postDoc.data();

  //     if (postData) {
  //       if (postData.photo) postData.fileType = "image";
  //       if (postData.video) postData.fileType = "video";
  //     }

  //     const exsitingfileType = post.Data.fileType || null;

  //     if (editedPhoto) {
  //       const newFileType = editedPhoto.type.startsWidth("image/")
  //         ? "image"
  //         : "video";

  //       if (exsitingfileType && exsitingfileType !== newFileType) {
  //         alert("동일한 컨텐츠만 업로드가 가능합니다");
  //         return;
  //       }

  //       const locationRef = ref(storage, `contents/${user.uid}/${id}`);
  //       const uploadTask = uploadBytesResumable(locationRef, editedPhoto);
  //       if (editedPhoto.size >= 5 * 1024 * 1024) {
  //         uploadTask.cancel();
  //         throw new StorageError(
  //           StorageErrorCode.CANCELED,
  //           "파일의 크기가 5MB를 초과하였습니다"
  //         );
  //       }
  //       const result = await uploadBytes(locationRef, editedPhoto);
  //       const url = await getDownloadURL(result.ref);
  //       await updateDoc(doc(db, "contents", id), {
  //         post: editedPost,
  //         photo: newFileType === "image" ? url : "",
  //         video: newFileType === "video" ? url : "",
  //         fileType: newFileType,
  //       });
  //     } else {
  //       await updateDoc(doc(db, "contents", id), { post: editedPost });
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   } finally {
  //     setIsEditing(false);
  //   }
  // };

  const [isClicked, setIsClicked] = useState(false);

  const showFeed = () => {
    setIsClicked((current) => !current);
  };

  return (
    <>
      <Wrapper onClick={showFeed}>
        {photo ? <Img src={photo} /> : null}
        {video ? <Video src={video} /> : null}
      </Wrapper>
      {isClicked ? (
        <ClickFeed
          onClick={showFeed}
          {...{ userName, createdAt, post, photo, video, userId, id }}
        />
      ) : null}
    </>
  );
};

export default Post;
