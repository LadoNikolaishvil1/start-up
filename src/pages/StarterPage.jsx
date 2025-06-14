import React, { useState } from "react";
import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import { useTheme } from "../hooks/GetTheme";
import Login from "./login";
import UserSelect from "./UserSellect";
import SignUp from "./SignUp";

const AuthPages = () => {
  const [userType, setUserType] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("purple-blue");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    handle: "",
    companyName: "",
    website: "",
    followers: "",
    category: "",
    industry: "",
    agreeTerms: false,
  });

  const colors = useTheme(selectedTheme, isDarkMode ? "dark" : "light");
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${colors.background}`}
    >
      {/* Theme Toggle (for demo) */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`p-2 rounded-lg ${colors.card} ${colors.border} border shadow-lg hover:shadow-xl transition-all`}
        >
          {isDarkMode ? "🌞" : "🌙"}
        </button>
      </div>

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br ${colors.primary} opacity-10 rounded-full blur-3xl`}
        />
        <div
          className={`absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr ${colors.primary} opacity-10 rounded-full blur-3xl`}
        />
      </div>

      {/* Page Content */}
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<Navigate to="/LogIn" replace />} />
          <Route
            path="/LogIn"
            element={
              <Login
                colors={colors}
                setCurrentPage={() => navigate("/userSelect")}
                formData={formData}
                handleInputChange={handleInputChange}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            }
          />
          <Route
            path="/UserSelect"
            element={
              <UserSelect
                colors={colors}
                userType={userType}
                setUserType={setUserType}
                setCurrentPage={(page) => navigate(`/${page}`)}
              />
            }
          />
          <Route
            path="/SignUp"
            element={
              userType ? (
                <SignUp
                  colors={colors}
                  userType={userType}
                  setCurrentPage={() => navigate("/LogIn")}
                  formData={formData}
                  handleInputChange={handleInputChange}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  showConfirmPassword={showConfirmPassword}
                  setShowConfirmPassword={setShowConfirmPassword}
                />
              ) : (
                <Navigate to="/UserSelect" replace />
              )
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default AuthPages;
