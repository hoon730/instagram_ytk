import React, { useState, useRef } from "react";
import styled from "styled-components";
import Button from "../components/Common/Button";
import EditDesc from "../components/Edit/EditDesc";
import EditBtns from "../components/Edit/EditBtns";

import { auth, storage, db } from "../utils/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import { LuCamera } from "react-icons/lu";

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  background: rgba(0, 0, 0, 0.5);
`;

const Wrapper = styled.form`
  padding: 0 20px;
  width: 600px;
  height: 610px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 20px;
  padding: 30px;
  background: ${({ theme }) => theme.bgColor};
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Text = styled.h3`
  font-size: var(--font-16);
  font-weight: var(--font-semibold);
`;

const SubmitBtn = styled.input`
  font-size: var(--font-16);
  font-weight: var(--font-bold);
  background: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.subColor};
`;

const EditIntro = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
`;

const PicBox = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
`;

const Pic = styled.img`
  width: 100%;
  height: 100%;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 50%;
  background: #eee;
`;

const ChangePicBtn = styled.label`
  width: 30px;
  height: 30px;
  background: ${({ theme }) => theme.buttonHoverColor};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  position: absolute;
  bottom: 0;
  right: 0;

  svg {
    font-size: var(--font-18);
  }
`;

const ChangePicInput = styled.input`
  display: none;
`;

const UserNicknam = styled.div`
  font-size: var(--font-size-24);
  font-weight: var(--font-bold);
`;
const UserName = styled.div`
  font-size: var(--font-size-16);
`;

const Setup = ({ onClick }) => {
  const containerRef = useRef();
  const user = auth.currentUser;
  const [editProfile, setEditProfile] = useState(
    user.photoURL || null || undefined
  );
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState(user.displayName ?? "Anonymous");
  const [intro, setIntro] = useState("");
  const [link, setLink] = useState("");

  const hideSetup = () => {
    onClick();
  };

  const handleUserName = (e) => {
    setUserName(e.target.value);
  };
  const handleIntro = (e) => {
    setIntro(e.target.value);
  };
  const handleLink = (e) => {
    setLink(e.target.value);
  };

  const editProfileChange = async (e) => {
    const { files } = e.target;
    if (!user) return;
    if (files && files.length === 1) {
      const file = files[0];
      const locationRef = ref(storage, `editProfile/${user.uid}`);
      const result = await uploadBytes(locationRef, file);
      const editProfileUrl = await getDownloadURL(result, ref);
      setEditProfile(editProfileUrl);
      await updateProfile(user, {
        photoURL: editProfileUrl,
      });
    }
  };

  const ChangeUserName = async () => {
    if (!user) return;
    setIsEditing((prev) => !prev);
    if (!isEditing) return;
    try {
      await updateProfile(user, {
        displayName: userName,
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <Container
      ref={containerRef}
      onClick={(e) => {
        if (!containerRef.current.contains(e.target)) {
          hideSetup();
        }
      }}
    >
      <Wrapper onClick={(e) => e.stopPropagation()}>
        <Title>
          <Button text={"취소"} onClick={onClick} />
          <Text>프로필</Text>
          <SubmitBtn type="submit" value={"완료"} />
        </Title>
        <EditIntro>
          <PicBox>
            <ChangePicBtn htmlFor="file">
              <LuCamera />
            </ChangePicBtn>
            {editProfile ? <Pic src={editProfile} /> : <Pic />}
            <ChangePicInput
              type="file"
              id="file"
              accept="video/*, image/*"
              onChange={editProfileChange}
            />
          </PicBox>
          <UserNicknam>bbbok</UserNicknam>
          <UserName>bbo</UserName>
        </EditIntro>
        <EditDesc
          handleUserName={handleUserName}
          userName={userName}
          handleIntro={handleIntro}
          intro={intro}
          handleLink={handleLink}
          link={link}
        ></EditDesc>
        <EditBtns></EditBtns>
      </Wrapper>
    </Container>
  );
};

export default Setup;
