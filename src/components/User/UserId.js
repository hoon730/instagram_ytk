import React from "react";
import styled from "styled-components";

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
`;

const UserId = ({ type, userNickname, createDate, follwed }) => {
  console.log(createDate);
  return (
    <StyledSpan type={type}>
      {userNickname} <Check type={"active"} src="/images/check.svg" />
      <Date createDate={createDate}>
        <span>&middot;</span>{createDate}
      </Date>
      <IsFollowed follwed={follwed}>
        <span>&middot;</span>팔로우
      </IsFollowed>
    </StyledSpan>
  );
};

export default UserId;
