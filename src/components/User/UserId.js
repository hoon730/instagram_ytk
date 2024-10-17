import React, { useState, useRef } from "react";
import styled from "styled-components";
import MoreItem from "../Common/More/MoreItem";
import HoverProfile from "./HoverProfile";
import { getFormattedDate } from "../../utils/utils";
import { LuMoreHorizontal } from "react-icons/lu";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";
import { createSearchParams, useNavigate } from "react-router-dom";

const Wrapper = styled.span`
  width: ${({ type }) => (type === "notification" ? "" : "100%")};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledSpan = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  ${({ type }) =>
    type === "feed"
      ? `font-size: var(--font-16); font-weight: var(--font-bold);`
      : type === "hover"
      ? `font-size: var(--font-16); font-weight: var(--font-bold);`
      : `font-size: var(--font-14); font-weight: var(--font-bold);`}
  @media screen and (max-width: 770px) {
    gap: 4px;
    font-size: var(--font-12);
  }
`;

const IdSpan = styled.div`
  position: relative;
  color: ${({ theme }) => theme.fontColor};
  cursor: pointer;
  @media screen and (max-width: 1024px) {
    font-size: var(--font-14);
  }
`;

const Check = styled.img`
  width: 18px;
  @media screen and (max-width: 770px) {
    width: 14px;
  }
`;

const Content = styled.span`
  font-size: 13px;
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
  @media screen and (max-width: 770px) {
    font-size: var(--font-12);
    gap: 4px;
    ${({ type }) => (type === "feed" ? "display: none;" : "")}
  }
`;

const IsFollowed = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: var(--font-14);
  font-weight: var(--font-bold);
  color: ${({ theme }) => theme.subColor};
  cursor: pointer;
  @media screen and (max-width: 1024px) {
    font-size: var(--font-12);
    gap: 4px;
  }
`;

const MoreBtn = styled.button`
  display: flex;
  align-items: center;
  svg {
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
  z-index: 5;
`;

const MoreList = styled.div`
  width: 380px;
  background: ${({ theme }) => theme.bgColor};
  border-radius: var(--border-radius-12);
  overflow: hidden;
`;

const CancelBtn = styled.div`
  width: 100%;
  padding: 12px;
  font-size: var(--font-14);
  text-align: center;
  cursor: pointer;

  &:hover {
    color: var(--gray-color);
  }
  color: ${({ theme }) => theme.fontColor};
`;

const HeartBtn = styled.button`
  svg {
    color: ${({ $color }) => ($color ? `crimson` : `var(--bg-black-color)`)};
    font-size: var(--font-14);
  }
`;

const UserId = ({
  type,
  userNickname,
  check,
  content,
  createdAt,
  follwed,
  btn,
  hover,
  top,
  feed,
  onClick,
  setIsEditing,
  uid,
}) => {
  const [openMore, setOpenMore] = useState(false);
  const [switchHeart, setSwitchHeart] = useState(false);
  const [hoverId, setHoverId] = useState(false);
  const [position, setPosition] = useState(null);
  const moreBgRef = useRef();
  const navigate = useNavigate();

  const idRef = useRef(null);
  const showProfile = () => {
    if (idRef.current) {
      const rect = idRef.current.getBoundingClientRect();
      setPosition([parseInt(rect.left), parseInt(rect.top)]);
    }
    setHoverId(true);
  };
  const hideProfile = () => {
    setPosition([0, 0]);
    setHoverId(false);
  };

  const handleEditing = () => {
    onClick();
  };

  return (
    <Wrapper className="user-wrapper" type={type}>
      <StyledSpan type={type}>
        <IdSpan
          className="user-id"
          onMouseEnter={showProfile}
          onMouseLeave={hideProfile}
          onClick={() =>
            navigate({
              pathname: "/profile",
              search: `?${createSearchParams({
                userId: userNickname,
              })}`,
            })
          }
          ref={idRef}
        >
          {!hover && hoverId ? (
            <HoverProfile
              target={"id"}
              top={"22"}
              type={type}
              uid={uid}
              position={position}
            />
          ) : null}
          {userNickname}
        </IdSpan>
        {check === "active" ? (
          <Check className="user-check" src="/images/check.svg" />
        ) : null}
        {content ? <Content>{content}</Content> : null}
        {createdAt ? (
          <Date className="user-date" type={type}>
            <span>&middot;</span>
            <span>{getFormattedDate(createdAt)}</span>
          </Date>
        ) : null}
        {follwed ? (
          <IsFollowed className="user-followed">
            <span>&middot;</span>
            <span>{follwed}</span>
          </IsFollowed>
        ) : null}
      </StyledSpan>
      {btn === "more" ? (
        <MoreBtn onClick={() => setOpenMore(true)}>
          <LuMoreHorizontal size={22} />
        </MoreBtn>
      ) : btn === "heart" ? (
        <HeartBtn
          $color={switchHeart}
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
            {feed === "myfeed" ? (
              <>
                <MoreItem
                  text={"삭제"}
                  padding={"12px"}
                  fontSize={"14"}
                  onClick={onClick}
                  setOpenMore={setOpenMore}
                />
                <MoreItem
                  text={"수정"}
                  padding={"12px"}
                  fontSize={"14"}
                  setIsEditing={setIsEditing}
                  setOpenMore={setOpenMore}
                />
              </>
            ) : (
              <>
                <MoreItem text={"신고"} padding={"12px"} fontSize={"14"} />
                <MoreItem
                  text={"게시물로 이동"}
                  padding={"12px"}
                  fontSize={"14"}
                />
              </>
            )}

            <MoreItem text={"공유 대상..."} padding={"12px"} fontSize={"14"} />
            <MoreItem text={"링크 복사"} padding={"12px"} fontSize={"14"} />
            <MoreItem text={"퍼가기"} padding={"12px"} fontSize={"14"} />
            <MoreItem text={"이 계정 정보"} padding={"12px"} fontSize={"14"} />
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
