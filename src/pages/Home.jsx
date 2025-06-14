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

const ColorThemeShowcase = () => {
  const [selectedTheme, setSelectedTheme] = useState("purple-blue");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const themes = {
    "purple-blue": {
      name: "Purple Blue (Current)",
      light: {
        primary: "from-purple-600 to-blue-600",
        primarySolid: "bg-purple-600",
        secondary: "bg-blue-100",
        accent: "bg-purple-100",
        background: "bg-gray-50",
        card: "bg-white",
        text: "text-gray-900",
        textSecondary: "text-gray-600",
        border: "border-gray-200",
      },
      dark: {
        primary: "from-purple-500 to-blue-500",
        primarySolid: "bg-purple-500",
        secondary: "bg-blue-900/30",
        accent: "bg-purple-900/30",
        background: "bg-gray-900",
        card: "bg-gray-800",
        text: "text-white",
        textSecondary: "text-gray-300",
        border: "border-gray-700",
      },
    },
    "emerald-teal": {
      name: "Emerald Teal",
      light: {
        primary: "from-emerald-600 to-teal-600",
        primarySolid: "bg-emerald-600",
        secondary: "bg-teal-100",
        accent: "bg-emerald-100",
        background: "bg-gray-50",
        card: "bg-white",
        text: "text-gray-900",
        textSecondary: "text-gray-600",
        border: "border-gray-200",
      },
      dark: {
        primary: "from-emerald-500 to-teal-500",
        primarySolid: "bg-emerald-500",
        secondary: "bg-teal-900/30",
        accent: "bg-emerald-900/30",
        background: "bg-gray-900",
        card: "bg-gray-800",
        text: "text-white",
        textSecondary: "text-gray-300",
        border: "border-gray-700",
      },
    },
    "rose-orange": {
      name: "Rose Orange",
      light: {
        primary: "from-rose-500 to-orange-500",
        primarySolid: "bg-rose-500",
        secondary: "bg-orange-100",
        accent: "bg-rose-100",
        background: "bg-gray-50",
        card: "bg-white",
        text: "text-gray-900",
        textSecondary: "text-gray-600",
        border: "border-gray-200",
      },
      dark: {
        primary: "from-rose-400 to-orange-400",
        primarySolid: "bg-rose-400",
        secondary: "bg-orange-900/30",
        accent: "bg-rose-900/30",
        background: "bg-gray-900",
        card: "bg-gray-800",
        text: "text-white",
        textSecondary: "text-gray-300",
        border: "border-gray-700",
      },
    },
    "indigo-cyan": {
      name: "Indigo Cyan",
      light: {
        primary: "from-indigo-600 to-cyan-600",
        primarySolid: "bg-indigo-600",
        secondary: "bg-cyan-100",
        accent: "bg-indigo-100",
        background: "bg-gray-50",
        card: "bg-white",
        text: "text-gray-900",
        textSecondary: "text-gray-600",
        border: "border-gray-200",
      },
      dark: {
        primary: "from-indigo-500 to-cyan-500",
        primarySolid: "bg-indigo-500",
        secondary: "bg-cyan-900/30",
        accent: "bg-indigo-900/30",
        background: "bg-gray-900",
        card: "bg-gray-800",
        text: "text-white",
        textSecondary: "text-gray-300",
        border: "border-gray-700",
      },
    },
    "amber-red": {
      name: "Amber Red",
      light: {
        primary: "from-amber-500 to-red-500",
        primarySolid: "bg-amber-500",
        secondary: "bg-red-100",
        accent: "bg-amber-100",
        background: "bg-gray-50",
        card: "bg-white",
        text: "text-gray-900",
        textSecondary: "text-gray-600",
        border: "border-gray-200",
      },
      dark: {
        primary: "from-amber-400 to-red-400",
        primarySolid: "bg-amber-400",
        secondary: "bg-red-900/30",
        accent: "bg-amber-900/30",
        background: "bg-gray-900",
        card: "bg-gray-800",
        text: "text-white",
        textSecondary: "text-gray-300",
        border: "border-gray-700",
      },
    },
    "violet-pink": {
      name: "Violet Pink",
      light: {
        primary: "from-violet-600 to-pink-600",
        primarySolid: "bg-violet-600",
        secondary: "bg-pink-100",
        accent: "bg-violet-100",
        background: "bg-gray-50",
        card: "bg-white",
        text: "text-gray-900",
        textSecondary: "text-gray-600",
        border: "border-gray-200",
      },
      dark: {
        primary: "from-violet-500 to-pink-500",
        primarySolid: "bg-violet-500",
        secondary: "bg-pink-900/30",
        accent: "bg-violet-900/30",
        background: "bg-gray-900",
        card: "bg-gray-800",
        text: "text-white",
        textSecondary: "text-gray-300",
        border: "border-gray-700",
      },
    },
    "slate-blue": {
      name: "Slate Blue",
      light: {
        primary: "from-slate-600 to-blue-600",
        primarySolid: "bg-slate-600",
        secondary: "bg-blue-100",
        accent: "bg-slate-100",
        background: "bg-gray-50",
        card: "bg-white",
        text: "text-gray-900",
        textSecondary: "text-gray-600",
        border: "border-gray-200",
      },
      dark: {
        primary: "from-slate-500 to-blue-500",
        primarySolid: "bg-slate-500",
        secondary: "bg-blue-900/30",
        accent: "bg-slate-900/30",
        background: "bg-gray-900",
        card: "bg-gray-800",
        text: "text-white",
        textSecondary: "text-gray-300",
        border: "border-gray-700",
      },
    },
    "green-blue": {
      name: "Green Blue",
      light: {
        primary: "from-green-600 to-blue-600",
        primarySolid: "bg-green-600",
        secondary: "bg-blue-100",
        accent: "bg-green-100",
        background: "bg-gray-50",
        card: "bg-white",
        text: "text-gray-900",
        textSecondary: "text-gray-600",
        border: "border-gray-200",
      },
      dark: {
        primary: "from-green-500 to-blue-500",
        primarySolid: "bg-green-500",
        secondary: "bg-blue-900/30",
        accent: "bg-green-900/30",
        background: "bg-gray-900",
        card: "bg-gray-800",
        text: "text-white",
        textSecondary: "text-gray-300",
        border: "border-gray-700",
      },
    },
  };

  const currentTheme = themes[selectedTheme];
  const colors = isDarkMode ? currentTheme.dark : currentTheme.light;

  const MockCard = ({ type, theme, mode }) => {
    const themeColors = mode === "dark" ? theme.dark : theme.light;

    return (
      <div
        className={`${themeColors.card} ${themeColors.border} border rounded-xl p-4 shadow-lg transition-all hover:shadow-xl`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <div>
              <h4 className={`font-bold text-sm ${themeColors.text}`}>
                {type === "influencer" ? "Sarah Creates" : "TechFlow Co"}
              </h4>
              <p className={`text-xs ${themeColors.textSecondary}`}>
                {type === "influencer" ? "@sarahcreates" : "Technology"}
              </p>
            </div>
          </div>
          <Heart className={`w-4 h-4 ${themeColors.textSecondary}`} />
        </div>

        <div className="flex items-center justify-between mb-3">
          <span
            className={`${themeColors.accent} px-2 py-1 rounded-full text-xs`}
          >
            {type === "influencer" ? "Fashion" : "Tech"}
          </span>
          <span className={`text-green-600 font-bold text-sm`}>
            {type === "influencer" ? "$1.5K" : "$5K-15K"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="text-center">
            <p className={`font-bold ${themeColors.text}`}>125K</p>
            <p className={`text-xs ${themeColors.textSecondary}`}>Followers</p>
          </div>
          <div className="text-center">
            <p className={`font-bold ${themeColors.text}`}>4.8%</p>
            <p className={`text-xs ${themeColors.textSecondary}`}>Engagement</p>
          </div>
        </div>

        <button
          className={`w-full bg-gradient-to-r ${themeColors.primary} text-white py-2 px-3 rounded-lg text-sm font-medium transition-all hover:shadow-md`}
        >
          View Profile
        </button>
      </div>
    );
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${colors.background}`}
    >
      {/* Header */}
      <div className={`${colors.card} ${colors.border} border-b px-8 py-6`}>
        <div className="flex items-center justify-between">
          <div>
            <h1
              className={`text-3xl font-bold bg-gradient-to-r ${colors.primary} bg-clip-text text-transparent`}
            >
              SponsorLink Color Themes
            </h1>
            <p className={`${colors.textSecondary} mt-2`}>
              Choose your perfect color palette for light and dark modes
            </p>
          </div>

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
              <span className="font-medium">
                {isDarkMode ? "Light" : "Dark"}
              </span>
            </button>
          </div>
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
                <MockCard
                  type="influencer"
                  theme={currentTheme}
                  mode={isDarkMode ? "dark" : "light"}
                />
                <MockCard
                  type="company"
                  theme={currentTheme}
                  mode={isDarkMode ? "dark" : "light"}
                />
                <MockCard
                  type="influencer"
                  theme={currentTheme}
                  mode={isDarkMode ? "dark" : "light"}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Color Palette Reference */}
        <div>
          <h2 className={`text-2xl font-bold ${colors.text} mb-6`}>
            Color Palette Reference
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              className={`${colors.card} rounded-xl p-6 ${colors.border} border`}
            >
              <h3 className={`text-lg font-bold ${colors.text} mb-4`}>
                {isDarkMode ? "Dark Mode" : "Light Mode"} Colors
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`${colors.textSecondary}`}>
                    Primary Gradient
                  </span>
                  <div
                    className={`w-20 h-6 bg-gradient-to-r ${colors.primary} rounded`}
                  ></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`${colors.textSecondary}`}>Secondary</span>
                  <div className={`w-20 h-6 ${colors.secondary} rounded`}></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`${colors.textSecondary}`}>Accent</span>
                  <div className={`w-20 h-6 ${colors.accent} rounded`}></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`${colors.textSecondary}`}>Background</span>
                  <div
                    className={`w-20 h-6 ${colors.background} rounded border`}
                  ></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`${colors.textSecondary}`}>Card</span>
                  <div
                    className={`w-20 h-6 ${colors.card} rounded border`}
                  ></div>
                </div>
              </div>
            </div>

            <div
              className={`${colors.card} rounded-xl p-6 ${colors.border} border`}
            >
              <h3 className={`text-lg font-bold ${colors.text} mb-4`}>
                Usage Recommendations
              </h3>

              <div className="space-y-3 text-sm">
                <div className={`${colors.textSecondary}`}>
                  <strong className={`${colors.text}`}>Primary:</strong>{" "}
                  Buttons, links, brand elements
                </div>
                <div className={`${colors.textSecondary}`}>
                  <strong className={`${colors.text}`}>Secondary:</strong> Hover
                  states, highlights
                </div>
                <div className={`${colors.textSecondary}`}>
                  <strong className={`${colors.text}`}>Accent:</strong> Tags,
                  badges, notifications
                </div>
                <div className={`${colors.textSecondary}`}>
                  <strong className={`${colors.text}`}>Background:</strong> Page
                  background
                </div>
                <div className={`${colors.textSecondary}`}>
                  <strong className={`${colors.text}`}>Card:</strong> Content
                  containers, modals
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorThemeShowcase;
