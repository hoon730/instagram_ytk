import React from "react";
import styled from "styled-components";

const StyledSpan = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: var(--font-14);
  color: var(--gray-color);
  ${({ createDate }) => (createDate ? `display : block;` : `display : none;`)}
`;

const IsFollowed = styled.span``;

const UserId = ({ type, userNickname, createDate }) => {
  return (
    <StyledSpan type={type}>
      {userNickname} <Check src="/images/check.svg" />{" "}
      <Date>&middot;{createDate}</Date>
      <IsFollowed>&middot;{createDate}</IsFollowed>
    </StyledSpan>
  );
};

export default UserId;
