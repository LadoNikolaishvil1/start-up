import React, { useState } from "react";
import {
  Sun,
  Moon,
  Users,
  Heart,
  MessageCircle,
  Star,
  Settings as SettingsIcon,
} from "lucide-react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import themes, { useTheme } from "../../hooks/GetTheme";
import Browse from "./Browse";
import Matches from "./Matches";
import Messages from "./Messages";
import Settings from "./Settings";
import Recommended from "./Recommended";

const Home = () => {
  const [selectedTheme, setSelectedTheme] = useState("purple-blue");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const themeColors = useTheme(selectedTheme, isDarkMode ? "dark" : "light");
  const colors = themeColors;

  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      label: "Browse",
      icon: <Users className="w-5 h-5" />,
      path: "/home/browse",
    },
    {
      label: "Matches",
      icon: <Heart className="w-5 h-5" />,
      path: "/home/matches",
    },
    {
      label: "Messages",
      icon: <MessageCircle className="w-5 h-5" />,
      path: "/home/messages",
    },
    {
      label: "Recommended",
      icon: <Star className="w-5 h-5" />,
      path: "/home/recommended",
    },
    {
      label: "Settings",
      icon: <SettingsIcon className="w-5 h-5" />,
      path: "/home/settings",
    },
  ];

  return (
    <div
      className={`min-h-screen flex transition-colors duration-500 ${colors.background}`}
    >
      {/* Sidebar */}
      <div
        className={`${colors.card} rounded-xl shadow-lg p-6 w-70 min-h-screen ${colors.border} border flex flex-col`}
      >
        <h3
          className={`text-xl font-bold bg-gradient-to-r ${colors.primary} bg-clip-text text-transparent mb-6`}
        >
          SponsorLink
        </h3>

        <div className="space-y-3 flex-1">
          {navItems.map((item) => (
            <div
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                location.pathname === item.path
                  ? `${colors.accent} ${colors.text}`
                  : `${colors.textSecondary} hover:${colors.text}`
              }`}
            >
              {item.icon}
              <span className={`font-medium`}>{item.label}</span>
            </div>
          ))}
          <div className="flex items-center space-x-4 mt-6">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${colors.accent} ${colors.text} transition-colors`}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
              <span className="font-medium">
                {isDarkMode ? "Light" : "Dark"}
              </span>
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div>
              <p className={`font-medium ${colors.text}`}>John Doe</p>
              <p className={`text-xs ${colors.textSecondary}`}>@johndoe</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-8 w-full max-h-[100vh] overflow-y-scroll">
        <Routes>
          <Route path="/" element={<Navigate to="/home/browse" replace />} />
          <Route
            path="/browse"
            element={<Browse themeColors={themeColors} />}
          />
          <Route path="/matches" element={<Matches />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/recommended" element={<Recommended />} />
          <Route
            path="/settings"
            element={
              <Settings
                colors={colors}
                selectedTheme={selectedTheme}
                setSelectedTheme={setSelectedTheme}
                themes={themes}
                isDarkMode={isDarkMode}
              />
            }
          />
          <Route
            path="*"
            element={<Navigate to="/home/browse" replace />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
