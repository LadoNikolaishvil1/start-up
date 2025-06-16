import { Heart } from 'lucide-react';
import React, { useState } from 'react'

const Card = ({ type, themeColors }) => {
  const [heartLiked, setHeartLiked] = useState(false);
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
        <Heart
          className={`w-4 h-4 cursor-pointer fill-transparent ${heartLiked && "fill-red-500!"} ${themeColors.textSecondary}`}
          onClick={() => {
            setHeartLiked(!heartLiked);
          }}
        />
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


export default Card
