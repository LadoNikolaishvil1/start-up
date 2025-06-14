import React, { useState } from "react";
import {
  Palette,
  Sun,
  Moon,
  Users,
  Building2,
  Heart,
  MessageCircle,
  Star,
  Check,
} from "lucide-react";
import themes, { useTheme } from "../hooks/GetTheme";
import Card from "../components/Card";

const Home = () => {
  const [selectedTheme, setSelectedTheme] = useState("purple-blue");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const themeColors = useTheme(selectedTheme, isDarkMode ? "dark" : "light");
  const colors = themeColors;
  const currentTheme = themes[selectedTheme];

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${colors.background}`}
    >
      {/* Header */}
      <div className={`${colors.card} ${colors.border} border-b px-8 py-6`}>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${colors.accent} ${colors.text} transition-colors`}
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
            <span className="font-medium">{isDarkMode ? "Light" : "Dark"}</span>
          </button>
        </div>
      </div>

      <div className="px-8 py-8">
        {/* Theme Selector */}
        <div className="mb-8">
          <h2
            className={`text-2xl font-bold ${colors.text} mb-6 flex items-center gap-2`}
          >
            <Palette className="w-6 h-6" />
            Theme Options
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(themes).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => setSelectedTheme(key)}
                className={`relative p-4 rounded-xl border-2 transition-all ${
                  selectedTheme === key
                    ? `${colors.border} shadow-lg`
                    : `${colors.border} hover:shadow-md`
                } ${colors.card}`}
              >
                {selectedTheme === key && (
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
                    <Check className="w-4 h-4" />
                  </div>
                )}

                <div className="text-center">
                  <div
                    className={`w-full h-8 bg-gradient-to-r ${
                      isDarkMode ? theme.dark.primary : theme.light.primary
                    } rounded-lg mb-3`}
                  ></div>
                  <h3 className={`font-medium text-sm ${colors.text}`}>
                    {theme.name}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Preview Section */}
        <div className="mb-8">
          <h2 className={`text-2xl font-bold ${colors.text} mb-6`}>
            Live Preview - {currentTheme.name} ({isDarkMode ? "Dark" : "Light"})
          </h2>

          {/* Mock Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div
              className={`${colors.card} rounded-xl shadow-lg p-6 ${colors.border} border`}
            >
              <h3
                className={`text-xl font-bold bg-gradient-to-r ${colors.primary} bg-clip-text text-transparent mb-6`}
              >
                SponsorLink
              </h3>

              <div className="space-y-3">
                <div
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${colors.accent}`}
                >
                  <Users className="w-5 h-5" />
                  <span className={`font-medium ${colors.text}`}>Browse</span>
                </div>
                <div
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${colors.textSecondary}`}
                >
                  <Heart className="w-5 h-5" />
                  <span>Matches</span>
                </div>
                <div
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${colors.textSecondary}`}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Messages</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <div>
                    <p className={`font-medium ${colors.text}`}>John Doe</p>
                    <p className={`text-xs ${colors.textSecondary}`}>
                      @johndoe
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mock Cards */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <Card type="influencer" themeColors={themeColors} />
                <Card type="company" themeColors={themeColors} />
                <Card type="influencer" themeColors={themeColors} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
