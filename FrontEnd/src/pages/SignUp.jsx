import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import {
  User,
  Building2,
  Mail,
  Globe,
  Tag,
  Lock,
  Check,
  ArrowLeft,
  ArrowRight,
  MapPin,
  Heart,
  Target,
  Edit3,
  AtSign,
  Users,
  Sparkles,
  EyeOff,
  Eye,
} from "lucide-react";
import { useForm } from "react-hook-form";
import UserSelect from "./UserSellect";
import {
  signUpSchema,
  basicInfoSchema,
  profileDetailsSchema,
  bioInterestsSchema,
  securitySchema,
} from "../validations/SignUp.validations";
import { useLocalStorage } from "usehooks-ts";

const initialDefaultValues = {
  userType: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  socialHandle: "",
  category: "",
  bio: "",
  location: "",
  website: "",
  interests: [],
  lookingFor: [],
  followers: "",
};

// Progress Bar Component
const ProgressBar = ({ currentStep, totalSteps = 5 }) => {
  const progress = (currentStep / totalSteps) * 100;

  const stepNames = {
    1: "User Type",
    2: "Basic Info",
    3: "Profile Details",
    4: "Bio & Interests",
    5: "Security & Review",
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="relative h-2 bg-gray-100">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-700 ease-out rounded-r-full"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="px-4 py-3 flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">
          {stepNames[currentStep]}
        </span>
        <span className="text-sm text-gray-500">
          {currentStep} of {totalSteps}
        </span>
      </div>
    </div>
  );
};

