import React from "react";
import { FacebookAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { auth } from "../firebase";

const FBLogin = styled.div`
  display: flex;
  width: 100%;
  padding: 15px 0;
  /* justify-content: start;
  align-items: start; */
  color: var(--sub-purple-color);
`;

const FbClick = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const FbBtn = () => {
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const auth = getAuth();
      auth.languageCode = "it";
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <FBLogin>
      <FbClick onClick={onClick}>
        <FontAwesomeIcon icon={faFacebook} />
        Facebook으로 로그인
      </FbClick>
    </FBLogin>
  );
};

export default FbBtn;
