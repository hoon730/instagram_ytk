import React from "react";
import styled from "styled-components";

const ListItem = styled.li`
  color: #bfbfbf;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const FooterListItem = ({ text }) => {
  return <ListItem>{text}</ListItem>;
};

export default FooterListItem;
