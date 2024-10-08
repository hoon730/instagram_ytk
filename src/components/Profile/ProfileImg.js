import React, { useState } from "react";
import styled from "styled-components";
import HoverProfile from "../User/HoverProfile";

const ImgSection = styled.div`
  width: fit-content;
  cursor: pointer;
  position: relative;
`;

const ActivationArea = styled.span`
  display: inline-block;
  width: ${({ size }) => `${size || 96}`}px;
  height: ${({ size }) => `${size || 96}`}px;
  background: ${({ type }) =>
    type === "active"
      ? "var(--main-color)"
      : type === "inactive"
      ? "var(--light-gray-color)"
      : "transparent"};
  border-radius: 50%;
`;

const BoundaryLine = styled.span`
  display: inline-block;
  width: ${({ size }) => `${size - 4 || 91}`}px;
  height: ${({ size }) => `${size - 4 || 91}`}px;
  background: ${({ theme }) => theme.bgColor};
  border-radius: 50%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
`;

const ImgBox = styled.span`
  display: inline-block;
  width: ${({ size }) => `${size - 8 || 86}`}px;
  height: ${({ size }) => `${size - 8 || 86}`}px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  z-index: 0;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProfileImg = ({ url, type, size, onClick, hover, top }) => {
  const [hoverImg, setHoverImg] = useState(false);

  const showProfile = () => {
    setHoverImg(true);
  };

  const hideProfile = () => {
    setHoverImg(false);
  };

  return (
    <ImgSection
      onClick={onClick}
      onMouseEnter={showProfile}
      onMouseLeave={hideProfile}
    >
      {!hover && hoverImg ? <HoverProfile target={"img"} top={"45"} /> : null}
      <ActivationArea className="storyFirstCircle" size={size} type={type}>
        <BoundaryLine className="storySecondCircle" size={size} type={type}>
          <ImgBox className="storyThirdCircle" size={size}>
            <Img src={url} alt="profile photo" />
          </ImgBox>
        </BoundaryLine>
      </ActivationArea>
    </ImgSection>
  );
};

export default ProfileImg;
