import React from "react";

import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
} from "lucide-react";

const Login = ({
  colors,
  setCurrentPage,
  formData,
  handleInputChange,
  showPassword,
  setShowPassword,
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <h1
            className={`text-4xl font-bold bg-gradient-to-r ${colors.primary} bg-clip-text text-transparent mb-2`}
          >
            SponsorLink
          </h1>
          <p className={`${colors.textSecondary}`}>
            Welcome back! Sign in to your account
          </p>
        </div>

        {/* Login Form */}
        <div
          className={`${colors.card} rounded-2xl shadow-xl p-8 ${colors.border} border`}
        >
          <div className="space-y-6">
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
                  className={`w-full pl-10 pr-12 py-3 border-2 ${colors.border} ${colors.borderFocus} rounded-lg transition-colors ${colors.text}`}
                  placeholder="Enter your email"
                />
              </div>
            </div>

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
                  placeholder="Enter your password"
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

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className={`rounded ${colors.primarySolid} border-gray-300`}
                />
                <span className={`ml-2 text-sm ${colors.textSecondary}`}>
                  Remember me
                </span>
              </label>
              <button
                type="button"
                className={`text-sm bg-gradient-to-r ${colors.primary} bg-clip-text text-transparent hover:underline`}
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className={`w-full bg-gradient-to-r ${colors.primary} ${colors.primaryHover} text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 hover:shadow-lg`}
            >
              <span>Sign In</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Divider */}
            <div className="relative">
              <div className={`absolute inset-0 flex items-center`}>
                <div className={`w-full border-t ${colors.border}`} />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className={`px-2 ${colors.card} ${colors.textSecondary}`}>
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className={`flex justify-center items-center px-4 py-2 border ${colors.border} rounded-lg ${colors.card} hover:${colors.accent} transition-colors`}
              >
                <img src="google.png" alt="Google" className="w-5 h-5" />
                <span className={`ml-2 text-sm ${colors.text}`}>Google</span>
              </button>
              <button
                type="button"
                className={`flex justify-center items-center px-4 py-2 border ${colors.border} rounded-lg ${colors.card} hover:${colors.accent} transition-colors`}
              >
                <img src="facebook.png" alt="Facebook" className="w-5 h-5" />
                <span className={`ml-2 text-sm ${colors.text}`}>Facebook</span>
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className={`${colors.textSecondary}`}>
                Don't have an account?{" "}
                <button
                  onClick={() => setCurrentPage("userType")}
                  className={`bg-gradient-to-r ${colors.primary} bg-clip-text text-transparent hover:underline font-medium`}
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
