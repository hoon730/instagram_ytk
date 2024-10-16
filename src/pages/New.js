import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { click, scale } from "../utils/utils";
import Button from "../components/Common/Button";
import styled from "styled-components";

import { auth, db, storage } from "../utils/firebase";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const NewBg = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  z-index: 3;

  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`;

const Wrapper = styled(motion.div)`
  width: 680px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 50px;
  background: ${({ theme }) => theme.bgColor};
  border-radius: var(--border-radius-12);
  /* 
  @media screen and (max-width: 1024px) {
    position: relative;
    height: 0;
    padding-top: 56.25%;
    width: 67%;
  } */
`;

const Inner = styled.div`
  width: 100%;
  /* @media screen and (max-width: 1024px) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    padding: 30px 50px;
  } */
`;

const H3 = styled.h3`
  font-size: var(--font-20);
  font-weight: var(--font-bold);
  padding: 20px 0;
  margin-bottom: 20px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MediaBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 15px;
`;

const Icon = styled.img`
  width: 150px;
`;

const ImgMedia = styled.img`
  width: 150px;
  height: 150px;
  background: #eee;
  object-fit: cover;
  border-radius: var(--border-radius-8);
`;
const VidMedia = styled.video`
  width: 150px;
  height: 150px;
  background: #eee;
  object-fit: cover;
  border-radius: var(--border-radius-8);
`;

const StyledSpan = styled.span`
  padding: 14px 0;
  font-size: var(--font-16);
  font-weight: var(--font-medium);
  color: ${({ theme }) => theme.subColor};
`;

const SearchBtn = styled.label`
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

const SearchInput = styled.input`
  display: none;
`;
const TextInputArea = styled.div`
  width: 100%;
  position: relative;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 220px;
  padding: 20px;
  border: 2px solid ${({ theme }) => theme.iconBgColor};
  border-radius: var(--border-radius-12);
  color: ${({ theme }) => theme.fontColor};
  font-size: var(--font-16);
  background: ${({ theme }) => theme.bgColor};
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
    border-color: ${({ theme }) => theme.subColor};
    & ~ div {
      color: ${({ theme }) => theme.subColor};
    }
  }
`;

const TextCounter = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: var(--font-14);
  color: var(--gray-color);
`;

const ButtonsBox = styled.div`
  width: 100%;
  padding: 20px 0;
  display: flex;
  gap: 10px;
`;

const SubmitBtn = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 45px;
  font-size: var(--font-16);
  font-family: "Noto Sans KR", sans-serif;
  color: var(--bg-white-color);
  background-color: ${({ theme }) => theme.subColor};
  border-radius: var(--border-radius-8);
  transition: background-color 0.3s;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.buttonHoverColor};
  }
`;

const New = ({ setOpenNew }) => {
  const newBgRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");
  const [file, setFile] = useState([]);
  const [preview, setPreview] = useState([]);
  const [textValueLength, setTextValueLength] = useState(0);
  const [pushUrl, setPushUrl] = useState([]);

  const maxFileSize = 10 * 1024 * 1024;

  const fileAdd = (e) => {
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

  const onChange = (e) => {
    setContent(e.target.value);
    setTextValueLength(e.target.textLength);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || content === "" || content.length > 2200) return;

    try {
      setIsLoading(true);
      const docRef = await addDoc(collection(db, "feed"), {
        content,
        createdAt: Date.now(),
        hastage: [],
        like: [],
        location: "",
        tagUser: [],
        uid: user.uid,
      });

      const newPushUrl = []; // 파일 URL을 저장할 배열

      if (file.length > 1) {
        for (const item of file) {
          const locationRef = ref(storage, `feed/${user.uid}/${item.name}`);
          const result = await uploadBytes(locationRef, item);
          const url = await getDownloadURL(result.ref);

          newPushUrl.push(url); // URL을 배열에 추가
        }

        await updateDoc(docRef, {
          imgPath: newPushUrl,
          type: "img",
        });
      } else if (file.length === 1) {
        const item = file[0];
        const locationRef = ref(storage, `feed/${user.uid}/${item.name}`);
        const result = await uploadBytes(locationRef, item);
        const url = await getDownloadURL(result.ref);
        const fileType = item.type;

        if (fileType.startsWith("image/")) {
          await updateDoc(docRef, {
            imgPath: url,
            type: "img",
          });
        } else if (fileType.startsWith("video/")) {
          await updateDoc(docRef, {
            imgPath: url,
            type: "reels",
          });
        }
      }

      // 상태 초기화
      setContent("");
      setFile([]);
      setPushUrl([]);
      setOpenNew(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnClick = () => {
    setOpenNew(false);
  };

  return (
    <NewBg
      variants={click}
      initial="initial"
      animate="visible"
      exit="exits"
      ref={newBgRef}
      onClick={(e) => {
        if (e.target === newBgRef.current) setOpenNew(false);
      }}
    >
      <Wrapper
        variants={scale}
        initial="initial"
        animate="visible"
        exit="exits"
      >
        <Inner className="inner">
          <H3>새 게시물 만들기</H3>
          <Form onSubmit={onSubmit}>
            <MediaBox>
              {preview.length > 0 ? (
                preview.map((src, idx) => {
                  const fileType = file[idx].type;
                  console.log(fileType);
                  if (fileType.startsWith("image/")) {
                    return <ImgMedia key={idx} src={src} />;
                  } else {
                    return <VidMedia key={idx} src={src} />;
                  }
                })
              ) : (
                <Icon
                  src={`${process.env.PUBLIC_URL}/images/newPostIcon.svg`}
                />
              )}
            </MediaBox>
            <StyledSpan>사진이나 동영상을 업로드 해주세요</StyledSpan>
            <SearchBtn htmlFor="file">
              {file.length > 0 ? "업로드 완료 / 추가" : "사진 및 동영상 찾기"}
            </SearchBtn>
            <SearchInput
              type="file"
              id="file"
              accept="video/*, image/*"
              onChange={fileAdd}
              multiple
            />
            <TextInputArea>
              <TextArea
                maxLength={2200}
                value={content}
                name="contents"
                id="contents"
                placeholder="게시글 입력..."
                onChange={onChange}
              />
              <TextCounter>
                <span>{textValueLength}</span>
                <span> / 2200</span>
              </TextCounter>
            </TextInputArea>
            <ButtonsBox>
              <Button
                className="button"
                type={"negative"}
                text={"취소하기"}
                width={"50%"}
                onClick={handleOnClick}
              />
              <SubmitBtn
                type="submit"
                value={isLoading ? "업로드중..." : "게시글 업로드하기"}
              />
            </ButtonsBox>
          </Form>
        </Inner>
      </Wrapper>
    </NewBg>
  );
};

export default New;
