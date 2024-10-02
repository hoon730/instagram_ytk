import React, { useState } from "react";
import Button from "../components/Common/Button";
import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 680px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 50px;
  background: var(--bg-white-color);
  border-radius: var(--border-radius-12);
  z-index: 1;
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
`;
const VidMedia = styled.video`
  width: 150px;
  height: 150px;
  background: #eee;
  object-fit: cover;
`;

const StyledSpan = styled.span`
  padding: 14px 0;
  font-size: var(--font-16);
  font-weight: var(--font-medium);
  color: var(--sub-purple-color);
`;

const SearchBtn = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 40px;
  background: var(--sub-purple-color);
  color: var(--bg-white-color);
  border-radius: var(--border-radius-8);
  cursor: pointer;
  margin-bottom: 40px;
  transition: background 0.3s;
  &:hover {
    background: #3e1494;
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

const New = ({ closeNew }) => {
  console.log(closeNew);

  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState("");
  const [file, setfile] = useState(null);
  const [textValueLength, setTextValueLength] = useState(0);

  console.log(file);

  const fileAdd = (e) => {
    console.log(e);
    const { files } = e.target;
    if (files && files.length === 1) setfile(files[0]);
  };

  const onChange = (e) => {
    setPost(e.target.value);
    setTextValueLength(e.target.textLength);
  };

  const handleOnClick = () => {
    closeNew();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // const user = auth.currentUser;
    // if (!user || isLoading || post === "" || post.length > 180) return;
    // try {
    //  setIsLoading(true);
    //   await addDoc(collection(db, "contents"), {
    //     post,
    //     createdAt: Date.now(),
    //     username: user?.displayName || "Anonymous",
    //     userId: user.uid,
    //   });
    // } catch (e) {
    //   console.error(e);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <Wrapper>
      <H3>새 게시물 만들기</H3>
      <Form onSubmit={onSubmit}>
        <MediaBox>
          {file !== null ? (
            file.type.startsWith("image/") ? (
              <ImgMedia />
            ) : (
              <VidMedia />
            )
          ) : (
            <Icon src={`${process.env.PUBLIC_URL}/images/newPostIcon.svg`} />
          )}
        </MediaBox>
        <StyledSpan>사진이나 동영상을 업로드 해주세요</StyledSpan>
        <SearchBtn htmlFor="file">
          {file ? "업로드 완료" : "사진 및 동영상 찾기"}
        </SearchBtn>
        <SearchInput
          type="file"
          id="file"
          accept="video/*, image/*"
          onChange={fileAdd}
        />
        <TextInputArea>
          <TextArea
            maxLength={2200}
            value={post}
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
            type={"negative"}
            text={"취소하기"}
            width={"50%"}
            onClick={handleOnClick}
          />
          <Button type={"positive"} text={"게시글 업로드 하기"} width={"50%"} />
        </ButtonsBox>
      </Form>
    </Wrapper>
  );
};

export default New;
