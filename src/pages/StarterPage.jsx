import React, { useState } from "react";
import { useTheme } from "../hooks/GetTheme";
// import LogIn from "./LogIn.jsx";
import UserSelect from "./UserSellect";
import SignIn from "./SignIn";

const AuthPages = () => {
  const [currentPage, setCurrentPage] = useState("login");
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
        <SignIn colors={colors} />
        {/* {currentPage === "login" && <LogIn colors={colors} />}
        {currentPage === "userType" && <UserSelect colors={colors} />}
        {currentPage === "signup" && <SignIn colors={colors} />} */}
      </div>

      {/* Demo Navigation */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <div
          className={`flex space-x-2 ${colors.card} ${colors.border} border rounded-lg p-2 shadow-lg`}
        >
          <button
            onClick={() => setCurrentPage("login")}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              currentPage === "login"
                ? `${colors.primarySolid} text-white`
                : `${colors.textSecondary} hover:${colors.text}`
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setCurrentPage("userType")}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              currentPage === "userType"
                ? `${colors.primarySolid} text-white`
                : `${colors.textSecondary} hover:${colors.text}`
            }`}
          >
            User Type
          </button>
          <button
            onClick={() => setCurrentPage("signup")}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              currentPage === "signup"
                ? `${colors.primarySolid} text-white`
                : `${colors.textSecondary} hover:${colors.text}`
            }`}
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPages;
