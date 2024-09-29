import React, { useState, useRef } from "react";
import styled from "styled-components";
import { LuMoreHorizontal } from "react-icons/lu";
import MoreItem from "../Common/More/MoreItem";

const Wrapper = styled.div`
  width: 100%;
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
      ? `font-size: var(--font-20); font-weight: var(--font-bold);`
      : `font-size: var(--font-16); font-weight: var(--font-bold);`}
`;

const IdSpan = styled.span`
  cursor: pointer;
`;

const Check = styled.img`
  ${({ type }) => (type === "active" ? `display: block;` : `display: none;`)}
`;

const Date = styled.div`
  ${({ createDate }) => (createDate ? `display : flex;` : `display : none;`)}
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: var(--font-14);
  font-weight: var(--font-regular);
  color: var(--gray-color);
`;

const IsFollowed = styled.span`
  ${({ follwed }) => (follwed ? `display: flex;` : `display: none`)}
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
    color: var(--gray-color);
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

const UserId = ({ type, userNickname, createDate, follwed }) => {
  const [openMore, setOpenMore] = useState(false);
  const moreBgRef = useRef();

  return (
    <Wrapper>
      <StyledSpan type={type}>
        <IdSpan>{userNickname}</IdSpan>
        <Check type={"active"} src="/images/check.svg" />
        <Date createDate={createDate}>
          <span>&middot;</span>
          {createDate}
        </Date>
        <IsFollowed follwed={follwed}>
          <span>&middot;</span>팔로우
        </IsFollowed>
      </StyledSpan>
      <MoreBtn onClick={() => setOpenMore(true)}>
        <LuMoreHorizontal />
      </MoreBtn>
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
