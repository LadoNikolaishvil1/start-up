// import { Heart } from 'lucide-react';
// import React, { useState } from 'react'

// const Card = ({ type, user, themeColors }) => {
//   const [heartLiked, setHeartLiked] = useState(false);
//   console.log(user)
//   return (
//     <div
//       className={`${themeColors.card} ${themeColors.border} border rounded-xl p-4 shadow-lg transition-all hover:shadow-xl`}
//     >
//       <div className="flex items-center justify-between mb-3">
//         <div className="flex items-center space-x-2">
//           <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
//           <div>
//             <h4 className={`font-bold text-sm ${themeColors.text}`}>
//               {type === "influencer" ? "Sarah Creates" : "TechFlow Co"}
//             </h4>
//             <p className={`text-xs ${themeColors.textSecondary}`}>
//               {type === "influencer" ? "@sarahcreates" : "Technology"}
//             </p>
//           </div>
//         </div>
//         <Heart
//           className={`w-4 h-4 cursor-pointer fill-transparent ${heartLiked && "fill-red-500!"} ${themeColors.textSecondary}`}
//           onClick={() => {
//             setHeartLiked(!heartLiked);
//           }}
//         />
//       </div>

//       <div className="flex items-center justify-between mb-3">
//         <span
//           className={`${themeColors.accent} px-2 py-1 rounded-full text-xs`}
//         >
//           {type === "influencer" ? "Fashion" : "Tech"}
//         </span>
//         <span className={`text-green-600 font-bold text-sm`}>
//           {type === "influencer" ? "$1.5K" : "$5K-15K"}
//         </span>
//       </div>

//       <div className="grid grid-cols-2 gap-2 mb-3">
//         <div className="text-center">
//           <p className={`font-bold ${themeColors.text}`}>125K</p>
//           <p className={`text-xs ${themeColors.textSecondary}`}>Followers</p>
//         </div>
//         <div className="text-center">
//           <p className={`font-bold ${themeColors.text}`}>4.8%</p>
//           <p className={`text-xs ${themeColors.textSecondary}`}>Engagement</p>
//         </div>
//       </div>

//       <button
//         className={`w-full bg-gradient-to-r ${themeColors.primary} text-white py-2 px-3 rounded-lg text-sm font-medium transition-all hover:shadow-md`}
//       >
//         View Profile
//       </button>
//     </div>
//   );
// };

// export default Card

import { Heart, MapPin, Users } from "lucide-react";
import React, { useState } from "react";

const Card = ({ themeColors, user }) => {
  const [heartLiked, setHeartLiked] = useState(false);

  return (
    <div
      className={`${themeColors.card} ${themeColors.border} border rounded-2xl p-6 shadow-lg transition-all hover:shadow-2xl hover:-translate-y-1 backdrop-blur-sm`}
    >
      {/* Header with profile info and heart */}
      <div className="flex items-start justify-between mb-4 gap-2">
        {/* Left section: Avatar + Username + Location */}
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="relative flex-shrink-0">
            <img
              src={user?.profilePicture || "https://..."}
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover bg-gray-200 ring-2 ring-white/50"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
          </div>

          <div className="flex-1 min-w-0">
            <h3
              className={`font-bold text-lg truncate ${themeColors.text}`}
              title={user?.username}
            >
              {user?.username}
            </h3>
            <p
              className={`text-sm ${themeColors.textSecondary} flex items-center gap-1 flex-1 min-w-0 whitespace-nowrap overflow-hidden text-ellipsis`}
            >
              <MapPin className="w-3 h-3 shrink-0" />
              <span className="truncate">{user?.location}</span>
            </p>
          </div>
        </div>

        {/* Right section: Heart icon */}
        <div className="flex-shrink-0 pl-2">
          <Heart
            className={`w-5 h-5 cursor-pointer transition-all hover:scale-110 ${
              heartLiked
                ? "fill-red-500 text-red-500"
                : `${themeColors.textSecondary} hover:text-red-400`
            }`}
            onClick={() => setHeartLiked(!heartLiked)}
          />
        </div>
      </div>

      {/* Category and followers/company info */}
      <div className="flex items-center justify-between mb-4">
        <span
          className={`${themeColors.accent} ${themeColors.text} px-3 py-1.5 rounded-full text-xs font-medium`}
        >
          {user?.category}
        </span>
        {user?.userType === "company" ? (
          <span
            className={`${themeColors.accent} ${themeColors.text} px-3 py-1.5 rounded-full text-xs font-medium`}
          >
            Business
          </span>
        ) : (
          <div className="flex items-center gap-1 text-emerald-600 font-semibold text-sm">
            <Users className="w-4 h-4" />
            {user?.followers?.toLocaleString() || 0}
          </div>
        )}
      </div>

      {/* Bio with fixed height and ellipsis */}
      <div
        className={`text-sm leading-relaxed mb-4 min-h-[48px] max-h-[48px] overflow-hidden text-ellipsis ${themeColors.textSecondary}`}
        title={user?.bio}
      >
        {user?.bio}
      </div>

      {/* Interests tags with fixed height and ellipsis */}
      <div className="flex flex-wrap gap-2 mb-4 min-h-[64px] max-h-[64px] overflow-hidden text-ellipsis items-start">
        {user?.interests &&
          user.interests.map((interest, index) => (
            <span
              key={index}
              className={`px-2 py-1 rounded-md text-xs ${themeColors.textSecondary} bg-gray-100/50`}
            >
              #{interest}
            </span>
          ))}
      </div>

      {/* Action button */}
      <button
        className={`w-full bg-gradient-to-r ${themeColors.primary} text-white py-3 px-4 rounded-xl text-sm font-semibold transition-all hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]`}
      >
        Connect
      </button>
    </div>
  );
};
export default Card;
