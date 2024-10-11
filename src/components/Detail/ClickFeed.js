import React, { useRef, useState, useEffect } from "react";
import { getFormattedDate } from "../../utils/utils";
import styled from "styled-components";
import Slide from "../Main/Slide";
import ProfileImg from "../Profile/ProfileImg";
import UserId from "../User/UserId";
import CommentItem from "./CommentItem";
import Button from "../Common/Button";

import { IoIosCloseCircle } from "react-icons/io";
import { IoHeartOutline } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa6";
import { IoPaperPlaneOutline } from "react-icons/io5";

import { IPost } from "./TimeLine";
import { auth, db, storage } from "../../utils/firebase";
import {
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  collection,
  limit,
  query,
  where,
  getDocs,
} from "firebase/firestore";
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

import Data from "../../data.json";
import FeedText from "../Main/FeedText";
const user = Data.user;
const profile = Data.profile;

const BgWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 3;
`;

const CloseBtn = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 4;

  svg {
    font-size: 30px;
    color: var(--bg-white-color);
  }
`;

const Wrapper = styled.div`
  ${({ isEditing }) =>
    isEditing
      ? `width: 52%;
  height: 74%;`
      : `width: 80%;
  height: 93%;`}
  border-radius: var(--border-radius-12);
  transition: all 0.3s;

  @media screen and (max-width: 1400px) {
    position: relative;
    height: 0;
    padding-top: 56.25%;

    .inner {
      width: 100%;
      height: ${({ isEditing }) => (isEditing ? "auto" : "100%")};
    }
  }

  @media screen and (max-width: 1000px) {
    .slider {
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
  ${({ isEditing }) =>
    isEditing
      ? `width: 52%;
  height: 74%;`
      : `width: 80%;
  height: 93%;`}
  background: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.fontColor};
  border-radius: var(--border-radius-12);
  transition: all 0.3s;
`;

const Slider = styled.div`
  width: 60%;
  height: 100%;
  position: relative;
  border-radius: var(--border-radius-12) 0 0 var(--border-radius-12);
  overflow: hidden;
`;

const Desc = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const UserContainer = styled.div`
  width: 100%;
  padding: 20px;
  border-bottom: ${({ isEditing }) =>
    isEditing ? "none" : `1px solid ${({ theme }) => theme.borderColor}`};
`;

const UserBox = styled.div`
  width: 100%;
  display: flex;
  gap: 15px;
  padding-bottom: ${({ isEditing }) => (isEditing ? "20px" : "5px")};
`;

const Userinfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Location = styled.span`
  font-size: var(--font-14);
`;

const UserContents = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 15px;
`;

const Content = styled.span`
  margin-left: ${({ size }) => (size ? `${size}px` : 0)};
  font-size: var(--font-14);
`;

const Date = styled.span`
  display: flex;
  align-items: flex-end;
  font-size: var(--font-12);
  color: var(--gray-color);
`;

const CommentList = styled.div`
  padding: 20px;
`;

const WritingComment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 15px 20px;
  border-top: 1px solid var(--light-gray-color);
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Notification = styled.div`
  display: flex;
  align-items: center;
  font-size: var(--font-14);
  gap: 8px;

  svg {
    font-size: var(--font-20);
  }
`;
const IconBtns = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  cursor: pointer;

  svg {
    font-size: var(--font-16);
  }
`;

const StyledInput = styled.input`
  width: 100%;
  height: 35px;
  background: var(--light-gray-color);
  border-radius: var(--border-radius-8);
  padding: 0 20px;

  &::placeholder {
    color: var(--gray-color);
    font-weight: var(--font-regular);
  }
`;

const Form = styled.form``;

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

const Contents = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const SetContentButton = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  cursor: pointer;
`;

const Icon = styled.img`
  width: 100%;
  height: 100%;
`;

const SetContentInputButton = styled.input`
  display: none;
`;

const EditedTextArea = styled.textarea`
  width: 100%;
  height: 100%;
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

