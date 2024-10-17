import React, { useRef, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Slide from "../Main/Slide";
import ProfileImg from "../Profile/ProfileImg";
import UserId from "../User/UserId";
import CommentItem from "./CommentItem";
import FeedText from "../Main/FeedText";
import Button from "../Common/Button";
import CommentInput from "../Common/CommentInput";
import { click, getFormattedDate } from "../../utils/utils";

import { IoIosCloseCircle } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

import { auth, db, storage } from "../../utils/firebase";
import {
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  addDoc,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import {
  deleteObject,
  ref,
  getDownloadURL,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { motion } from "framer-motion";
import { StateContext } from "../../App";
import FeedIcon from "../Main/FeedIcon";

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
  z-index: 4;
`;

const CloseBtn = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 5;

  svg {
    font-size: 30px;
    color: var(--bg-white-color);
  }

  @media screen and (max-width: 630px) {
    display: none;
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 30px;
  height: 30px;
  display: none;
  color: ${({ theme }) => theme.bgColor};
  filter: drop-shadow(0 0 4px ${({ theme }) => theme.fontColor});
  z-index: 3;

  svg {
    font-size: var(--font-24);
  }
  @media screen and (max-width: 630px) {
    display: block;
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
  cursor: default;

  .feed_wrapper {
    margin: 5px 0;
  }

  @media screen and (max-width: 1400px) {
    ${({ $isEditing }) =>
      $isEditing
        ? null
        : `position: relative;
    height: 0;
    padding-top: 56.25%;`}

    .inner {
      ${({ $isEditing }) => ($isEditing ? null : `width: 100%; height: 100%`)}
    }
  }

  @media screen and (max-width: 1024px) {
    position: relative;
    width: 70%;
    height: 0;
    padding-top: 56.25%;

    .inner {
      width: 100%;
      height: ${({ $isEditing }) => ($isEditing ? "88%" : "100%")};
    }
    .slider {
      width: 55%;
    }
    .desc {
      width: 45%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .comment_list {
        padding: 10px;
      }
      .writing_comment {
        height: auto;
        padding: 10px 10px 15px 10px;
        gap: 0;
      }
      .notification {
        span {
          font-size: var(--font-12);
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    .editing_img {
      gap: 15px;
    }

    .media_box {
      width: 80%;
      height: 80%;
    }

    .user_container {
      padding: 20px 20px 0 0;
    }
    .setcontent_button {
      width: 170px;
      height: 35px;
    }

    textarea {
      font-size: var(--font-14);
    }
  }

  @media screen and (max-width: 630px) {
    width: 430px;
    height: ${({ $isEditing }) => ($isEditing ? "78%" : "100%")};

    .inner {
      height: ${({ $isEditing }) => ($isEditing ? "100%" : "100%")};
      border-radius: ${({ $isEditing }) =>
        $isEditing ? "var(--border-radius-12);" : "0"};
    }

    .contents {
      flex-direction: column;
      align-items: center;
      border-radius: var(--border-radius-12);
      overflow: hidden;
      border-radius: ${({ $isEditing }) =>
        $isEditing ? "var(--border-radius-12);" : "0"};
    }

    .slider {
      width: 100%;
      height: ${({ $isEditing }) => ($isEditing ? "40%" : "48%")};
      border-radius: 0;

      .editing_img {
        height: auto;
        justify-content: start;
        gap: 20px;
        margin-top: 20px;

        .media_box {
          width: 65%;
          height: 65%;
        }

        label {
          margin-bottom: 0;
        }
      }
    }

    .desc {
      width: 100%;
      height: ${({ $isEditing }) => ($isEditing ? "60%" : "50%")};
    }

    .user_container {
      padding: 20px 20px 0;
    }

    textarea {
      height: 100%;
    }
  }

  @media screen and (max-width: 430px) {
    width: 100%;
  }
`;

const Inner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${({ $isEditing }) =>
    $isEditing
      ? `width: 800px;
  height: 450px;`
      : `width: 80%;
  height: 93%;`}
  background: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.fontColor};
  border-radius: var(--border-radius-12);
  transition: all 0.3s;
`;

const Contents = styled.div`
  width: 100%;
  height: ${({ $isEditing }) => ($isEditing ? "calc(100% - 53px)" : "100%")};
  display: flex;
`;

const Slider = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: var(--border-radius-12) 0 0 var(--border-radius-12);
  overflow: hidden;
  position: relative;

  .react-multi-carousel-list {
    width: 100%;
    height: 100%;

    ul {
      li {
        width: 100%;
        height: 100%;
      }
    }
  }
`;

const EditingImg = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  height: 100%;
`;

const MediaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const OriginBox = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: grab;
`;

const MediaBox = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: grab;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Desc = styled.div`
  width: 40%;
  height: 100%;
  ${({ $isEditing }) =>
    $isEditing
      ? `display: block;`
      : `display: flex;
  flex-direction: column;
  justify-content: space-between;`}
`;

const Container = styled.div`
  width: 100%;
  height: ${({ $isEditing }) => ($isEditing ? "100%" : "calc(100% - 115px)")};
  ${({ $isEditing }) =>
    $isEditing
      ? `display: block;;`
      : `display: flex;
  flex-direction: column;`}
`;

const UserContainer = styled.div`
  width: 100%;
  height: ${({ $isEditing }) => ($isEditing ? "100%" : "auto")};
  padding: 20px 30px 0px;
  border-bottom: ${({ $isEditing, theme }) =>
    $isEditing ? "none" : `1px solid ${theme.borderColor}`};
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
  @media screen and (max-width: 1024px) {
    font-size: var(--font-12);
  }
`;

const UserContents = styled.div`
  display: flex;
  justify-content: space-between;
  ${({ $isEditing }) =>
    $isEditing
      ? `width: 100%; height: calc(100% - 100px); margin-left: 0; position: relative;`
      : `margin-left: 15px; position: static;`}
`;

const ContentDate = styled.span`
  display: ${({ $isEditing }) => ($isEditing ? "none" : "inline-block")};
  font-size: var(--font-12);
  margin-left: 15px;
  padding-bottom: 22px;
  @media screen and (max-width: 1024px) {
    padding-bottom: 15px;
  }
`;

const CommentList = styled.div`
  display: ${({ $isEditing }) => ($isEditing ? "none" : "flex")};
  padding: 20px;
  flex-direction: column;
  gap: 15px;
  overflow-x: hidden;
`;

const WritingComment = styled.div`
  display: ${({ $isEditing }) => ($isEditing ? "none" : "flex")};
  height: ${({ $isEditing }) => ($isEditing ? "auto" : "115px")};
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  border-top: 1px solid var(--light-gray-color);
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;

  span {
    font-weight: var(--font-bold);
  }
  & button:first-child {
    color: ${({ theme }) => theme.nonActiveBtnColor};
  }
`;

const SetContentButton = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 40px;
  background: ${({ theme }) => theme.subColor};
  color: var(--bg-white-color);
  border-radius: var(--border-radius-8);
  cursor: pointer;
  margin-bottom: 40px;
  transition: background 0.3s;
  &:hover {
    background: ${({ theme }) => theme.buttonHoverColor};
  }
`;

const PreviewImage = styled.img`
  width: 100px;
  height: 100px;
  margin: 5px;
  object-fit: cover;
  border-radius: 10px;
`;

const DeleteBtn = styled.button`
  filter: drop-shadow(0 0 5px ${({ theme }) => theme.fontColor});
  svg {
    font-size: var(--font-18);
    font-weight: var(--font-bold);
    color: ${({ theme }) => theme.bgColor};
  }
`;

const Icon = styled.img`
  width: 100%;
  height: 100%;
`;

const SetContentInputButton = styled.input`
  display: none;
`;

const EditedTextArea = styled.textarea`
  position: absolute;
  top: 5%;
  width: 100%;
  height: 75%;
  padding-top: 10px;
  padding-left: 10px;
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

const OriginPhoto = styled.div`
  position: relative;
  .delBtn {
    display: inline-block;
    position: absolute;
    top: 10px;
    right: 10px;
  }
`;

const ClickFeed = ({ feedDetail, onClick }) => {
  const [followingUser, setFollowingUser] = useState("");
  const [replyArr, SetReplyArr] = useState([]);
  const [repleInfo, setRepleInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedFeedDetail, setEditedFeedDetail] = useState(
    feedDetail?.content || ""
  );

  const [preview, setPreview] = useState([]);
  const [file, setFile] = useState([]);

  const bgRef = useRef();

  const { myProfile } = useContext(StateContext);
  const { allProfile } = useContext(StateContext);

  const followResult = myProfile.following.find((it) => it === feedDetail.uid);

  const onChange = (e) => {
    setEditedFeedDetail(e.target.value);
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
    if (!ok || user.uid !== feedDetail.uid) return;
    try {
      await deleteDoc(doc(db, `feed`, feedDetail.id));
      if (feedDetail.media) {
        const mediaRef = ref(storage, `feed/${user.uid}/${feedDetail.id}`);
        await deleteObject(mediaRef);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onUpDate = async () => {
    try {
      if (user?.uid !== feedDetail.uid) return;

      const feedDetailDoc = await getDoc(doc(db, "feed", feedDetail.id));
      const feedDetailData = feedDetailDoc.data();

      let updatedMedia = feedDetailData.imgPath || [];

      if (file.length > 0) {
        for (const editedFile of file) {
          const newFileType = editedFile.type.startsWith("image/")
            ? "img"
            : "video";

          const locationRef = ref(
            storage,
            `feed/${user.uid}/${feedDetail.id}/${editedFile.name}`
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
        content: editedFeedDetail,
        imgPath: updatedMedia,
        type: updatedMedia.find((item) => item.endsWith(".mp4"))
          ? "reels"
          : "img",
      };

      await updateDoc(doc(db, "feed", feedDetail.id), updatedData);
    } catch (e) {
      console.error(e);
    } finally {
      setPreview([]);
      setIsEditing(false);
    }
  };

  useEffect(() => {
    const likeFollowing = feedDetail.like.find((it) =>
      myProfile.following.includes(it)
    );

    const profileData = allProfile.find((it) => it.uid === likeFollowing);
    setFollowingUser(profileData);

    let replyUnsubscribe = null;
    let reReplyUnsubscribe = null;

    const fetchReply = () => {
      const replyQuery = query(
        collection(db, "reply"),
        where("feedId", "==", feedDetail.id),
        orderBy("createdAt", "desc")
      );

      replyUnsubscribe = onSnapshot(replyQuery, (snapshot) => {
        const replyDocs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const replyIdArr = replyDocs.map((it) => it.id);

        if (replyIdArr.length > 0) {
          const reReplyQuery = query(
            collection(db, "re_reply"),
            where("replyId", "in", replyIdArr),
            orderBy("replyId", "asc"),
            orderBy("createdAt", "desc")
          );

          reReplyUnsubscribe = onSnapshot(reReplyQuery, (snapshot) => {
            const reReplyDocs = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));

            const replyList = replyDocs.map((rp) => ({
              ...rp,
              reReply: reReplyDocs.filter((rr) => rr.replyId === rp.id),
            }));
            SetReplyArr(replyList);
          });
        } else {
          SetReplyArr(replyDocs);
          if (reReplyUnsubscribe) {
            reReplyUnsubscribe();
            reReplyUnsubscribe = null;
          }
        }
      });
    };

    fetchReply();

    return () => {
      if (replyUnsubscribe) {
        replyUnsubscribe();
      }
      if (reReplyUnsubscribe) {
        reReplyUnsubscribe();
      }
    };
  }, [feedDetail]);

  const addCmt = async (comment) => {
    try {
      if (repleInfo && comment.startsWith(`@${repleInfo.userId}`)) {
        await addDoc(collection(db, "re_reply"), {
          content: comment.replace(`@${repleInfo.userId} `, ""),
          createdAt: Date.now(),
          replyId: repleInfo.id,
          type: "rr",
          uid: myProfile.uid,
          like: [],
        });
      } else {
        await addDoc(collection(db, "reply"), {
          content: comment,
          createdAt: Date.now(),
          feedId: feedDetail.id,
          type: "rp",
          uid: myProfile.uid,
          like: [],
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setRepleInfo(null);
    }
  };

  const hideFeed = () => {
    onClick();
  };

  const addRereple = (reply) => {
    setRepleInfo(reply);
  };

  const delOrginal = (e) => {
    if (
      !window.confirm(
        "해당 사진이 삭제되면 복구할 수 없습니다. 지금 삭제하시겠습니까?"
      )
    ) {
      return;
    }
    const resultImgPath = feedDetail.imgPath.filter(
      (it, idx) => idx !== parseInt(e.target.dataset.idx)
    );

    const updatedData = {
      imgPath: resultImgPath,
    };
    updateDoc(doc(db, "feed", feedDetail.id), updatedData);
  };

  const [WrapperWidth, setWrapperWidth] = useState(0);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (wrapperRef.current) {
      setWrapperWidth(wrapperRef.current.offsetWidth);
    }
  }, [wrapperRef.current]);

  return (
    <>
      {!myProfile && !feedDetail ? (
        <p>피드를 불러오는 중입니다...</p>
      ) : (
        <>
          <CloseBtn className="close_btn" onClick={hideFeed}>
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
                <Contents $isEditing={isEditing} className="contents">
                  <Slider className="slider">
                    <BackButton className="back_button" onClick={hideFeed}>
                      <FaArrowLeft />
                    </BackButton>
                    {isEditing ? (
                      <EditingImg className="editing_img">
                        <MediaWrapper>
                          <OriginBox
                            className="media_box"
                            drag="x"
                            dragConstraints={{
                              left: -WrapperWidth / 2,
                              right: 0,
                            }}
                            whileTap={{ cursor: "grabbing" }}
                            onDragEnd={(event, info) => {
                              if (info.point.x < -WrapperWidth / 2) {
                              } else if (info.point.x > 0) {
                              }
                            }}
                          >
                            {feedDetail &&
                              feedDetail.imgPath.map((it, idx) => (
                                <OriginPhoto key={idx}>
                                  <PreviewImage
                                    src={it}
                                    alt={`오리지널 사진 미리보기 ${idx + 1}`}
                                  />
                                  <DeleteBtn
                                    className="delBtn"
                                    data-idx={idx}
                                    onClick={delOrginal}
                                  >
                                    <IoClose />
                                  </DeleteBtn>
                                </OriginPhoto>
                              ))}
                          </OriginBox>
                          <MediaBox
                            className="media_box"
                            drag="x"
                            dragConstraints={{
                              left: -WrapperWidth / 2,
                              right: 0,
                            }}
                            whileTap={{ cursor: "grabbing" }}
                            onDragEnd={(event, info) => {
                              if (info.point.x < -WrapperWidth / 2) {
                              } else if (info.point.x > 0) {
                              }
                            }}
                          >
                            {preview.length > 0 &&
                              preview.map((item, idx) => (
                                <PreviewImage
                                  key={idx}
                                  src={item}
                                  alt={`미리보기 ${idx + 1}`}
                                />
                              ))}
                          </MediaBox>
                        </MediaWrapper>
                        <SetContentButton
                          htmlFor="edit-content"
                          className="setcontent_button"
                        >
                          {file.length > 0
                            ? "업로드 완료 / 추가"
                            : "사진 및 동영상 찾기"}
                        </SetContentButton>
                        <SetContentInputButton
                          id="edit-content"
                          type="file"
                          accept="video/mpk, video/*, image/*"
                          onChange={onClickSetContent}
                          multiple
                        />
                      </EditingImg>
                    ) : (
                      <>
                        {feedDetail && feedDetail?.type === "reels" ? (
                          <Video
                            autoPlay
                            muted
                            loop
                            src={feedDetail?.imgPath}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        ) : feedDetail?.type === "img" ? (
                          <Slide
                            imgPath={
                              Array.isArray(feedDetail.imgPath)
                                ? feedDetail.imgPath
                                : [feedDetail.imgPath]
                            }
                            onClick={onClick}
                          />
                        ) : Array.isArray(feedDetail.imgPath) ? (
                          <Slide
                            imgPath={feedDetail.imgPath}
                            onClick={onClick}
                          />
                        ) : feedDetail.type === "img" ? (
                          <Slide
                            imgPath={[feedDetail.imgPath]}
                            onClick={onClick}
                          />
                        ) : feedDetail.type === "reels" ? (
                          <Video src={feedDetail.imgPath} muted />
                        ) : null}
                      </>
                    )}
                  </Slider>
                  <Desc className="desc" $isEditing={isEditing}>
                    <Container $isEditing={isEditing}>
                      <UserContainer
                        className="user_container"
                        $isEditing={isEditing}
                      >
                        <UserBox $isEditing={isEditing}>
                          <ProfileImg
                            type={"active"}
                            size={"40"}
                            url={feedDetail.profile.profilePhoto}
                          />
                          <Userinfo>
                            <UserId
                              type={"feed"}
                              userNickname={feedDetail.profile.userId}
                              check={feedDetail.profile.badge ? "active" : ""}
                              btn={isEditing ? null : "more"}
                              onClick={onDelete}
                              setIsEditing={setIsEditing}
                              follwed={
                                feedDetail.uid === myProfile.uid
                                  ? ""
                                  : followResult
                                  ? ""
                                  : "팔로우"
                              }
                              uid={feedDetail.uid}
                              feed={
                                feedDetail.uid === myProfile.uid
                                  ? "myfeed"
                                  : "feed"
                              }
                            />
                            <Location>{feedDetail.location}</Location>
                          </Userinfo>
                        </UserBox>
                        <UserContents $isEditing={isEditing}>
                          {isEditing ? (
                            <EditedTextArea
                              value={editedFeedDetail}
                              placeholder={feedDetail.content}
                              onChange={onChange}
                            />
                          ) : (
                            <FeedText feedDetail={feedDetail} all={true} />
                          )}
                        </UserContents>
                        <ContentDate $isEditing={isEditing}>
                          {getFormattedDate(new Date(feedDetail.createdAt))}
                        </ContentDate>
                      </UserContainer>

                      <CommentList
                        className="comment_list"
                        $isEditing={isEditing}
                      >
                        {replyArr.length > 0
                          ? replyArr.map((it, idx) => (
                              <CommentItem
                                key={idx}
                                reply={it}
                                addRereple={addRereple}
                              />
                            ))
                          : null}
                      </CommentList>
                    </Container>
                    <WritingComment
                      className="writing_comment"
                      $isEditing={isEditing}
                    >
                      <FeedIcon feedDetail={feedDetail} type={"detail"} />
                      <CommentInput
                        width={"100%"}
                        height={"35px"}
                        addCmt={addCmt}
                        repleInfo={repleInfo}
                      />
                    </WritingComment>
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

export default ClickFeed;