const SignUp = ({ colors = {}, userType, setUserType, setResetAll }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Use useLocalStorage for signupFormData
  const [signupFormData, setSignupFormData] = useLocalStorage(
    "signupFormData",
    {}
  );

  // Get current step based on route
  const getCurrentStep = () => {
    const path = location.pathname.split("/").pop();
    switch (path) {
      case "userselect":
        return 1;
      case "basic-info":
        return 2;
      case "profile-details":
        return 3;
      case "bio-interests":
        return 4;
      case "security":
        return 5;
      case "review":
        return 5;
      default:
        return 1;
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...initialDefaultValues,
      ...signupFormData,
    },
  });

  useEffect(() => {
    if (userType && userType !== watch("userType")) {
      setValue("userType", userType);
    }
  }, [userType, watch, setValue]);

  useEffect(() => {
    const subscription = watch((value) => {
      setSignupFormData(value); // use the hook instead of localStorage.setItem
    });
    return () => subscription.unsubscribe();
  }, [watch, setSignupFormData]);

  const handleArrayInputChange = (field, value) => {
    const items = value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item);
    setValue(field, items);
  };

  // --- Step-wise validation function with allowUnknown and context for userType ---
  const validateStep = async (schema, options = {}) => {
    const values = getValues();
    const { error } = schema.validate(values, {
      abortEarly: false,
      allowUnknown: true,
      convert: true,
      context: { userType: values.userType },
      ...options,
    });

    if (error) {
      const formatted = error.details.reduce((acc, curr) => {
        acc[curr.path[0]] = { message: curr.message };
        return acc;
      }, {});
      setStepErrors(formatted);
      console.log("Validation errors:", formatted);
      return false;
    }
    setStepErrors({});
    return true;
  };

  const UserSelectStep = (
    <>
      <ProgressBar currentStep={getCurrentStep()} />
      <div className="pt-20">
        <UserSelect
          colors={colors}
          userType={userType}
          setUserType={setUserType}
          setCurrentPage={(page) => navigate(`/auth/signup/${page}`)}
        />
      </div>
    </>
  );

  // Add a state to hold step errors for display
  const [stepErrors, setStepErrors] = useState({});

  const BasicInfoStep = (
    <>
      <ProgressBar currentStep={getCurrentStep()} />
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const isValid = await validateStep(basicInfoSchema);
          if (!isValid) {
            console.log("Continue (BasicInfoStep) errors:", stepErrors);
          }
          if (isValid) navigate("/auth/signup/profile-details");
        }}
        className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 pt-20"
      >
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              {watch("userType") === "company" ? (
                <Building2 className="w-8 h-8 text-white" />
              ) : (
                <User className="w-8 h-8 text-white" />
              )}
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Basic Information
            </h2>
            <p className="text-gray-600">Tell us about yourself</p>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {watch("userType") === "company"
                  ? "Company Username"
                  : "Username"}
              </label>
              <input
                {...register("username", { required: true })}
                type="text"
                placeholder={
                  watch("userType") === "company"
                    ? "eco_sips"
                    : "travel_with_anna"
                }
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
              />
              {(errors.username || stepErrors.username) && (
                <span className="text-red-500 text-xs absolute top-0 right-0">
                  {errors.username?.message ||
                    stepErrors.username?.message ||
                    "Username is required"}
                </span>
              )}
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="your@email.com"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>
              {(errors.email || stepErrors.email) && (
                <span className="text-red-500 text-xs absolute top-0 right-0">
                  {errors.email?.message ||
                    stepErrors.email?.message ||
                    "Email is required"}
                </span>
              )}
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Social Handle
              </label>
              <input
                {...register("socialHandle", { required: true })}
                type="text"
                placeholder="@your_handle"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
              />
              {(errors.socialHandle || stepErrors.socialHandle) && (
                <span className="text-red-500 text-xs absolute top-0 right-0">
                  {errors.socialHandle?.message ||
                    stepErrors.socialHandle?.message ||
                    "Social handle is required"}
                </span>
              )}
            </div>
          </div>

          <div className="flex space-x-4 mt-8">
            <button
              type="button"
              className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors flex items-center justify-center space-x-2"
              onClick={() => navigate("/auth/signup/userselect")}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Continue</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </form>
    </>
  );

  const ProfileDetailsStep = (
    <>
      <ProgressBar currentStep={getCurrentStep()} />
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const isValid = await validateStep(profileDetailsSchema);
          if (!isValid) {
            console.log("Continue (ProfileDetailsStep) errors:", stepErrors);
          }
          if (isValid) navigate("/auth/signup/bio-interests");
        }}
        className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 pt-20"
      >
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Tag className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Profile Details
            </h2>
            <p className="text-gray-600">Help others discover you</p>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <input
                {...register("category", { required: true })}
                type="text"
                placeholder={
                  watch("userType") === "company" ? "Eco Products" : "Travel"
                }
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
              />
              {(errors.category || stepErrors.category) && (
                <span className="text-red-500 text-xs absolute top-0 right-0">
                  {errors.category?.message ||
                    stepErrors.category?.message ||
                    "Category is required"}
                </span>
              )}
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  {...register("website")}
                  type="url"
                  placeholder="not required"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>
              {stepErrors.website && (
                <span className="text-red-500 text-xs absolute top-0 right-0">
                  {stepErrors.website.message}
                </span>
              )}
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  {...register("location", { required: true })}
                  type="text"
                  placeholder="Barcelona, Spain"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>
              {(errors.location || stepErrors.location) && (
                <span className="text-red-500 text-xs absolute top-0 right-0">
                  {errors.location?.message ||
                    stepErrors.location?.message ||
                    "Location is required"}
                </span>
              )}
            </div>
            {watch("userType") === "influencer" && (
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Followers Count
                </label>
                <input
                  {...register("followers")}
                  type="number"
                  placeholder="85400"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                />
                {stepErrors.followers && (
                  <span className="text-red-500 text-xs absolute top-0 right-0">
                    {stepErrors.followers.message}
                  </span>
                )}
              </div>
            )}
          </div>
          <div className="flex space-x-4 mt-8">
            <button
              type="button"
              className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors flex items-center justify-center space-x-2"
              onClick={() => navigate("/auth/signup/basic-info")}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Continue</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </form>
    </>
  );

  const BioInterestsStep = (
    <>
      <ProgressBar currentStep={getCurrentStep()} />
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const isValid = await validateStep(bioInterestsSchema);
          if (!isValid) {
            console.log("Continue (BioInterestsStep) errors:", stepErrors);
          }
          if (isValid) navigate("/auth/signup/security");
        }}
        className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 pt-20"
      >
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">About You</h2>
            <p className="text-gray-600">Share your story and interests</p>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                {...register("bio", { required: true })}
                placeholder="Tell us about yourself..."
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition-colors resize-none"
              />
              {(errors.bio || stepErrors.bio) && (
                <span className="text-red-500 text-xs absolute top-0 right-0">
                  {errors.bio?.message ||
                    stepErrors.bio?.message ||
                    "Bio is required"}
                </span>
              )}
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interests
              </label>
              <input
                type="text"
                onChange={(e) =>
                  handleArrayInputChange("interests", e.target.value)
                }
                placeholder="photography, travel, food (comma separated)"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
              />
              {stepErrors.interests && (
                <span className="text-red-500 text-xs absolute top-0 right-0">
                  {stepErrors.interests.message}
                </span>
              )}
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Looking For
              </label>
              <div className="relative">
                <Target className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  onChange={(e) =>
                    handleArrayInputChange("lookingFor", e.target.value)
                  }
                  placeholder={
                    watch("userType") === "company"
                      ? "Micro Influencers, Content Creators"
                      : "Brand Deals, Sponsorships"
                  }
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>
              {stepErrors.lookingFor && (
                <span className="text-red-500 text-xs absolute top-0 right-0">
                  {stepErrors.lookingFor.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex space-x-4 mt-8">
            <button
              type="button"
              className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors flex items-center justify-center space-x-2"
              onClick={() => navigate("/auth/signup/profile-details")}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Continue</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </form>
    </>
  );

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const SecurityStep = (
    <>
      <ProgressBar currentStep={getCurrentStep()} />
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const isValid = await validateStep(securitySchema);
          if (!isValid) {
            console.log("Continue (SecurityStep) errors:", stepErrors);
          }
          if (isValid) navigate("/auth/signup/review");
        }}
        className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 pt-20"
      >
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Secure Your Account
            </h2>
            <p className="text-gray-600">Create a strong password</p>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  {...register("password", { required: true })}
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
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
              {(errors.password || stepErrors.password) && (
                <span className="text-red-500 text-xs absolute top-0 right-0">
                  {errors.password?.message ||
                    stepErrors.password?.message ||
                    "Password is required"}
                </span>
              )}
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  {...register("confirmPassword", {
                    required: true,
                    validate: (value) => value === getValues("password"),
                  })}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
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
              {(errors.confirmPassword || stepErrors.confirmPassword) && (
                <span className="text-red-500 text-xs absolute top-0 right-0">
                  {errors.confirmPassword?.type === "validate"
                    ? "Passwords do not match"
                    : errors.confirmPassword?.message ||
                      stepErrors.confirmPassword?.message ||
                      "Confirm password is required"}
                </span>
              )}
            </div>
          </div>
          <div className="flex space-x-4 mt-8">
            <button
              type="button"
              className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors flex items-center justify-center space-x-2"
              onClick={() => navigate("/auth/signup/bio-interests")}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Continue</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </form>
    </>
  );

  const ReviewStep = (
    <>
      <ProgressBar currentStep={getCurrentStep()} />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 pt-20">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-4xl">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Sparkles className="w-12 h-12 text-white animate-pulse" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <Check className="w-5 h-5 text-white" />
              </div>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
              Almost There! 🎉
            </h2>
            <p className="text-gray-600 text-lg max-w-md mx-auto">
              Review your information before creating your account. Everything
              looks great!
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-gray-700">
                Profile Completion
              </span>
              <span className="text-sm font-bold text-green-600">100%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
              <div
                className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full shadow-sm transition-all duration-1000 ease-out"
                style={{ width: "100%" }}
              />
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Personal Information Card */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                  <User className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-purple-800">
                  Personal Info
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-purple-200 last:border-b-0">
                  <span className="text-sm font-medium text-purple-700">
                    Type:
                  </span>
                  <span className="px-3 py-1 bg-purple-200 text-purple-800 rounded-full text-xs font-bold uppercase tracking-wide">
                    {watch("userType")}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-purple-200 last:border-b-0">
                  <span className="text-sm font-medium text-purple-700">
                    Username:
                  </span>
                  <span className="text-sm font-bold text-purple-900 flex items-center">
                    <AtSign className="w-3 h-3 mr-1" />
                    {watch("username")}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-purple-200 last:border-b-0">
                  <span className="text-sm font-medium text-purple-700">
                    Email:
                  </span>
                  <span className="text-sm text-purple-800 flex items-center">
                    <Mail className="w-3 h-3 mr-1" />
                    {watch("email")}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-purple-700">
                    Social:
                  </span>
                  <span className="text-sm text-purple-800">
                    {watch("socialHandle")}
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Details Card */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                  <Tag className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-blue-800">
                  Profile Details
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-blue-200 last:border-b-0">
                  <span className="text-sm font-medium text-blue-700">
                    Category:
                  </span>
                  <span className="text-sm font-bold text-blue-900">
                    {watch("category")}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-blue-200 last:border-b-0">
                  <span className="text-sm font-medium text-blue-700">
                    Location:
                  </span>
                  <span className="text-sm text-blue-800 flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {watch("location")}
                  </span>
                </div>
                {watch("website") && (
                  <div className="flex justify-between items-center py-2 border-b border-blue-200 last:border-b-0">
                    <span className="text-sm font-medium text-blue-700">
                      Website:
                    </span>
                    <span className="text-sm text-blue-600 hover:underline truncate max-w-32 flex items-center">
                      <Globe className="w-3 h-3 mr-1" />
                      {watch("website")}
                    </span>
                  </div>
                )}
                {watch("userType") === "influencer" && watch("followers") && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm font-medium text-blue-700">
                      Followers:
                    </span>
                    <span className="text-sm font-bold text-blue-900 flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      {parseInt(watch("followers")).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* About & Interests Card */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-green-800">About You</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-green-700 block mb-2">
                    Bio:
                  </span>
                  <div className="bg-white p-3 rounded-lg border border-green-200 shadow-sm">
                    <p className="text-sm text-green-800 leading-relaxed">
                      {watch("bio")}
                    </p>
                  </div>
                </div>
                {watch("interests") && watch("interests").length > 0 && (
                  <div>
                    <span className="text-sm font-medium text-green-700 block mb-2">
                      Interests:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {watch("interests").map((interest, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-green-200 text-green-800 rounded-full text-xs font-medium"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {watch("lookingFor") && watch("lookingFor").length > 0 && (
                  <div>
                    <span className="text-sm font-medium text-green-700 block mb-2">
                      Looking For:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {watch("lookingFor").map((item, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-yellow-200 text-yellow-800 rounded-full text-xs font-medium flex items-center"
                        >
                          <Target className="w-3 h-3 mr-1" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Security Status */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-4 mb-8 border border-indigo-200">
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Lock className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-indigo-800">
                  Password secured and verified
                </span>
                <Check className="w-5 h-5 text-green-500" />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              type="button"
              className="flex-1 px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-2xl transition-all duration-300 flex items-center justify-center space-x-3 group"
              onClick={() => navigate("/auth/signup/security")}
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Edit</span>
            </button>
            <button
              type="button"
              className="flex-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-3 group"
              onClick={async () => {
                const isValid = await validateStep(signUpSchema);
                if (!isValid) {
                  console.log(
                    "Create Account (ReviewStep) errors:",
                    stepErrors
                  );
                }
                if (isValid) {
                  console.log("Form submitted:", getSavedData());
                  navigate("/auth/login", { state: { fromSignUp: true } });
                }
              }}
            >
              <span>Create My Account</span>
              <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Footer Note */}
          <div className="text-center mt-6">
            <p className="text-xs text-gray-500">
              By creating an account, you agree to our Terms of Service and
              Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </>
  );

  // Place resetAll before useEffect so it can be registered
  const resetAll = () => {
    setSignupFormData({});
    setUserType("");
    Object.keys(initialDefaultValues).forEach((key) => {
      setValue(key, initialDefaultValues[key]);
    });
  };

  useEffect(() => {
    setResetAll(() => resetAll());
  }, [setResetAll]);

  // Fix: Always get the latest savedData from useLocalStorage for validation and step checks
  const getSavedData = () => signupFormData || {};

  // Helper to check if a step is completed (use latest data)
  const isStepCompleted = (step) => {
    const data = getSavedData();
    switch (step) {
      case "basic-info":
        return !!(
          data.userType &&
          data.username &&
          data.email &&
          data.socialHandle
        );
      case "profile-details":
        return (
          isStepCompleted("basic-info") &&
          data.category &&
          data.location &&
          (data.userType === "company" ||
            (data.userType === "influencer" && data.followers !== undefined))
        );
      case "bio-interests":
        return (
          isStepCompleted("profile-details") &&
          data.bio &&
          Array.isArray(data.interests) &&
          data.interests.length > 0 &&
          Array.isArray(data.lookingFor) &&
          data.lookingFor.length > 0
        );
      case "security":
        return (
          isStepCompleted("bio-interests") &&
          data.password &&
          data.confirmPassword
        );
      case "review":
        return isStepCompleted("security");
      default:
        return true;
    }
  };

  // Reset all form data when navigating to /login

  return (
    <Routes>
      <Route
        index
        element={<Navigate to="/auth/signup/userselect" replace />}
      />
      <Route path="userselect" element={UserSelectStep} />
      <Route
        path="basic-info"
        element={
          userType ? (
            BasicInfoStep
          ) : (
            <Navigate to="/auth/signup/userselect" replace />
          )
        }
      />
      <Route
        path="profile-details"
        element={
          !isStepCompleted("basic-info") ? (
            <Navigate to="/auth/signup/basic-info" replace />
          ) : userType ? (
            ProfileDetailsStep
          ) : (
            <Navigate to="/auth/signup/userselect" replace />
          )
        }
      />
      <Route
        path="bio-interests"
        element={
          !isStepCompleted("profile-details") ? (
            <Navigate to="/auth/signup/profile-details" replace />
          ) : userType ? (
            BioInterestsStep
          ) : (
            <Navigate to="/auth/signup/userselect" replace />
          )
        }
      />
      <Route
        path="security"
        element={
          !isStepCompleted("bio-interests") ? (
            <Navigate to="/auth/signup/bio-interests" replace />
          ) : userType ? (
            SecurityStep
          ) : (
            <Navigate to="/auth/signup/userselect" replace />
          )
        }
      />
      <Route
        path="review"
        element={
          !isStepCompleted("security") ? (
            <Navigate to="/auth/signup/security" replace />
          ) : userType ? (
            ReviewStep
          ) : (
            <Navigate to="/auth/signup/userselect" replace />
          )
        }
      />
    </Routes>
  );
};

export default SignUp;
