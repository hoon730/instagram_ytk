import React from "react";
import styled from "styled-components";
import FooterListItem from "./FooterListItem";
import FooterListText from "./FooterListText";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const BtnListWrapper = styled.div`
  display: flex;
  ${({ direction }) =>
    direction === "column" ? `flex-direction: column;` : `flex-direction: row;`}
  gap: 2px;
  margin-top: 30px;
  margin-bottom: 15px;
`;

const BtnList = styled.ul`
  display: flex;
  gap: 1px;
  &.second_row {
    & li:last-child {
      display: none;
    }
  }
`;

const footerItemName1 = ["소개", "도움말", "홍보 센터", "API", "채용 정보"];

const footerItemName2 = [
  "개인정보처리방침",
  "약관",
  "위치",
  "언어",
  "Meta Verified",
];

const Footer = ({ direction }) => {
  return (
    <Wrapper>
      <BtnListWrapper direction={direction}>
        <BtnList>
          {footerItemName1.map((it) => (
            <>
              <FooterListItem text={it} />
              <FooterListText text={"·"} />
            </>
          ))}
        </BtnList>
        <BtnList className="second_row">
          {footerItemName2.map((it) => (
            <>
              <FooterListItem text={it} />
              <FooterListText text={"·"} />
            </>
          ))}
        </BtnList>
      </BtnListWrapper>
      <FooterListText text={"© 2024 INSTAGRAM FROM META"} />
    </Wrapper>
  );
};

export default Footer;
