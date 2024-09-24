import React from "react";
import styled from "styled-components";

const ImgSection = styled.div`
  width: fit-content;
  cursor: pointer;
`;

const ActivationArea = styled.span`
  display: inline-block;
  width: ${({ size }) => (size ? size : 96)}px;
  height: ${({ size }) => (size ? size : 96)}px;
  ${({ type }) =>
    type === "active"
      ? "background: var(--main-color)"
      : "background: var(--light-gray-color)"};
  border-radius: 50%;
  position: relative;
`;

const BoundaryLine = styled.span`
  display: inline-block;
  width: ${({ size }) => (size ? size - 5 : 91)}px;
  height: ${({ size }) => (size ? size - 5 : 91)}px;
  background: #fff;
  border-radius: 50%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ImgBox = styled.span`
  display: inline-block;
  width: ${({ size }) => (size ? size - 10 : 86)}px;
  height: ${({ size }) => (size ? size - 10 : 86)}px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
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
        <BoundaryLine size={size}>
          <ImgBox size={size}>
            <Img src={url} alt="profile photo" />
          </ImgBox>
        </BoundaryLine>
      </ActivationArea>
    </ImgSection>
  );
};

export default ProfileImg;
