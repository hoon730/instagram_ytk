import React, { useState } from "react";
import styled from "styled-components";
import Button from "../Common/Button";
import MbRecommend from "../Detail/MbRecommend";
import Setup from "../../pages/Setup";

const Wrapper = styled.div`
  display: none;
  @media screen and (max-width: 630px) {
    display: block;
  }
`;

const Buttons = styled.div`
  padding: 20px 10px 0;
  display: flex;
  justify-content: space-between;
`;

const MbButtons = ({ myProfile }) => {
  const [isRecommend, setIsRecommend] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    setIsOpen((current) => !current);
  };

  return (
    <Wrapper>
      <Buttons>
        <Button
          width={"42%"}
          height={"40px"}
          fontSize={"14"}
          type={"negative"}
          text={"프로필 편집"}
          onClick={onClick}
        />
        {isOpen ? <Setup onClick={onClick} myProfile={myProfile} /> : null}
        <Button
          width={"42%"}
          height={"40px"}
          fontSize={"14"}
          type={"negative"}
          text={"프로필 공유"}
        />
        <Button
          width={"10%"}
          height={"40px"}
          type={"negative"}
          followed={"unfollowed"}
          onClick={() => setIsRecommend((current) => !current)}
        />
      </Buttons>
      {isRecommend ? <MbRecommend /> : null}
    </Wrapper>
  );
};

export default MbButtons;
