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
  AtSign,
  Users,
  Sparkles,
} from "lucide-react";
import { useForm } from "react-hook-form";
import UserSelect from "./UserSellect";
import {
  signUpSchema,
  createStepSchema,
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
  const [signupFormData, setSignupFormData] = useLocalStorage(
    "signupFormData",
    {}
  );

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
    setValue,
    watch,
    getValues,
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
      setSignupFormData(value);
    });
    return () => subscription.unsubscribe();
  }, [watch, setSignupFormData]);

  // --- Step-wise validation function with allowUnknown and context for userType ---
  const validateStep = async (schema) => {
    const values = getValues();
    const { error } = schema.validate(values, {
      abortEarly: false,
      allowUnknown: true,
      convert: true,
      context: { userType: values.userType },
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

                {Array.isArray(watch("interests")) &&
                  watch("interests").length > 0 && (
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

                {Array.isArray(watch("lookingFor")) &&
                  watch("lookingFor").length > 0 && (
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

  const data = [
    {
      index: 0,
      name: "Basic Info",
      slogan: "tell us about yourself",
      elementName: "BasicInfoStep",
      RoutePath: "basic-info",
      icon: [
        <User className="w-8 h-8 text-white" />,
        <Building2 className="w-8 h-8 text-white" />,
      ],
      inputs: [
        {
          name: "username",
          label: "Username",
          placeholder: "travel_with_anna",
          icon: (
            <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          ),
          type: "text",
        },
        {
          name: "email",
          label: "Email Address",
          placeholder: "your@email.com",
          icon: (
            <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          ),
          type: "email",
        },
        {
          name: "socialHandle",
          label: "Social Handle",
          placeholder: "@your_handle",
          type: "text",
        },
      ],
    },
    {
      index: 1,
      name: "Profile Details",
      slogan: "Help others discover you",
      elementName: "ProfileDetailsStep",
      RoutePath: "profile-details",
      icon: <Tag className="w-8 h-8 text-white" />,
      inputs: [
        {
          name: "category",
          label: "Category",
          placeholder: "Travel",
          type: "text",
        },
        {
          name: "website",
          label: "Website",
          placeholder: "not required",
          icon: (
            <Globe className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          ),
          type: "url",
        },
        {
          name: "location",
          label: "Location",
          placeholder: "Barcelona, Spain",
          icon: (
            <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          ),
          type: "text",
        },
        {
          name: "followers",
          label: "Followers Count",
          placeholder: "85400",
          type: "number",
          showIf: (userType) => userType === "influencer", // Optional conditional field logic
        },
      ],
    },
    {
      index: 2,
      name: "Bio Interests",
      slogan: "Share your story and interests",
      elementName: "BioInterestsStep",
      RoutePath: "bio-interests",
      icon: <Heart className="w-8 h-8 text-white" />,
      inputs: [
        {
          name: "bio",
          label: "Bio",
          placeholder: "Tell us about yourself...",
          type: "textarea",
          rows: 4,
        },
        {
          name: "interests",
          label: "Interests",
          placeholder: "photography, travel, food (comma separated)",
          type: "text",
          isArrayInput: true,
        },
        {
          name: "lookingFor",
          label: "Looking For",
          placeholder: "Brand Deals, Sponsorships",
          type: "text",
          isArrayInput: true,
          icon: (
            <Target className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          ),
          getPlaceholder: (userType) =>
            userType === "company"
              ? "Micro Influencers, Content Creators"
              : "Brand Deals, Sponsorships",
        },
      ],
    },
    {
      index: 3,
      name: "Security",
      slogan: "Create a strong password",
      elementName: "SecurityStep",
      RoutePath: "security",
      icon: <Lock className="w-8 h-8 text-white" />,
      inputs: [
        {
          name: "password",
          label: "Password",
          placeholder: "Create a strong password",
          type: "password",
          hasToggle: true,
        },
        {
          name: "confirmPassword",
          label: "Confirm Password",
          placeholder: "Confirm your password",
          type: "password",
          hasToggle: true,
          validate: (value, getValues) => value === getValues("password"),
        },
      ],
    },
  ];

  // Place resetAll before useEffect so it can be registered
  const resetAll = () => {
    setSignupFormData({});
    setUserType("");
    Object.keys(initialDefaultValues).forEach((key) => {
      setValue(key, initialDefaultValues[key]);
    });
  };

  useEffect(() => {
    setResetAll(() => resetAll()); // ✅ Set function reference, not invocation
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

  const signInStepsFunct = (WholeData, route) => {
    const stepData = WholeData.find((item) => item.RoutePath === route);
    const nextStep = WholeData.find(
      (item) => item.index === stepData.index + 1
    );
    const prevStep = WholeData.find(
      (item) => item.index === stepData.index - 1
    );

    return (
      <>
        <ProgressBar currentStep={getCurrentStep()} />
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            stepData.inputs?.forEach((input) => {
              if (input.isArrayInput) {
                const raw = getValues(input.name);

                const arr = Array.isArray(raw)
                  ? raw
                  : typeof raw === "string"
                  ? raw
                      .split(",")
                      .map((item) => item.trim())
                      .filter(Boolean)
                  : [];

                setValue(input.name, arr);
              }
            });

            const inputNames = stepData.inputs.map((i) => i.name);
            const dynamicSchema = createStepSchema(inputNames);
            const isValid = await validateStep(dynamicSchema);

            if (!isValid) {
              console.log(
                `Continue (${stepData.elementName}) errors:`,
                stepErrors
              );
            }
            if (isValid) {
              if (nextStep) {
                navigate(`/auth/signup/${nextStep.RoutePath}`);
              } else {
                navigate("/auth/signup/review");
              }
            }
          }}
          className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 pt-20"
        >
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                {stepData.RoutePath !== "basic-info"
                  ? stepData.icon
                  : watch("userType") === "company"
                  ? stepData.icon[1]
                  : stepData.icon[0]}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {stepData.name}
              </h2>
              <p className="text-gray-600">{stepData.slogan}</p>
            </div>

            <div className="space-y-6">
              {stepData.inputs
                ?.filter((input) => {
                  if (typeof input.showIf === "function") {
                    return input.showIf(watch("userType"));
                  }
                  return true;
                })
                .map((input) => (
                  <div key={input.name} className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {input.label}
                    </label>
                    <div className="relative">
                      {input.icon && input.icon}
                      <input
                        {...register(input.name, { required: true })}
                        type={input.type || "text"}
                        placeholder={input.placeholder}
                        className={`w-full ${
                          input.icon ? "pl-12" : "px-4"
                        } pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition-colors`}
                      />
                    </div>
                    {(errors[input.name] || stepErrors[input.name]) && (
                      <span className="text-red-500 text-xs absolute top-0 right-0">
                        {errors[input.name]?.message ||
                          stepErrors[input.name]?.message ||
                          `${input.label} is required`}
                      </span>
                    )}
                  </div>
                ))}
            </div>

            <div className="flex space-x-4 mt-8">
              <button
                type="button"
                className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors flex items-center justify-center space-x-2"
                onClick={() => {
                  if (prevStep) {
                    navigate(`/auth/signup/${prevStep.RoutePath}`);
                  } else {
                    navigate("/auth/signup/userselect");
                  }
                }}
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
  };

  const CreateStepRoutes = (WholeData) => {
    WholeData.map((step, index) => {
      const prevStep = WholeData.find((el) => el.index === index - 1);
      console.log("hello");
      return (
        <Route
          path={step.RoutePath}
          element={
            prevStep ? (
              !isStepCompleted(`${prevStep.RoutePath}`) ? (
                <Navigate to={`/auth/signup/${prevStep.RoutePath}`} replace />
              ) : userType ? (
                signInStepsFunct(WholeData, step.RoutePath)
              ) : (
                <Navigate to={`/auth/signup/userselect`} replace />
              )
            ) : userType ? (
              signInStepsFunct(WholeData, step.RoutePath)
            ) : (
              <Navigate to={`/auth/signup/userselect`} replace />
            )
          }
        />
      );
    });
  };

  return (
    <Routes>
      <Route
        index
        element={<Navigate to="/auth/signup/userselect" replace />}
      />
      <Route path="userselect" element={UserSelectStep} />
      {data.map((step, index) => {
        const prevStep = data.find((el) => el.index === index - 1);
        return (
          <Route
            key={step.RoutePath}
            path={step.RoutePath}
            element={
              prevStep ? (
                !isStepCompleted(`${prevStep.RoutePath}`) ? (
                  <Navigate to={`/auth/signup/${prevStep.RoutePath}`} replace />
                ) : userType ? (
                  signInStepsFunct(data, step.RoutePath)
                ) : (
                  <Navigate to={`/auth/signup/userselect`} replace />
                )
              ) : userType ? (
                signInStepsFunct(data, step.RoutePath)
              ) : (
                <Navigate to={`/auth/signup/userselect`} replace />
              )
            }
          />
        );
      })}
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
