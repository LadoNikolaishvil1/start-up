import React, { useState, useRef } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useTheme } from "../../hooks/GetTheme.jsx";
import Login from "./LogIn.jsx";
import SignUp from "./SignUp.jsx";
import { useLocalStorage } from "usehooks-ts";
import ErrorPage from "../errorPage.jsx";

const AuthPages = () => {
  const [userType, setUserType] = useLocalStorage("userType", "");
  const [selectedTheme, setSelectedTheme] = useState("purple-blue");
  const resetAllRef = useRef(null);
  const colors = useTheme(selectedTheme, "light");
  const navigate = useNavigate();

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${colors.background}`}
    >
      {/* Page Content */}
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<Navigate to="login" replace />} />
          <Route
            path="login"
            element={
              <Login
                colors={colors}
                setCurrentPage={() => navigate("/auth/signup/userselect")}
                resetAll={() => {
                  if (resetAllRef.current) resetAllRef.current();
                }}
              />
            }
          />
          <Route
            path="signup/*"
            element={
              <SignUp
                colors={colors}
                userType={userType}
                setUserType={setUserType}
                setResetAll={(fn) => {
                  resetAllRef.current = fn;
                }}
              />
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default AuthPages;
