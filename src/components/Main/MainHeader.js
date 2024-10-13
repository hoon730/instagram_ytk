import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import ToolItem from "../Common/Sidebar/ToolItem";
import ProfileImg from "../Profile/ProfileImg";
import UserId from "../User/UserId";
import { GoHeart, GoHeartFill } from "react-icons/go";
import Notification from "./Notification";
import { useNavigate } from "react-router-dom";

import { collection, query, limit, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../utils/firebase";

const Wrapper = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  width: 80%;
  height: 85px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 36px;
  background: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.fontColor};
  border-right: 1px solid ${({ theme }) => theme.borderColor};
  position: fixed;
  z-index: 1;
  @media screen and (max-width: 1170px) {
    display: none;
  }
`;

const SearchBarArea = styled.div`
  width: 500px;
  @media screen and (max-width: 1110px) {
    width: 100%;
  }
`;

const ProfileArea = styled.div`
  width: 305px;
  height: 60px;
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
`;

const NotificationArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Profile = styled.div`
  width: calc(100% - 52px);
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 12px;
  padding: 8px;
  transition: background 0.3s;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.iconBgColor};
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ProfileText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const UserName = styled.div`
  font-size: var(--font-size-12);
  font-weight: var(--font-regular);
  color: var(--gray-color);
`;

const MainHeader = () => {
  const [heart, setHeart] = useState(false);
  const [myProfile, setMyProfile] = useState(null);
  const navigate = useNavigate();

  const heartChange = () => {
    setHeart((prev) => !prev);
  };

  useEffect(() => {
    const userUid = auth.currentUser?.uid;
    if (userUid) {
      const getMyProfile = async (uid) => {
        const profileQuery = query(
          collection(db, "profile"),
          where("uid", "==", uid),
          limit(1)
        );
        const profileSnapshot = await getDocs(profileQuery);

        if (!profileSnapshot.empty) {
          const profileData = profileSnapshot.docs[0].data();
          setMyProfile(profileData);
        }
      };

      getMyProfile(userUid);
    }
  }, []);

  return (
    <Wrapper>
      <SearchBarArea>
        <SearchBar />
      </SearchBarArea>
      <ProfileArea>
        <NotificationArea>
          <ToolItem
            clickEvent={heartChange}
            iconCode={heart ? <GoHeartFill /> : <GoHeart />}
            name={heart ? "heartFill" : "heart"}
          />
          {heart ? <Notification /> : null}
        </NotificationArea>
        <Profile onClick={() => navigate("/detail")}>
          <UserProfile>
            <ProfileImg
              url={myProfile ? myProfile.profilePhoto : null}
              size={"45"}
              hover={"noHover"}
            />
            <ProfileText>
              <UserId
                userNickname={myProfile ? myProfile.userId : ""}
                hover={"noHover"}
              />
              <UserName>{myProfile ? myProfile.userName : null}</UserName>
            </ProfileText>
          </UserProfile>
        </Profile>
      </ProfileArea>
    </Wrapper>
  );
};

export default MainHeader;
