import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Building2, Users, Globe, Camera, ArrowRight, Check, AlertCircle, Star, Heart, MessageCircle } from 'lucide-react';

const AuthPages = () => {
  const [currentPage, setCurrentPage] = useState('login'); // 'login', 'signup', 'userType'
  const [userType, setUserType] = useState(''); // 'influencer' or 'company'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('purple-blue');
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    handle: '',
    companyName: '',
    website: '',
    followers: '',
    category: '',
    industry: '',
    agreeTerms: false
  });

  const themes = {
    'purple-blue': {
      light: {
        primary: 'from-purple-600 to-blue-600',
        primarySolid: 'bg-purple-600',
        primaryHover: 'hover:from-purple-700 hover:to-blue-700',
        secondary: 'bg-blue-100',
        accent: 'bg-purple-100',
        background: 'bg-gray-50',
        card: 'bg-white',
        text: 'text-gray-900',
        textSecondary: 'text-gray-600',
        border: 'border-gray-200',
        input: 'border-gray-300 focus:border-purple-500 focus:ring-purple-500'
      },
      dark: {
        primary: 'from-purple-500 to-blue-500',
        primarySolid: 'bg-purple-500',
        primaryHover: 'hover:from-purple-600 hover:to-blue-600',
        secondary: 'bg-blue-900/30',
        accent: 'bg-purple-900/30',
        background: 'bg-gray-900',
        card: 'bg-gray-800',
        text: 'text-white',
        textSecondary: 'text-gray-300',
        border: 'border-gray-700',
        input: 'border-gray-600 focus:border-purple-400 focus:ring-purple-400 bg-gray-700'
      }
    }
  };

  const colors = isDarkMode ? themes[selectedTheme].dark : themes[selectedTheme].light;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const LoginPage = () => (
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
                  className={`w-full pl-10 pr-4 py-3 border ${colors.input} rounded-lg focus:ring-2 focus:ring-opacity-50 transition-colors ${colors.text}`}
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
                  className={`w-full pl-10 pr-12 py-3 border ${colors.input} rounded-lg focus:ring-2 focus:ring-opacity-50 transition-colors ${colors.text}`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${colors.textSecondary} hover:${colors.text}`}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
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
                <img
                  src="https://developers.google.com/identity/images/g-logo.png"
                  alt="Google"
                  className="w-5 h-5"
                />
                <span className={`ml-2 text-sm ${colors.text}`}>Google</span>
              </button>
              <button
                type="button"
                className={`flex justify-center items-center px-4 py-2 border ${colors.border} rounded-lg ${colors.card} hover:${colors.accent} transition-colors`}
              >
                <div className="w-5 h-5 bg-blue-600 rounded" />
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

  const UserTypeSelection = () => (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-4xl font-bold bg-gradient-to-r ${colors.primary} bg-clip-text text-transparent mb-2`}>
            Join SponsorLink
          </h1>
          <p className={`${colors.textSecondary} text-lg`}>Choose your account type to get started</p>
        </div>

        {/* User Type Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Influencer Card */}
          <div
            onClick={() => setUserType('influencer')}
            className={`${colors.card} rounded-2xl p-8 cursor-pointer transition-all duration-300 border-2 ${
              userType === 'influencer' 
                ? `${colors.primary.replace('from-', 'border-').replace(' to-blue-600', '').replace(' to-blue-500', '')} shadow-xl` 
                : `${colors.border} hover:shadow-lg hover:${colors.accent}`
            }`}
          >
            <div className="text-center">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${colors.primary} flex items-center justify-center`}>
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-2xl font-bold ${colors.text} mb-3`}>Influencer</h3>
              <p className={`${colors.textSecondary} mb-6`}>
                Connect with brands, showcase your content, and monetize your influence
              </p>
              
              <div className="space-y-3 text-left">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${colors.primarySolid}`} />
                  <span className={`text-sm ${colors.textSecondary}`}>Set your rates and availability</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${colors.primarySolid}`} />
                  <span className={`text-sm ${colors.textSecondary}`}>Browse brand partnerships</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${colors.primarySolid}`} />
                  <span className={`text-sm ${colors.textSecondary}`}>Showcase your portfolio</span>
                </div>
              </div>
            </div>
          </div>

          {/* Company Card */}
          <div
            onClick={() => setUserType('company')}
            className={`${colors.card} rounded-2xl p-8 cursor-pointer transition-all duration-300 border-2 ${
              userType === 'company' 
                ? `${colors.primary.replace('from-', 'border-').replace(' to-blue-600', '').replace(' to-blue-500', '')} shadow-xl` 
                : `${colors.border} hover:shadow-lg hover:${colors.accent}`
            }`}
          >
            <div className="text-center">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${colors.primary} flex items-center justify-center`}>
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-2xl font-bold ${colors.text} mb-3`}>Company</h3>
              <p className={`${colors.textSecondary} mb-6`}>
                Find the perfect influencers to promote your brand and reach new audiences
              </p>
              
              <div className="space-y-3 text-left">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${colors.primarySolid}`} />
                  <span className={`text-sm ${colors.textSecondary}`}>Browse verified influencers</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${colors.primarySolid}`} />
                  <span className={`text-sm ${colors.textSecondary}`}>Set campaign requirements</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${colors.primarySolid}`} />
                  <span className={`text-sm ${colors.textSecondary}`}>Track campaign performance</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <button
            onClick={() => setCurrentPage('signup')}
            disabled={!userType}
            className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 ${
              userType 
                ? `bg-gradient-to-r ${colors.primary} ${colors.primaryHover} text-white hover:shadow-lg` 
                : `${colors.accent} ${colors.textSecondary} cursor-not-allowed`
            }`}
          >
            Continue as {userType ? (userType === 'influencer' ? 'Influencer' : 'Company') : 'User'}
          </button>
        </div>

        {/* Back to Login */}
        <div className="mt-6 text-center">
          <p className={`${colors.textSecondary}`}>
            Already have an account?{' '}
            <button
              onClick={() => setCurrentPage('login')}
              className={`bg-gradient-to-r ${colors.primary} bg-clip-text text-transparent hover:underline font-medium`}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  const SignupPage = () => (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-4xl font-bold bg-gradient-to-r ${colors.primary} bg-clip-text text-transparent mb-2`}>
            Create Account
          </h1>
          <p className={`${colors.textSecondary}`}>
            Join as {userType === 'influencer' ? 'an Influencer' : 'a Company'}
          </p>
        </div>

        {/* Signup Form */}
        <div className={`${colors.card} rounded-2xl shadow-xl p-8 ${colors.border} border`}>
          <form className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className={`block text-sm font-medium ${colors.text} mb-2`}>
                  {userType === 'influencer' ? 'Full Name' : 'Company Name'}
                </label>
                <div className="relative">
                  <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${colors.textSecondary}`} />
                  <input
                    type="text"
                    name={userType === 'influencer' ? 'fullName' : 'companyName'}
                    value={formData[userType === 'influencer' ? 'fullName' : 'companyName']}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border ${colors.input} rounded-lg focus:ring-2 focus:ring-opacity-50 transition-colors ${colors.text}`}
                    placeholder={userType === 'influencer' ? 'Enter your full name' : 'Enter company name'}
                  />
                </div>
              </div>
            </div>

            {/* Handle/Website */}
            {userType === 'influencer' ? (
              <div>
                <label className={`block text-sm font-medium ${colors.text} mb-2`}>
                  Social Handle
                </label>
                <div className="relative">
                  <span className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${colors.textSecondary}`}>@</span>
                  <input
                    type="text"
                    name="handle"
                    value={formData.handle}
                    onChange={handleInputChange}
                    className={`w-full pl-8 pr-4 py-3 border ${colors.input} rounded-lg focus:ring-2 focus:ring-opacity-50 transition-colors ${colors.text}`}
                    placeholder="your_handle"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className={`block text-sm font-medium ${colors.text} mb-2`}>
                  Website
                </label>
                <div className="relative">
                  <Globe className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${colors.textSecondary}`} />
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border ${colors.input} rounded-lg focus:ring-2 focus:ring-opacity-50 transition-colors ${colors.text}`}
                    placeholder="https://your-website.com"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className={`block text-sm font-medium ${colors.text} mb-2`}>
                Email Address
              </label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${colors.textSecondary}`} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border ${colors.input} rounded-lg focus:ring-2 focus:ring-opacity-50 transition-colors ${colors.text}`}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Category/Industry & Followers */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className={`block text-sm font-medium ${colors.text} mb-2`}>
                  {userType === 'influencer' ? 'Category' : 'Industry'}
                </label>
                <select
                  name={userType === 'influencer' ? 'category' : 'industry'}
                  value={formData[userType === 'influencer' ? 'category' : 'industry']}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border ${colors.input} rounded-lg focus:ring-2 focus:ring-opacity-50 transition-colors ${colors.text}`}
                >
                  <option value="">Select {userType === 'influencer' ? 'category' : 'industry'}</option>
                  {userType === 'influencer' ? (
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
              </div>
            </div>

            {userType === 'influencer' && (
              <div>
                <label className={`block text-sm font-medium ${colors.text} mb-2`}>
                  Total Followers (across all platforms)
                </label>
                <input
                  type="number"
                  name="followers"
                  value={formData.followers}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border ${colors.input} rounded-lg focus:ring-2 focus:ring-opacity-50 transition-colors ${colors.text}`}
                  placeholder="e.g., 25000"
                />
              </div>
            )}

            {/* Password */}
            <div>
              <label className={`block text-sm font-medium ${colors.text} mb-2`}>
                Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${colors.textSecondary}`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 border ${colors.input} rounded-lg focus:ring-2 focus:ring-opacity-50 transition-colors ${colors.text}`}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${colors.textSecondary} hover:${colors.text}`}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className={`block text-sm font-medium ${colors.text} mb-2`}>
                Confirm Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${colors.textSecondary}`} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 border ${colors.input} rounded-lg focus:ring-2 focus:ring-opacity-50 transition-colors ${colors.text}`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${colors.textSecondary} hover:${colors.text}`}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
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
                I agree to the{' '}
                <button type="button" className={`bg-gradient-to-r ${colors.primary} bg-clip-text text-transparent hover:underline`}>
                  Terms of Service
                </button>{' '}
                and{' '}
                <button type="button" className={`bg-gradient-to-r ${colors.primary} bg-clip-text text-transparent hover:underline`}>
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
              Already have an account?{' '}
              <button
                onClick={() => setCurrentPage('login')}
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

  return (
    <div className={`min-h-screen transition-colors duration-500 ${colors.background}`}>
      {/* Theme Toggle (for demo) */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`p-2 rounded-lg ${colors.card} ${colors.border} border shadow-lg hover:shadow-xl transition-all`}
        >
          {isDarkMode ? '🌞' : '🌙'}
        </button>
      </div>

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br ${colors.primary} opacity-10 rounded-full blur-3xl`} />
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr ${colors.primary} opacity-10 rounded-full blur-3xl`} />
      </div>

      {/* Page Content */}
      <div className="relative z-10">
        {currentPage === 'login' && <LoginPage />}
        {currentPage === 'userType' && <UserTypeSelection />}
        {currentPage === 'signup' && <SignupPage />}
      </div>

      {/* Demo Navigation */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className={`flex space-x-2 ${colors.card} ${colors.border} border rounded-lg p-2 shadow-lg`}>
          <button
            onClick={() => setCurrentPage('login')}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              currentPage === 'login' 
                ? `${colors.primarySolid} text-white` 
                : `${colors.textSecondary} hover:${colors.text}`
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setCurrentPage('userType')}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              currentPage === 'userType' 
                ? `${colors.primarySolid} text-white` 
                : `${colors.textSecondary} hover:${colors.text}`
            }`}
          >
            User Type
          </button>
          <button
            onClick={() => setCurrentPage('signup')}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              currentPage === 'signup' 
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
}

export default AuthPages;