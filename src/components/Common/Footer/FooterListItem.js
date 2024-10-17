import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ListItem = styled(Link)`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const FooterListItem = ({ text, url }) => {
  return (
    <ListItem to={url} target="_blank">
      {text}
    </ListItem>
  );
};

export default FooterListItem;
