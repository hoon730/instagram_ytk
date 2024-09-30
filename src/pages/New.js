import React, { useState } from "react";
import { AiOutlinePicture } from "react-icons/ai";
import { GoVideo } from "react-icons/go";
import Button from "../components/Common/Button";
import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 50px;
  background: var(--bg-white-color);
  border-radius: var(--border-radius-12);
`;

const H3 = styled.h3`
  padding: 20px 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding-bottom: 20px;

  svg {
    font-size: 130px;
    color: var(--gray-color);

    &:first-child {
      font-size: 140px;
    }
  }
`;

const StyledSpan = styled.span`
  padding: 20px 0;
  font-size: var(--font-16);
  font-weight: var(--font-medium);
  color: var(--sub-purple-color);
`;

const SearchBtn = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 50px;
  background: var(--sub-purple-color);
  color: var(--bg-white-color);
  border-radius: var(--border-radius-8);
  cursor: pointer;
  margin-bottom: 50px;
`;

const SearchInput = styled.input`
  display: none;
`;

const TextArea = styled.textarea`
  width: 700px;
  height: 280px;
  padding: 20px;
  border: 3px solid var(--light-gray-color);
  border-radius: var(--border-radius-12);
  color: var(--bg-black-color);
  font-size: var(--font-16);
  resize: none;
  &::placeholder {
    color: var(--gray-color);
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
    opacity: 1;
    transition: opacity 0.3s;
  }
  &:focus {
    &::placeholder {
      opacity: 0;
    }
    outline: none;
    border-color: var(--sub-purple-color);
  }
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

  const onClick = (e) => {
    console.log(e);
    const { files } = e.target;
    if (files && files.length === 1) setfile(files[0]);
  };

  const onChange = (e) => {
    setPost(e.target.value);
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
        <IconBox>
          <AiOutlinePicture />
          <GoVideo />
        </IconBox>
        <StyledSpan>사진이나 동영상을 업로드 해주세요</StyledSpan>
        <SearchBtn htmlFor="file">
          {file ? "업로드 완료" : "사진 및 동영상 찾기"}
        </SearchBtn>
        <SearchInput
          type="file"
          id="file"
          accept="video/*, image/*"
          onClick={onClick}
        />
        <TextArea
          value={post}
          name="contents"
          id="contents"
          placeholder="게시글 입력..."
          onChange={onChange}
        />
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
