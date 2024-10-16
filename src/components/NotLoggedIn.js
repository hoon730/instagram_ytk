import React from "react";
import { auth } from "../utils/firebase";
import { Navigate } from "react-router-dom";

const NotLoggedIn = ({ children }) => {
  const user = auth.currentUser;
  //console.log(user);
  if (user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default NotLoggedIn;
