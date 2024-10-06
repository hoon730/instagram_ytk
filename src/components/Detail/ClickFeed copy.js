import React, { useRef, useState } from "react";
import styled from "styled-components";
import ProfileImg from "../Profile/ProfileImg";
import UserId from "../User/UserId";
import Button from "../Common/Button";

import { IPost } from "./TimeLine";
import { auth, db, storage } from "../../utils/firebase";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { use } from "framer-motion/client";
import {
  deleteObject,
  ref,
  getDownloadURL,
  StorageError,
  StorageErrorCode,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

const feed = [
  {
    type: "img",
    imgPath: ["images/userImgs/lualbvqvQmVWkfDU7JUKJRYdqf3/feed1.jpg"],
    content:
      "#브런치 먹으러 다녀왔어요! 분위기가 정말 좋고 커피도 맛있었어요 ☕️ #카페투어 #소확행 #힐링",
  },
  {
    type: "img",
    imgPath: [
      "images/userImgs/lualbvqvQmVWkfDU7JUKJRYdqf3/feed2.jpg",
      "images/userImgs/lualbvqvQmVWkfDU7JUKJRYdqf3/feed3.jpg",
      "images/userImgs/lualbvqvQmVWkfDU7JUKJRYdqf3/feed4.jpg",
      "images/userImgs/lualbvqvQmVWkfDU7JUKJRYdqf3/feed5.jpg",
    ],
  },
];

const BgWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 3;
`;

const Wrapper = styled.div`
  width: 52%;
  height: 74%;
  background: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.fontColor};
  border-radius: var(--border-radius-12);

  @media screen and (max-width: 1400px) {
    position: relative;
    height: 0;
    padding-top: 56.25%;

    .inner {
      width: 100%;
      height: 100%;
    }
  }

  @media screen and (max-width: 1000px) {
    .img_box {
      width: 55%;
    }
    .desc {
      width: 45%;

      .user_container {
        padding: 10px;
      }
      .comment_list {
        padding: 10px;
      }
      .writing_comment {
        padding: 10px;
      }
    }
  }
`;

const Inner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 52%;
  height: 74%;
  background: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.fontColor};
  border-radius: var(--border-radius-12);
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;

  span {
    font-weight: var(--font-bold);
  }
  & button:first-child {
    color: ${({ theme }) => theme.nonActiveBtnColor};
  }
`;

const Container = styled.div`
  display: flex;
`;

const ImgBox = styled.div`
  width: 60%;
  height: 100%;
`;

const SetContentButton = styled.label`
  color: #fff;
  cursor: pointer;
  &:hover {
    color: #1d9bf0;
    transition: color 0.3s;
  }
  svg {
    width: 24px;
  }
`;

const SetContentInputButton = styled.input`
  display: none;
`;

const Desc = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const UserContainer = styled.div`
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid var(--light-gray-color);
`;

const UserBox = styled.div`
  width: 100%;
  display: flex;
  gap: 15px;
`;

const Userinfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const UserLocation = styled.span`
  font-size: var(--font-14);
`;

const WritingComment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 15px 10px;
`;

const Prevload = styled.p``;

const EditedTextArea = styled.textarea`
  width: 100%;
  height: 50%;
  border: 2px solid var(--light-gray-color);
  border-radius: var(--border-radius-12);
  color: var(--bg-black-color);
  font-size: var(--font-16);
  resize: none;
  &::placeholder {
    color: var(--gray-color);
    opacity: 1;
    transition: opacity 0.3s;
  }
  &:focus {
    &::placeholder {
      opacity: 0;
    }
    outline: none;
    border-color: var(--sub-purple-color);
    & ~ div {
      color: var(--sub-purple-color);
    }
  }
