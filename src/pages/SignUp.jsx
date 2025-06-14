import React, { useState } from "react";

import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Globe,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

const SignUp = ({
  colors,
  userType,
  setCurrentPage,
  formData,
  handleInputChange,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
}) => {
  const [isSelectFocused, setIsSelectFocused] = useState(false);
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className={`text-4xl font-bold bg-gradient-to-r ${colors.primary} bg-clip-text text-transparent mb-2`}
          >
            Create Account
          </h1>
          <p className={`${colors.textSecondary}`}>
            Join as {userType === "influencer" ? "an Influencer" : "a Company"}
          </p>
        </div>

        {/* Signup Form */}
        <div
          className={`${colors.card} rounded-2xl shadow-xl p-8 ${colors.border} border`}
        >
          <form className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label
                  className={`block text-sm font-medium ${colors.text} mb-2`}
                >
                  {userType === "influencer" ? "Full Name" : "Company Name"}
                </label>
                <div className="relative">
                  <User
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${colors.textSecondary}`}
                  />
                  <input
                    type="text"
                    name={
                      userType === "influencer" ? "fullName" : "companyName"
                    }
                    value={
                      formData[
                        userType === "influencer" ? "fullName" : "companyName"
                      ]
                    }
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border-2 ${colors.border} ${colors.borderFocus} rounded-lg transition-colors ${colors.text}`}
                    placeholder={
                      userType === "influencer"
                        ? "Enter your full name"
                        : "Enter company name"
                    }
                  />
                </div>
              </div>
            </div>

            {/* Handle/Website */}
            {userType === "influencer" ? (
              <div>
                <label
                  className={`block text-sm font-medium ${colors.text} mb-2`}
                >
                  Social Handle
                </label>
                <div className="relative">
                  <span
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${colors.textSecondary}`}
                  >
                    @
                  </span>
                  <input
                    type="text"
                    name="handle"
                    value={formData.handle}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border-2 ${colors.border} ${colors.borderFocus} rounded-lg transition-colors ${colors.text}`}
                    placeholder="your_handle"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label
                  className={`block text-sm font-medium ${colors.text} mb-2`}
                >
                  Website
                </label>
                <div className="relative">
                  <Globe
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${colors.textSecondary}`}
                  />
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border-2 ${colors.border} ${colors.borderFocus} rounded-lg transition-colors ${colors.text}`}
                    placeholder="https://your-website.com"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label
                className={`block text-sm font-medium ${colors.text} mb-2`}
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${colors.textSecondary}`}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border-2 ${colors.border} ${colors.borderFocus} rounded-lg transition-colors ${colors.text}`}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Category/Industry & Followers */}
            <div className="grid grid-cols-1 gap-4 relative">
              <div>
                <label
                  className={`block text-sm font-medium ${colors.text} mb-2`}
                >
                  {userType === "influencer" ? "Category" : "Industry"}
                </label>

                <div className="relative">
                  <select
                    name={userType === "influencer" ? "category" : "industry"}
                    value={
                      formData[
                        userType === "influencer" ? "category" : "industry"
                      ]
                    }
                    onFocus={() => setIsSelectFocused(true)}
                    onBlur={() => setIsSelectFocused(false)}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 pr-12 border-2 ${colors.border} ${colors.borderFocus} rounded-lg transition-colors ${colors.text} appearance-none`}
                  >
                    <option value="">
                      Select{" "}
                      {userType === "influencer" ? "category" : "industry"}
                    </option>
                    {userType === "influencer" ? (
                      <>
                        <option value="lifestyle">Lifestyle & Fashion</option>
                        <option value="technology">Technology</option>
                        <option value="fitness">Fitness & Health</option>
                        <option value="beauty">Beauty & Cosmetics</option>
                        <option value="travel">Travel</option>
                        <option value="food">Food & Cooking</option>
                      </>
                    ) : (
                      <>
                        <option value="technology">Technology</option>
                        <option value="beauty">Beauty & Cosmetics</option>
                        <option value="fitness">Fitness & Sports</option>
                        <option value="fashion">Fashion & Lifestyle</option>
                        <option value="food">Food & Beverage</option>
                        <option value="travel">Travel & Tourism</option>
                      </>
                    )}
                  </select>

                  <ChevronDown
                    className={`pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 transition-transform duration-300 w-5 h-5 ${
                      colors.textSecondary
                    } ${isSelectFocused ? "rotate-180" : ""}`}
                  />
                </div>
              </div>
            </div>

            {userType === "influencer" && (
              <div>
                <label
                  className={`block text-sm font-medium ${colors.text} mb-2`}
                >
                  Total Followers (across all platforms)
                </label>
                <input
                  type="number"
                  name="followers"
                  value={formData.followers}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 ${colors.border} ${colors.borderFocus} rounded-lg transition-colors ${colors.text}`}
                  placeholder="e.g., 25000"
                />
              </div>
            )}

            {/* Password */}
            <div>
              <label
                className={`block text-sm font-medium ${colors.text} mb-2`}
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${colors.textSecondary}`}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 border-2 ${colors.border} ${colors.borderFocus} rounded-lg transition-colors ${colors.text}`}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${colors.textSecondary} hover:${colors.text}`}
                >
                  {!showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                className={`block text-sm font-medium ${colors.text} mb-2`}
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${colors.textSecondary}`}
                />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 border-2 ${colors.border} ${colors.borderFocus} rounded-lg transition-colors ${colors.text}`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${colors.textSecondary} hover:${colors.text}`}
                >
                  {!showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleInputChange}
                className={`mt-1 rounded ${colors.primarySolid} border-gray-300`}
              />
              <p className={`text-sm ${colors.textSecondary}`}>
                I agree to the{" "}
                <button
                  type="button"
                  className={`bg-gradient-to-r ${colors.primary} bg-clip-text text-transparent hover:underline`}
                >
                  Terms of Service
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  className={`bg-gradient-to-r ${colors.primary} bg-clip-text text-transparent hover:underline`}
                >
                  Privacy Policy
                </button>
              </p>
            </div>

            {/* Create Account Button */}
            <button
              type="submit"
              className={`w-full bg-gradient-to-r ${colors.primary} ${colors.primaryHover} text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 hover:shadow-lg`}
            >
              <span>Create Account</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className={`${colors.textSecondary}`}>
              Already have an account?{" "}
              <button
                onClick={() => setCurrentPage("login")}
                className={`bg-gradient-to-r ${colors.primary} bg-clip-text text-transparent hover:underline font-medium`}
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
