import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
`;

const SytledForm = styled.form`
  width: 100%;
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
        border: 1px solid var(--light-gray-color);
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
        border: 1px solid var(--light-gray-color);
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

const EditDesc = () => {
  return (
    <Wrapper>
      <SytledForm method="get">
        <ul>
          <li>
            <label htmlFor="name">이름</label>
            <input name="이름" type="text" id="name" />
          </li>
          <li>
            <label htmlFor="intro">소개</label>
            <textarea name="이름" type="textarea" id="intro" />
          </li>
          <li>
            <label htmlFor="link">링크</label>
            <input name="링크" type="url" id="link" />
          </li>
        </ul>
      </SytledForm>
    </Wrapper>
  );
};

export default EditDesc;