`;

const Clickdetail = ({
  location,
  onClick,
  userName,
  post,
  photo,
  video,
  userId,
  id,
}) => {
  const bgRef = useRef();
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState(post);
  const [editedPhoto, setEditedPhoto] = useState(null);

  const onChange = (e) => {
    setEditedPost(e.target.value);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const onClickSetContent = (e) => {
    const { files } = e.target;
    if (files && files.length === 1) setEditedPhoto(files[0]);
  };

  const user = auth.currentUser;
  const onDelete = async () => {
    const ok = window.confirm("정말로 지금 게시물을 삭제하시겠습니까?");
    if (!ok || user.uid !== userId) return;
    try {
      await deleteDoc(doc(db, `content`, id));
      if (photo) {
        const photoRef = ref(storage, `contents/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onUpDate = async () => {
    try {
      if (user.uid !== userId) return;

      const postDoc = await getDoc(doc, "contents", id);

      if (!postDoc.exists()) throw new Error("게시글이 존재하지 않습니다");
      const postData = postDoc.data();

      if (postData) {
        if (postData.photo) postData.fileType = "image";
        if (postData.video) postData.fileType = "video";
      }

      const exsitingfileType = post.Data.fileType || null;

      if (editedPhoto) {
        const newFileType = editedPhoto.type.startsWidth("image/")
          ? "image"
          : "video";

        if (exsitingfileType && exsitingfileType !== newFileType) {
          alert("동일한 컨텐츠만 업로드가 가능합니다");
          return;
        }

        const locationRef = ref(storage, `contents/${user.uid}/${id}`);
        const uploadTask = uploadBytesResumable(locationRef, editedPhoto);
        if (editedPhoto.size >= 5 * 1024 * 1024) {
          uploadTask.cancel();
          throw new StorageError(
            StorageErrorCode.CANCELED,
            "파일의 크기가 5MB를 초과하였습니다"
          );
        }
        const result = await uploadBytes(locationRef, editedPhoto);
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc(db, "contents", id), {
          post: editedPost,
          photo: newFileType === "image" ? url : "",
          video: newFileType === "video" ? url : "",
          fileType: newFileType,
        });
      } else {
        await updateDoc(doc(db, "contents", id), { post: editedPost });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <BgWrapper
      ref={bgRef}
      onClick={(e) => {
        console.log(bgRef.current);
        if (e.target === bgRef.current) {
          onClick();
        }
      }}
    >
      <Wrapper>
        <Inner className="inner">
          <Title>
            <Button text={"취소"} onClick={handleCancel} />
            <span>편집 하기</span>
            <Button text={"완료"} onClick={handleEdit} />
          </Title>
          <Container>
            <ImgBox className="img_box">
              {isEditing ? (
                <SetContentButton htmlFor="edit-content">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M1 5.25A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25v9.5A2.25 2.25 0 0 1 16.75 17H3.25A2.25 2.25 0 0 1 1 14.75v-9.5Zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75v-2.69l-2.22-2.219a.75.75 0 0 0-1.06 0l-1.91 1.909.47.47a.75.75 0 1 1-1.06 1.06L6.53 8.091a.75.75 0 0 0-1.06 0l-2.97 2.97ZM12 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
                    />
                  </svg>
                  <SetContentInputButton
                    id="edit-content"
                    type="file"
                    accept="video/mpk, video/*, image/*"
                    onChange={onClickSetContent}
                  />
                </SetContentButton>
              ) : null}
            </ImgBox>
            <Desc className="desc">
              <UserContainer className="user_container">
                <UserBox>
                  <ProfileImg
                    size={"40"}
                    url={"/images/userImgs/user123456/profile-photo.jpg"}
                  />
                  <Userinfo>
                    <UserId type={"feed"} userNickname={"bbok"} more={true} />
                    <UserLocation>{userName}</UserLocation>
                  </Userinfo>
                </UserBox>
              </UserContainer>
              <WritingComment className="writing_comment">
                {isEditing ? (
                  <EditedTextArea
                    value={editedPost}
                    placeholder={post}
                    onChange={onChange}
                  />
                ) : (
                  <Prevload>{post}</Prevload>
                )}
              </WritingComment>
            </Desc>
          </Container>
        </Inner>
      </Wrapper>
    </BgWrapper>
  );
};

export default Clickdetail;
