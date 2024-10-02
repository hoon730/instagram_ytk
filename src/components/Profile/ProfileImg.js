import React from "react";
import styled from "styled-components";

const ImgSection = styled.div`
  width: fit-content;
  cursor: pointer;
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
  background: ${({ type }) =>
    type === "active"
      ? "var(--bg-white-color)"
      : type === "inactive"
      ? "var(--bg-white-color)"
      : "transparent"};
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

const ProfileImg = ({ url, type, size, onClick }) => {
  return (
    <ImgSection onClick={onClick}>
      <ActivationArea size={size} type={type}>
        <BoundaryLine size={size} type={type}>
          <ImgBox size={size}>
            <Img src={url} alt="profile photo" />
          </ImgBox>
        </BoundaryLine>
      </ActivationArea>
    </ImgSection>
  );
};

export default ProfileImg;
