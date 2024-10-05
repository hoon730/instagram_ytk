import React from "react";
import styled from "styled-components";

const PicBox = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
`;

const Pic = styled.img`
  width: 100px;
  height: 100px;
  border: 1px solid lightgray;
  border-radius: 50%;
  background: #eee;
`;

const ChangePic = styled.div`
  width: 30px;
  height: 30px;
  background: var(--sub-purple-color);
  border-radius: 50%;
  position: absolute;
  bottom: 0;
  right: 0;
`;

const EditPicBox = () => {
  return (
    <PicBox>
      <Pic />
      <ChangePic></ChangePic>
    </PicBox>
  );
};

export default EditPicBox;
