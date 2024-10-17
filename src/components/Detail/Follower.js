import React, { useContext, useState } from "react";
import styled from "styled-components";
import UserInfo from "../User/UserInfo";
import { RxMagnifyingGlass } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import { StateContext } from "../../App";

const BgFilter = styled.div`
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
  z-index: 2;
`;

const Wrapper = styled.div`
  display: ${({ $display }) => ($display ? "block" : "none")};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  padding: 15px;
  background: var(--bg-white-color);
  border-radius: var(--border-radius-12);
  box-shadow: var(--box-shadow);
  z-index: 3;
  overflow-y: scroll;

  @media screen and (max-width: 430px) {
    width: 82%;
  }
`;

const Title = styled.div`
  width: 100%;
  margin-bottom: 15px;
  position: relative;
`;

const H3 = styled.h3`
  font-size: var(--font-16);
  font-weight: var(--font-bold);
  text-align: center;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    font-size: var(--font-22);
  }
`;

const SearchInputBox = styled.div`
  width: 100%;
  height: 35px;
  padding: 12px;
  border-radius: 8px;
  background: #eeeeee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ItemArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & > svg {
    color: #bfbfbf;
  }
  &.deleteBtn {
    opacity: 0;
    background: #bfbfbf;
    padding: 2px;
    border-radius: 50%;
    cursor: pointer;
    & > svg {
      color: #ffffff;
    }
    &.active {
      opacity: 1;
    }
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 24px;
  font-size: 16px;
  background: none;
  color: #2b2b2b;
`;

const SearchList = styled.div``;

const Follower = ({ setOpenFollower, clickBtn }) => {
  const [isClose, setIsClose] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [getUserNickName, setGetUserNickName] = useState("");
  const { myProfile } = useContext(StateContext);
  const { allProfile } = useContext(StateContext);

  const allProfileUids = allProfile?.map((profile) => profile.uid);
  const following = allProfileUids?.filter((allUids) =>
    myProfile.following.includes(allUids)
  );

  const follower = allProfileUids?.filter((allUids) =>
    myProfile.follower.includes(allUids)
  );

  const getFollowerProfile = allProfile.filter((profile) =>
    follower.includes(profile.uid)
  );

  const getFollowingProfile = allProfile.filter((profile) =>
    following.includes(profile.uid)
  );

  //console.log(getFollowerProfile);
  //console.log(getFollowingProfile);

  const onChange = (e) => {
    setGetUserNickName(e.target.value);
    setIsActive(true);
    if (e.target.value === "") setIsActive(false);
    else setIsActive(true);
  };

  const showUserNickName = () => {
    console.log(getUserNickName);
    console.log(clickBtn);
    if (getUserNickName === "") {
      if (clickBtn === "팔로우") {
        console.log(11);
        return getFollowerProfile;
      } else {
        console.log(22);
        return getFollowingProfile;
      }
    } else {
      if (clickBtn === "팔로우") {
        console.log(33);
        return getFollowerProfile.filter((it) =>
          it.userNickName
            .toLocaleLowerCase()
            .includes(getUserNickName.toLocaleLowerCase())
        );
      } else {
        console.log(44);
        return getFollowingProfile.filter((it) =>
          it.userNickName
            .toLocaleLowerCase()
            .includes(getUserNickName.toLocaleLowerCase())
        );
      }
    }
    // return getUserNickName === ""
    //   ? clickBtn === "팔로우"
    //     ? getFollowerProfile
    //     : getFollowingProfile
    //   : clickBtn === "팔로우"
    //   ? getFollowerProfile.filter((it) =>
    //       it.userNickName
    //         .toLocaleLowerCase()
    //         .includes(getUserNickName.toLocaleLowerCase())
    //     )
    //   : getFollowingProfile.filter((it) =>
    //       it.userNickName
    //         .toLocaleLowerCase()
    //         .includes(getUserNickName.toLocaleLowerCase())
    //     );
  };
  showUserNickName();
  //console.log();

  const inputReset = () => {
    setGetUserNickName("");
    setIsActive(false);
  };

  return (
    <Wrapper $display={isClose}>
      <Title className="title">
        <H3>{clickBtn}</H3>
        <CloseBtn onClick={() => setIsClose(false)}>
          <IoCloseOutline />
        </CloseBtn>
      </Title>
      <SearchInputBox>
        <ItemArea>
          <RxMagnifyingGlass size={20} />
        </ItemArea>
        <SearchInput
          type="text"
          placeholder="검색"
          value={getUserNickName}
          onChange={onChange}
        ></SearchInput>
        <ItemArea
          className={`deleteBtn ${isActive ? "active" : ""}`}
          onClick={inputReset}
        >
          <AiOutlineClose size={12} />
        </ItemArea>
      </SearchInputBox>
      <SearchList>
        {getFollowerProfile.map((profile, idx) => {
          <UserInfo key={idx} profile={profile} />;
        })}
      </SearchList>
    </Wrapper>
  );
};

export default Follower;
