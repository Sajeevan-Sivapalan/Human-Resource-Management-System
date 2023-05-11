import React from "react";
import { useNavigate } from "react-router-dom";

function useAuth() {
  const validateSession = () => {
    // authenticate user and set user state
    const username = localStorage.getItem("username");
    const logged = username ? true : false;
    return logged;
  };

  return { validateSession };
}

export { useAuth };
