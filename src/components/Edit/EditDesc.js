import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;
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
        border: 1px solid ${({ theme }) => theme.borderColor};
        border-radius: var(--border-radius-8);
        font-size: var(--font-size-14);
        &:focus {
          outline: none;
        }
      }
      label {
        flex: 2;
      }
      textarea {
        padding-left: 15px;
        flex: 17;
        height: 45px;
        border: 1px solid ${({ theme }) => theme.borderColor};
        border-radius: var(--border-radius-8);
        font-size: var(--font-size-14);
        resize: none;
        &:focus {
          outline: none;
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
}) => {
  return (
    <Wrapper>
      <ul>
        <li>
          <label htmlFor="name">이름</label>
          <input value={userName} name="이름" type="text" id="name" onChange={handleUserName} />
        </li>
        <li>
          <label htmlFor="intro">소개</label>
          <textarea
            value={intro}
            name="이름"
            type="textarea"
            id="intro"
            onChange={handleIntro}
          />
        </li>
        <li>
          <label htmlFor="link">링크</label>
          <input value={link} name="링크" type="url" id="link" onChange={handleLink} />
        </li>
      </ul>
    </Wrapper>
  );
};

export default EditDesc;
