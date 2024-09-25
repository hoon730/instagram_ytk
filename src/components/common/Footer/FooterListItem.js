import React from "react";
import styled from "styled-components";

const ListItem = styled.a`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const FooterListItem = ({ text, url }) => {
  return (
    <ListItem href={url} target="_blank">
      {text}
    </ListItem>
  );
};

export default FooterListItem;
