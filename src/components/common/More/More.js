import React from "react";
import styled from "styled-components";
import MoreItem from "./MoreItem";

const MoreList = styled.div`
  margin-top: 100px;
  max-width: 550px;
  background: var(--bg-white-color);
  border-radius: var(--border-radius-12);
`;

const CancelBtn = styled.button`
  width: 100%;
  padding: 25px 0;
  font-size: var(--font-18);
  text-align: center;
`;

const MoreModal = () => {
  return (
    <MoreList>
      <MoreItem text={"신고"} />
      <MoreItem text={"관심 없음"} />
      <CancelBtn>취소</CancelBtn>
    </MoreList>
  );
};

export default MoreModal;
