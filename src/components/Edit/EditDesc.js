import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;

  @media screen and (max-width: 630px) {
    margin-bottom: 20px;
  }

  ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media screen and (max-width: 630px) {
      gap: 15px;
    }

    li {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      input {
        padding-left: 15px;
        flex: 17;
        height: 45px;
        border: 2px solid ${({ theme }) => theme.borderColor};
        border-radius: var(--border-radius-8);
        color: ${({ theme }) => theme.fontColor};
        background: ${({ theme }) => theme.bgColor};
        font-size: var(--font-16);
        &::placeholder {
          color: var(--gray-color);
          opacity: 1;
          transition: opacity 0.3s;
        }
        &:focus {
          &::placeholder {
            opacity: 0;
          }
          outline: none;
          border-color: ${({ theme }) => theme.subColor};
          & ~ div {
            color: ${({ theme }) => theme.subColor};
          }
        }
        @media screen and (max-width: 500px) {
          height: 38px;
          font-size: var(--font-14);
        }
      }
      label {
        flex: 2;
      }
      textarea {
        padding: 8px 10px 8px 15px;
        flex: 17;
        height: 70px;
        border: 2px solid ${({ theme }) => theme.borderColor};
        border-radius: var(--border-radius-8);
        color: ${({ theme }) => theme.fontColor};
        background: ${({ theme }) => theme.bgColor};
        font-size: var(--font-size-14);
        resize: none;
        /* resize: vertical; */
        overflow-y: scroll;
        /* overflow-y: auto; */
        box-sizing: border-box;

        &::placeholder {
          color: var(--gray-color);
          opacity: 1;
          transition: opacity 0.3s;
        }
        &:focus {
          &::placeholder {
            opacity: 0;
          }
          outline: none;
          border-color: ${({ theme }) => theme.subColor};
          & ~ div {
            color: ${({ theme }) => theme.subColor};
          }
        }
        @media screen and (max-width: 500px) {
          height: 60px;
          font-size: var(--font-14);
        }
      }
    }
  }
`;

const EditDesc = ({
  handleUserName,
  handleIntro,
  handleLink,
  userName,
  intro,
  link,
  myProfile,
}) => {
  return (
    <Wrapper>
      <ul>
        <li>
          <label htmlFor="name">이름</label>
          <input
            value={userName}
            name="이름"
            type="text"
            id="name"
            onChange={handleUserName}
            placeholder={myProfile ? myProfile.userId : "이름"}
          />
        </li>
        <li>
          <label htmlFor="intro">소개</label>
          <textarea
            maxLength={150}
            value={intro}
            name="소개"
            type="textarea"
            id="intro"
            onChange={handleIntro}
            placeholder={myProfile ? myProfile.introduction : "소개"}
            col="150"
            rows="2"
          ></textarea>
        </li>
        <li>
          <label htmlFor="link">링크</label>
          <input
            value={link}
            name="링크"
            type="url"
            id="link"
            onChange={handleLink}
            placeholder={myProfile ? myProfile.website : "링크"}
          />
        </li>
      </ul>
    </Wrapper>
  );
};

export default EditDesc;
