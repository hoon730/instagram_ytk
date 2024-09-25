import React from "react";
import styled from "styled-components";
import FooterListItem from "./FooterListItem";
import FooterListText from "./FooterListText";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 14px;
  ${({ color }) =>
    color === "darkGray" ? `color: #7E7E7E;` : `color: #bfbfbf;`}
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

const footerItemUrl1 = [
  "https://about.instagram.com/",
  "https://help.instagram.com/",
  "https://about.instagram.com/blog/",
  "https://developers.facebook.com/docs/instagram",
  "https://about.instagram.com/about-us/careers",
];

const footerItemName2 = [
  "개인정보처리방침",
  "약관",
  "위치",
  "언어",
  "Meta Verified",
];

const footerItemUrl2 = [
  "https://www.instagram.com/legal/privacy/",
  "https://www.instagram.com/legal/terms/",
  "/",
  "/",
  "https://www.instagram.com/accounts/meta_verified",
];

const Footer = ({ direction, color }) => {
  return (
    <Wrapper color={color}>
      <BtnListWrapper direction={direction}>
        <BtnList>
          {footerItemName1.map((it, idx) => (
            <>
              <FooterListItem text={it} url={footerItemUrl1[idx]} />
              <FooterListText text={"·"} />
            </>
          ))}
        </BtnList>
        <BtnList className="second_row">
          {footerItemName2.map((it, idx) => (
            <>
              <FooterListItem text={it} url={footerItemUrl2[idx]} />
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
