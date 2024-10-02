import React, { useState, useRef } from "react";
import styled from "styled-components";
import MoreItem from "../Common/More/MoreItem";
import HoverProfile from "./HoverProfile";
import { LuMoreHorizontal } from "react-icons/lu";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";

const Wrapper = styled.span`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 3;
`;

const StyledSpan = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  ${({ type }) =>
    type === "feed"
      ? `font-size: var(--font-14); font-weight: var(--font-bold);`
      : type === "hover"
      ? `font-size: var(--font-16); font-weight: var(--font-bold);`
      : `font-size: var(--font-14); font-weight: var(--font-bold);`}
`;

const UserIdArea = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const IdSpan = styled.div`
  position: relative;
  cursor: pointer;
`;

const Check = styled.img`
  width: 18px;
`;

const Comment = styled.span`
  font-size: var(--font-14);
  font-weight: var(--font-medium);
`;

const Date = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: var(--font-14);
  font-weight: var(--font-regular);
  color: var(--gray-color);
`;

const IsFollowed = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: var(--font-14);
  font-weight: var(--font-bold);
  color: var(--sub-purple-color);
  cursor: pointer;
`;

const MoreBtn = styled.button`
  display: flex;
  align-items: center;
  svg {
    font-size: var(--font-18);
    color: var(--dark-gray-color);
  }
`;

const MoreBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

const MoreList = styled.div`
  width: 450px;
  background: var(--bg-white-color);
  border-radius: var(--border-radius-12);
`;

const CancelBtn = styled.button`
  width: 100%;
  padding: 20px 0;
  font-size: var(--font-14);
  text-align: center;
`;

const HeartBtn = styled.button`
  svg {
    color: ${({ color }) => (color ? `crimson` : `var(--bg-black-color)`)};
    font-size: var(--font-14);
  }
`;

const UserId = ({
  type,
  userNickname,
  check,
  comment,
  createDate,
  follwed,
  btn,
}) => {
  const [openMore, setOpenMore] = useState(false);
  const [switchHeart, setSwitchHeart] = useState(false);
  const [hover, setHover] = useState(false);
  const moreBgRef = useRef();

  const showProfile = () => {
    setHover(true);
  };
  const hideProfile = () => {
    setHover(false);
  };

  return (
    <Wrapper>
      <StyledSpan type={type}>
        <IdSpan onMouseEnter={showProfile} onMouseLeave={hideProfile}>
          {hover ? <HoverProfile /> : null}
          {userNickname}
        </IdSpan>
        {check === "active" ? <Check src="/images/check.svg" /> : null}
        {comment ? <Comment>{comment}</Comment> : null}
        {createDate ? (
          <Date>
            <span>&middot;</span>
            {createDate}
          </Date>
        ) : null}
        {follwed ? (
          <IsFollowed>
            <span>&middot;{follwed}</span>{" "}
          </IsFollowed>
        ) : null}
      </StyledSpan>
      {btn === "more" ? (
        <MoreBtn onClick={() => setOpenMore(true)}>
          <LuMoreHorizontal />
        </MoreBtn>
      ) : btn === "heart" ? (
        <HeartBtn
          color={switchHeart}
          onClick={() => setSwitchHeart((switchHeart) => !switchHeart)}
        >
          {switchHeart ? <IoHeartSharp /> : <IoHeartOutline />}
        </HeartBtn>
      ) : null}

      {openMore && (
        <MoreBackground
          ref={moreBgRef}
          onClick={(e) => {
            if (e.target === moreBgRef.current) {
              setOpenMore(false);
            }
          }}
        >
          <MoreList>
            <MoreItem text={"신고"} />
            <MoreItem text={"게시물로 이동"} />
            <MoreItem text={"공유 대상..."} />
            <MoreItem text={"링크 복사"} />
            <MoreItem text={"퍼가기"} />
            <MoreItem text={"이 계정 정보"} />
            <CancelBtn
              onClick={() => {
                setOpenMore(false);
              }}
            >
              취소
            </CancelBtn>
          </MoreList>
        </MoreBackground>
      )}
    </Wrapper>
  );
};

export default UserId;
