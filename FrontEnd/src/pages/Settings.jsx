import { Check, Palette } from 'lucide-react';
import React from 'react'

const Settings = ({
  colors,
  selectedTheme,
  setSelectedTheme,
  themes,
  isDarkMode,
}) => {
  return (
    <div>
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
    </div>
  );
};

export default Settings
