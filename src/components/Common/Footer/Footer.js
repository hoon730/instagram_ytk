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
    color === "darkGray"
      ? `color: var(--dark-gray-color);`
      : `color: var(--gray-color);`}
`;

const BtnListWrapper = styled.div`
  display: flex;
  ${({ direction }) =>
    direction === "column" ? `flex-direction: column;  gap: 8px;` : `flex-direction: row; gap: 2px;`}
  margin-top: 30px;
  margin-bottom: 15px;
`;

const BtnList = styled.div`
  display: flex;
  gap: 1px;
`;

const ItemObject = styled.ul`
  display: flex;
  gap: 1px;
  &.second_row {
    &:last-child li:last-child {
      display: none;
    }
  }
`;

const footerItemName1 = [
  {
    name: "소개",
    url: "https://about.instagram.com/",
  },
  {
    name: "도움말",
    url: "https://help.instagram.com/",
  },
  {
    name: "홍보 센터",
    url: "https://about.instagram.com/blog/",
  },
  {
    name: "API",
    url: "https://developers.facebook.com/docs/instagram",
  },
  {
    name: "채용 정보",
    url: "https://about.instagram.com/about-us/careers",
  },
];

const footerItemName2 = [
  {
    name: "개인정보처리방침",
    url: "https://www.instagram.com/legal/privacy/",
  },
  {
    name: "약관",
    url: "https://www.instagram.com/legal/terms/",
  },
  {
    name: "위치",
    url: "/",
  },
  {
    name: "언어",
    url: "/",
  },
  {
    name: "Meta Verified",
    url: "https://www.instagram.com/accounts/meta_verified",
  },
];

const Footer = ({ direction, color }) => {
  return (
    <Wrapper color={color}>
      <BtnListWrapper direction={direction}>
        <BtnList>
          {footerItemName1.map((it, idx) => (
            <ItemObject key={`footerFirstItem${idx}`}>
              <FooterListItem text={it.name} url={it.url} />
              <FooterListText text={"·"} />
            </ItemObject>
          ))}
        </BtnList>
        <BtnList>
          {footerItemName2.map((it, idx) => (
            <ItemObject key={`footerSecondItem${idx}`} className="second_row">
              <FooterListItem text={it.name} url={it.url} />
              <FooterListText text={"·"} />
            </ItemObject>
          ))}
        </BtnList>
      </BtnListWrapper>
      <FooterListText text={"© 2024 INSTAGRAM FROM META"} />
    </Wrapper>
  );
};

export default Footer;
