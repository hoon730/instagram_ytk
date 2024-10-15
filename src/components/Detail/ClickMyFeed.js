import React, { useRef, useState } from "react";
import styled from "styled-components";
import Slide from "../Main/Slide";
import ProfileImg from "../Profile/ProfileImg";
import UserId from "../User/UserId";
import CommentItem from "./CommentItem";
import Button from "../Common/Button";
import FeedText from "../Main/FeedText";
import { click } from "../../utils/utils";

import { IoIosCloseCircle } from "react-icons/io";
import { IoHeartOutline } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa6";
import { IoPaperPlaneOutline } from "react-icons/io5";

import { auth, db, storage } from "../../utils/firebase";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import {
  deleteObject,
  ref,
  getDownloadURL,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { motion } from "framer-motion";

const BgWrapper = styled(motion.div)`
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

const Wrapper = styled(motion.div)`
  ${({ $isEditing }) =>
    $isEditing
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
      height: ${({ $isEditing }) => ($isEditing ? "auto" : "100%")};
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
  ${({ $isEditing }) =>
    $isEditing
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

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  border-bottom: ${({ $isEditing }) =>
    $isEditing ? "none" : `1px solid ${({ theme }) => theme.borderColor}`};
`;

const UserBox = styled.div`
  width: 100%;
  display: flex;
  gap: 15px;
  padding-bottom: ${({ $isEditing }) => ($isEditing ? "20px" : "5px")};
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

  @media screen and (max-width: 1000px) {
    font-size: var(--font-12);

    svg {
      font-size: var(--font-18);
    }
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

  @media screen and (max-width: 1000px) {
    font-size: var(--font-12);
    height: 30px;
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
  flex-wrap: wrap;
`;

const PreviewImage = styled.img`
  width: 100px;
  height: 100px;
  margin: 5px;
  object-fit: cover;
  border-radius: 10px;
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

const ClickMyFeed = ({ onClick, myProfile, post }) => {
  const commentRef = useRef();
  const bgRef = useRef();
  const [comment, setComment] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState(post?.content || "");

  const [preview, setPreview] = useState([]);
  const [file, setFile] = useState([]);



  const hideFeed = () => {
    onClick();
  };

  const onFocus = () => {
    commentRef.current.focus();
  };

  const onChange = (e) => {
    setEditedPost(e.target.value);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const maxFileSize = 10 * 1024 * 1024;

  const onClickSetContent = (e) => {
    const { files } = e.target;

    if (files) {
      const newFiles = [];
      const newPreviews = [];

      for (const item of files) {
        if (item.size > maxFileSize) {
          alert("업로드 할 수 있는 최대용량은 10MB입니다.");
          return;
        }
        newFiles.push(item);

        const reader = new FileReader();
        reader.readAsDataURL(item);

        reader.onload = (event) => {
          newPreviews.push(event.target.result);

          if (newPreviews.length === files.length) {
            setPreview((prevPreview) => [...prevPreview, ...newPreviews]);
            setFile((prevFile) => [...prevFile, ...newFiles]);
          }
        };
      }
    }
  };

  const user = auth.currentUser;
  const onDelete = async () => {
    const ok = window.confirm("정말로 지금 게시물을 삭제하시겠습니까?");
    if (!ok || user.uid !== post.uid) return;
    try {
      await deleteDoc(doc(db, `feed`, post.id));
      if (post.media) {
        const mediaRef = ref(storage, `feed/${user.uid}/${post.id}`);
        await deleteObject(mediaRef);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onUpDate = async () => {
    try {
      if (user?.uid !== post.uid) return;

      const postDoc = await getDoc(doc(db, "feed", post.id));
      const postData = postDoc.data();

      let updatedMedia = postData.imgPath || [];

      if (file.length > 0) {
        for (const editedFile of file) {
          const newFileType = editedFile.type.startsWith("image/")
            ? "img"
            : "video";

          const locationRef = ref(
            storage,
            `feed/${user.uid}/${post.id}/${editedFile.name}`
          );
          const uploadTask = uploadBytesResumable(locationRef, editedFile);

          if (editedFile.size >= maxFileSize) {
            uploadTask.cancel();
            alert("업로드 할 수 있는 최대용량은 10MB입니다.");
            return;
          }

          const result = await uploadBytes(locationRef, editedFile);
          const url = await getDownloadURL(result.ref);

          updatedMedia = [...updatedMedia, url];
        }
      }

      const updatedData = {
        content: editedPost,
        imgPath: updatedMedia,
        type: updatedMedia.find((item) => item.endsWith(".mp4"))
          ? "reels"
          : "img",
      };

      await updateDoc(doc(db, "feed", post.id), updatedData);
    } catch (e) {
      console.error(e);
    } finally {
      setIsEditing(false);
    }
  };



  return (
    <>
      {!post ? (
        <p>피드를 불러오는 중입니다...</p>
      ) : (
        <>
          <CloseBtn onClick={hideFeed}>
            <IoIosCloseCircle />
          </CloseBtn>
          <BgWrapper
            variants={click}
            initial="initial"
            animate="visible"
            exit="exits"
            ref={bgRef}
            onClick={(e) => {
              if (e.target === bgRef.current) {
                hideFeed();
              }
            }}
          >
            <Wrapper
              variants={click}
              initial="initial"
              animate="visible"
              exit="exits"
              $isEditing={isEditing}
            >
              <Inner className="inner" $isEditing={isEditing}>
                {isEditing ? (
                  <Title>
                    <Button text={"취소"} onClick={handleCancel} />
                    <span>편집 하기</span>
                    <Button text={"완료"} onClick={onUpDate} />
                  </Title>
                ) : null}
                <Contents $isEditing={isEditing}>
                  <Slider className="slider">
                    {isEditing ? (
                      <SetContentButton htmlFor="edit-content">
                        {preview.length > 0 ? (
                          preview.map((item, idx) => (
                            <PreviewImage
                              key={idx}
                              src={item}
                              alt={`미리보기 ${idx + 1}`}
                            />
                          ))
                        ) : (
                          <Icon src="/images/newPostIcon.svg" />
                        )}
                        <SetContentInputButton
                          id="edit-content"
                          type="file"
                          accept="video/mpk, video/*, image/*"
                          onChange={onClickSetContent}
                          multiple
                        />
                      </SetContentButton>
                    ) : (
                      <>
                        {post && post?.type === "reels" ? (
                          <Video
                            autoPlay
                            muted
                            loop
                            src={post?.imgPath}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        ) : post?.type === "img" ? (
                          <Slide
                            imgPath={
                              Array.isArray(post.imgPath)
                                ? post.imgPath
                                : [post.imgPath]
                            }
                            onClick={onClick}
                          />
                        ) : Array.isArray(post.imgPath) ? (
                          <Slide imgPath={post.imgPath} onClick={onClick} />
                        ) : post.type === "img" ? (
                          <Slide imgPath={[post.imgPath]} onClick={onClick} />
                        ) : post.type === "reels" ? (
                          <Video src={post.imgPath} muted />
                        ) : null}
                      </>
                    )}
                  </Slider>
                  <Desc className="desc">
                    <Container>
                      <UserContainer
                        className="user_container"
                        $isEditing={isEditing}
                      >
                        <UserBox $isEditing={isEditing}>
                          <ProfileImg
                            type={"active"}
                            size={"40"}
                            url={myProfile?.profilePhoto}
                            hover={true}
                          />
                          <Userinfo>
                            <UserId
                              type={"feed"}
                              userNickname={myProfile?.userId}
                              check={myProfile?.badge ? "active" : ""}
                              // createdAt={new Date(parseInt(post.createdAt))}
                              btn={"more"}
                              onClick={onDelete}
                              setIsEditing={setIsEditing}
                              hover={true}
                              feed={"myfeed"}
                            />
                            <Location>
                              {post ? post?.location : myProfile?.userName}
                            </Location>
                          </Userinfo>
                        </UserBox>
                        <UserContents>
                          {isEditing ? (
                            <EditedTextArea
                              value={editedPost}
                              placeholder={post.content}
                              onChange={onChange}
                            />
                          ) : (
                            <>{post && <FeedText post={post} />}</>
                          )}
                        </UserContents>
                      </UserContainer>
                      {isEditing ? null : (
                        <CommentList className="comment_list">
                          {post ? null : (
                            <CommentItem
                              onClick={onFocus}
                              post={post}
                              // myProfile={myProfile}
                            />
                          )}
                        </CommentList>
                      )}
                    </Container>
                    {isEditing ? null : (
                      <WritingComment className="writing_comment">
                        <Top>
                          <Notification>
                            <IoHeartOutline />
                            {post ? (
                              <span>
                                {post.userId}님 외 <b> {post.like.length}명</b>
                                이 좋아합니다
                              </span>
                            ) : null}
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
      )}
    </>
  );
};

export default ClickMyFeed;
