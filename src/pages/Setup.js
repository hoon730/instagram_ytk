import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Button from "../components/Common/Button";
import EditDesc from "../components/Edit/EditDesc";
// import EditDesccopy from "../components/Edit/EditDesccopy";
import EditBtns from "../components/Edit/EditBtns";
import { click, scale } from "../utils/utils";

import { auth, storage, db } from "../utils/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

import { LuCamera } from "react-icons/lu";
import { motion } from "framer-motion";

const Container = styled(motion.div)`
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

const Wrapper = styled(motion.form)`
  width: 600px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 20px;
  padding: 30px;
  background: ${({ theme }) => theme.bgColor};

  @media screen and (max-width: 1200px) {
    width: 500px;
  }

  @media screen and (max-width: 730px) {
    width: 430px;
    font-size: var(--font-14);
  }

  @media screen and (max-width: 430px) {
    width: 100%;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  & button:first-child {
    color: ${({ theme }) => theme.nonActiveBtnColor};
  }
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
  margin-bottom: 30px;
`;

const PicBox = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  margin-bottom: 10px;
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
  cursor: pointer;

  svg {
    font-size: var(--font-18);
    color: var(--bg-white-color);
  }
`;

const ChangePicInput = styled.input`
  display: none;
`;

const UserNicknam = styled.div`
  font-size: var(--font-size-24);
  font-weight: var(--font-bold);
  margin-bottom: 10px;
`;
const UserName = styled.div`
  font-size: var(--font-size-16);
`;

const Setup = ({ onClick, myProfile }) => {
  const containerRef = useRef();
  const user = auth.currentUser;

  const [editProfile, setEditProfile] = useState(user?.photoURL || "");
  const [editUserName, setEditUserName] = useState(
    user?.displayName || "사용자 이름 없음"
  );
  const [intro, setIntro] = useState(myProfile?.introduction || "");
  const [link, setLink] = useState(myProfile?.website || "");

  const hideSetup = () => {
    onClick();
  };

  const handleEditUserName = (e) => {
    setEditUserName(e.target.value);
  };

  const handleIntro = (e) => {
    setIntro(e.target.value);
  };

  const handleLink = (e) => {
    setLink(e.target.value);
  };

  const editProfileChange = async (e) => {
    const { files } = e.target;
    if (!user || !files || files.length === 0) return;
    const file = files[0];
    const locationRef = ref(storage, `profile/${user.uid}`);
    const result = await uploadBytes(locationRef, file);
    const editProfileUrl = await getDownloadURL(result.ref);
    setEditProfile(editProfileUrl);
    await updateProfile(user, { photoURL: editProfileUrl });
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      const profileData = {
        userId: editUserName,
        userName: myProfile?.userName || "이름 없음",
        introduction: intro,
        website: link,
        profilePhoto: editProfile,
        recommendation: myProfile.recommendation,
        nondisclosure: myProfile.nondisclosure,
        gender: myProfile.gender,
        follower: myProfile.follower,
        following: myProfile.following,
        bgPhoto: myProfile.bgPhoto,
        badge: myProfile.badge,
        uid: user.uid,
      };

      // 전체 문서를 덮어쓰려면 setDoc을 사용
      await updateDoc(doc(db, "profile", myProfile.id), profileData);
      await updateProfile(user, { displayName: editUserName });
      alert("프로필이 성공적으로 저장되었습니다.");
      onClick();
    } catch (e) {
      console.error("프로필 저장 중 오류 발생:", e);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      const userDocRef = doc(db, "profile", myProfile.id);
      const userProfile = await getDoc(userDocRef);
      if (userProfile.exists()) {
        const data = userProfile.data();
        setEditUserName(data.userId || "");
        setIntro(data.introduction || "");
        setLink(data.website || "");
        setEditProfile(data.profilePhoto || "");
      }
    };
    fetchProfile();
  }, [user]);

  return (
    <Container
      variants={click}
      initial="initial"
      animate="visible"
      exit="exits"
      ref={containerRef}
      onClick={(e) => {
        if (!containerRef.current.contains(e.target)) {
          hideSetup();
        }
      }}
    >
      <Wrapper
        variants={scale}
        initial="initial"
        animate="visible"
        exit="exits"
        onClick={(e) => e.stopPropagation()}
        onSubmit={saveProfile}
      >
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
            {editProfile ? (
              <Pic src={editProfile} />
            ) : (
              <Pic src={myProfile.profilePhoto} />
            )}
            <ChangePicInput
              type="file"
              id="file"
              accept="video/*, image/*"
              onChange={editProfileChange}
            />
          </PicBox>
          <UserNicknam>{editUserName}</UserNicknam>
          <UserName>{user?.displayName || "이름 없음"}</UserName>
        </EditIntro>
        <EditDesc
          handleUserName={handleEditUserName}
          userName={editUserName}
          handleIntro={handleIntro}
          intro={intro}
          handleLink={handleLink}
          link={link}
        />
        <EditBtns />
      </Wrapper>
    </Container>
  );
};

export default Setup;