const ClickFeed = ({ myProfile, feedDetail, onClick }) => {
  const commentRef = useRef();
  const bgRef = useRef();
  const [comment, setComment] = useState("");
  const [followingUser, setFollowingUser] = useState("");

  const followResult = myProfile.following.find((it) => it === feedDetail.uid);
  const likeFollowing = feedDetail.like.find((it) =>
    myProfile.following.includes(it)
  );

  useEffect(() => {
    const likeFollowing = feedDetail.like.find((it) =>
      myProfile.following.includes(it)
    );

    const getFollowingProfile = async (uid) => {
      const profileQuery = query(
        collection(db, "profile"),
        where("uid", "==", uid),
        limit(1)
      );
      const profileSnapshot = await getDocs(profileQuery);

      if (!profileSnapshot.empty) {
        const profileData = profileSnapshot.docs[0].data();
        setFollowingUser(profileData);
      }
    };

    getFollowingProfile(likeFollowing);
  }, [feedDetail]);

  const hideFeed = () => {
    onClick();
  };

  const onFocus = () => {
    commentRef.current.focus();
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState(feedDetail.content);
  const [editedPhoto, setEditedPhoto] = useState(null);

  const onChange = (e) => {
    setEditedPost(e.target.value);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  // const onClickSetContent = (e) => {
  //   const { files } = e.target;
  //   if (files && files.length === 1) setEditedPhoto(files[0]);
  // };

  // const user = auth.currentUser;
  // const onDelete = async () => {
  //   const ok = window.confirm("정말로 지금 게시물을 삭제하시겠습니까?");
  //   if (!ok || user.uid !== feedDetail.u) return;
  //   try {
  //     await deleteDoc(doc(db, `contents`, id));
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
  //     if (user?.uid !== userId) return;

  //     const postDoc = await getDoc(doc(db, "contents", id));

  //     if (!postDoc.exists()) throw new Error("게시글이 존재하지 않습니다");
  //     const postData = postDoc.data();

  //     if (postData) {
  //       if (postData.photo) postData.fileType = "image";
  //       if (postData.video) postData.fileType = "video";
  //     }

  //     const exsitingfileType = postData?.fileType || null;

  //     if (editedPhoto) {
  //       const newFileType = editedPhoto.type.startsWith("image/")
  //         ? "image"
  //         : "video";

  //       if (exsitingfileType && exsitingfileType !== newFileType) {
  //         alert("동일한 컨텐츠만 업로드가 가능합니다.");
  //         return;
  //       }

  //       const locationRef = ref(storage, `contents/${user.uid}/${id}`);
  //       const uploadTask = uploadBytesResumable(locationRef, editedPhoto);
  //       if (editedPhoto.size >= 5 * 1024 * 1024) {
  //         uploadTask.cancel();
  //         throw new StorageError(
  //           StorageErrorCode.CANCELED,
  //           "파일의 크기가 5MB를 초과하였습니다."
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

  return (
    <>
      <CloseBtn onClick={hideFeed}>
        <IoIosCloseCircle />
      </CloseBtn>
      <BgWrapper
        ref={bgRef}
        onClick={(e) => {
          if (e.target === bgRef.current) {
            hideFeed();
          }
        }}
      >
        <Wrapper isEditing={isEditing}>
          <Inner className="inner" isEditing={isEditing}>
            {isEditing ? (
              <Title>
                <Button text={"취소"} onClick={handleCancel} />
                <span>편집 하기</span>
                <Button text={"완료"} />
                {/* <Button text={"완료"} onClick={onUpDate} /> */}
              </Title>
            ) : null}
            <Contents isEditing={isEditing}>
              <Slider className="slider">
                {isEditing ? (
                  <SetContentButton htmlFor="edit-content">
                    <Icon src="/images/newPostIcon.svg" />
                    <SetContentInputButton
                      id="edit-content"
                      type="file"
                      accept="video/mpk, video/*, image/*"
                      // onChange={onClickSetContent}
                    />
                  </SetContentButton>
                ) : (
                  <>
                    {feedDetail.type === "reels" ? (
                      <video
                        autoPlay
                        muted
                        loop
                        src={""}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <Slide imgPath={feedDetail.imgPath} onClick={onClick} />
                    )}
                  </>
                )}
              </Slider>
              <Desc className="desc">
                <Container>
                  <UserContainer
                    className="user_container"
                    isEditing={isEditing}
                  >
                    <UserBox isEditing={isEditing}>
                      <ProfileImg
                        type={"active"}
                        size={"40"}
                        url={feedDetail.profile.profilePhoto}
                        feedDetail={feedDetail}
                        myProfile={myProfile}
                      />
                      <Userinfo>
                        <UserId
                          type={"feed"}
                          userNickname={feedDetail.profile.userId}
                          check={feedDetail.profile.badge ? "active" : ""}
                          btn={"more"}
                          follwed={followResult ? "" : "팔로우"}
                          // onClick={onDelete}
                          setIsEditing={setIsEditing}
                          feedDetail={feedDetail}
                          myProfile={myProfile}
                        />
                        <Location>{feedDetail.location}</Location>
                      </Userinfo>
                    </UserBox>
                    <UserContents>
                      {isEditing ? (
                        <EditedTextArea
                          value={editedPost}
                          placeholder={feedDetail.content}
                          onChange={onChange}
                        />
                      ) : (
                        <>
                          <FeedText feedDetail={feedDetail} />
                        </>
                      )}
                    </UserContents>
                  </UserContainer>
                  {isEditing ? null : (
                    <CommentList className="comment_list">
                      <CommentItem
                        onClick={onFocus}
                        feedDetail={feedDetail}
                        myProfile={myProfile}
                      />
                    </CommentList>
                  )}
                </Container>
                {isEditing ? null : (
                  <WritingComment className="writing_comment">
                    <Top>
                      <Notification>
                        <IoHeartOutline />
                        <span>
                          {followingUser ? (
                            <>
                              {followingUser.userId}님 외{" "}
                              <b> {feedDetail.like.length}명</b>이 좋아합니다
                            </>
                          ) : (
                            <b>좋아요 {feedDetail.like.length}개</b>
                          )}
                        </span>
                      </Notification>
                      <IconBtns>
                        <IoPaperPlaneOutline />
                        <FaRegBookmark />
                      </IconBtns>
                    </Top>
                    <Form>
                      <StyledInput
                        ref={commentRef}
                        value={comment}
                        placeholder="댓글 달기... "
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </Form>
                  </WritingComment>
                )}
              </Desc>
            </Contents>
          </Inner>
        </Wrapper>
      </BgWrapper>
    </>
  );
};

export default ClickFeed;
