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
  Eye,
  Building,
  Shield,
  CheckCircle,
} from "lucide-react";
import { useForm } from "react-hook-form";
import UserSelect from "./UserSellect.jsx";
import {
  signUpSchema,
  createStepSchema,
} from "../../validations/SignUp.validations";
import { useLocalStorage } from "usehooks-ts";
import ErrorPage from "../errorPage.jsx";

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

  // Add these state variables for edit functionality
  const [editingSection, setEditingSection] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [stepErrors, setStepErrors] = useState({});

  // Get state from location for edit context
  const { state } = location;
  const isFromReview = state?.fromReview;
  const editingSectionFromState = state?.editingSection;
  const editingFieldFromState = state?.editingField;

  // Set editing state from location state when navigating from review
  useEffect(() => {
    if (editingSectionFromState) {
      setEditingSection(editingSectionFromState);
    }
    if (editingFieldFromState) {
      setEditingField(editingFieldFromState);
    }
  }, [editingSectionFromState, editingFieldFromState]);

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

  // Add this helper function to handle edit navigation
  const handleEditSection = (sectionType, fieldName = null) => {
    setEditingSection(sectionType);
    setEditingField(fieldName);

    // Navigate to appropriate step based on field being edited
    const fieldToStepMap = {
      username: "basic-info",
      email: "basic-info",
      socialHandle: "basic-info",
      category: "profile-details",
      location: "profile-details",
      website: "profile-details",
      followers: "profile-details",
      bio: "bio-interests",
      interests: "bio-interests",
      lookingFor: "bio-interests",
      password: "security",
      confirmPassword: "security",
    };

    const targetStep = fieldToStepMap[fieldName] || sectionType;
    navigate(`/auth/signup/${targetStep}`, {
      state: {
        editingSection: sectionType,
        editingField: fieldName,
        fromReview: true,
      },
    });
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
          showIf: (userType) => userType === "influencer",
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

  const signInStepsFunct = (WholeData, route) => {
    const stepData = WholeData.find((item) => item.RoutePath === route);
    const nextStep = WholeData.find(
      (item) => item.index === stepData.index + 1
    );
    const prevStep = WholeData.find(
      (item) => item.index === stepData.index - 1
    );

    // Check if we're in edit mode from review
    const isEditingFromReview = isFromReview || editingSection || editingField;

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
              // If we're editing from review, go back to review instead of next step
              if (isEditingFromReview) {
                // Clear editing state
                setEditingSection(null);
                setEditingField(null);
                navigate("/auth/signup/review");
              } else {
                // Normal flow - go to next step
                if (nextStep) {
                  navigate(`/auth/signup/${nextStep.RoutePath}`);
                } else {
                  navigate("/auth/signup/review");
                }
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
                {/* Show "Edit" prefix when in edit mode */}
                {isEditingFromReview ? `Edit ${stepData.name}` : stepData.name}
              </h2>
              <p className="text-gray-600">
                {isEditingFromReview
                  ? `Update your ${stepData.name.toLowerCase()} and return to review`
                  : stepData.slogan}
              </p>
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
                      {/* Show indicator if this specific field is being edited */}
                      {editingField === input.name && (
                        <span className="ml-2 text-xs text-purple-600 font-medium">
                          (Editing)
                        </span>
                      )}
                    </label>
                    <div className="relative">
                      {input.icon && input.icon}
                      <input
                        {...register(input.name, { required: true })}
                        type={input.type || "text"}
                        placeholder={input.placeholder}
                        className={`w-full ${
                          input.icon ? "pl-12" : "px-4"
                        } pr-4 py-3 border-2 rounded-xl focus:border-purple-500 focus:outline-none transition-colors ${
                          editingField === input.name
                            ? "border-purple-300 bg-purple-50"
                            : "border-gray-300"
                        }`}
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
                  if (isEditingFromReview) {
                    // If editing from review, go back to review without saving
                    setEditingSection(null);
                    setEditingField(null);
                    navigate("/auth/signup/review");
                  } else {
                    // Normal back navigation
                    if (prevStep) {
                      navigate(`/auth/signup/${prevStep.RoutePath}`);
                    } else {
                      navigate("/auth/signup/userselect");
                    }
                  }
                }}
              >
                <ArrowLeft className="w-5 h-5" />
                <span>{isEditingFromReview ? "Cancel" : "Back"}</span>
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>
                  {isEditingFromReview ? "Save & Return" : "Continue"}
                </span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Show editing indicator at the bottom */}
            {isEditingFromReview && (
              <div className="mt-6 p-3 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-purple-700 font-medium">
                    Editing from review
                  </span>
                </div>
                <p className="text-xs text-purple-600 mt-1">
                  Your changes will be saved when you click "Save & Return"
                </p>
              </div>
            )}
          </div>
        </form>
      </>
    );
  };

  const ReviewStep = (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-6 py-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-600 rounded-lg mb-4">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Review Account Details
              </h1>
              <p className="text-gray-600 max-w-md mx-auto">
                Click on any field to edit it directly, or use the section edit
                buttons.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">
                Setup Progress
              </span>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm font-semibold text-green-600">
                  Complete
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div className="bg-green-600 h-1.5 rounded-full w-full transition-all duration-500"></div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Account & Security */}
            <div className="lg:col-span-1 space-y-6">
              {/* Account Information */}
              <div
                className={`bg-white rounded-lg border shadow-sm transition-all duration-200 ${
                  editingSection === "account"
                    ? "border-purple-300 ring-2 ring-purple-100"
                    : "border-gray-200"
                }`}
              >
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Account Information
                  </h3>
                </div>
                <div className="px-6 py-4 space-y-4">
                  {/* Account Type Field - Navigate to userselect */}
                  <div
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 px-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group min-h-[44px]"
                    onClick={() => {
                      setEditingSection("account");
                      setEditingField("userType");
                      navigate("/auth/signup/userselect", {
                        state: {
                          editingSection: "account",
                          editingField: "userType",
                          fromReview: true,
                        },
                      });
                    }}
                  >
                    <span className="text-sm text-gray-600 group-hover:text-gray-800 mb-1 sm:mb-0">
                      Account Type
                    </span>
                    <span className="text-sm font-medium text-gray-900 capitalize flex items-center group-hover:text-purple-600 break-words">
                      <Building className="w-4 h-4 mr-1.5 text-gray-400 group-hover:text-purple-500 flex-shrink-0" />
                      <span className="truncate">{watch("userType")}</span>
                    </span>
                  </div>

                  {/* Username Field */}
                  <div
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 px-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group min-h-[44px]"
                    onClick={() => handleEditSection("basic-info", "username")}
                  >
                    <span className="text-sm text-gray-600 group-hover:text-gray-800 mb-1 sm:mb-0">
                      Username
                    </span>
                    <span className="text-sm font-medium text-gray-900 flex items-center group-hover:text-purple-600 break-words">
                      <AtSign className="w-4 h-4 mr-1.5 text-gray-400 group-hover:text-purple-500 flex-shrink-0" />
                      <span className="truncate max-w-[160px]">
                        {watch("username")}
                      </span>
                    </span>
                  </div>

                  {/* Email Field */}
                  <div
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 px-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group min-h-[44px]"
                    onClick={() => handleEditSection("basic-info", "email")}
                  >
                    <span className="text-sm text-gray-600 group-hover:text-gray-800 mb-1 sm:mb-0">
                      Email
                    </span>
                    <span className="text-sm font-medium text-gray-900 flex items-center group-hover:text-purple-600 break-words">
                      <Mail className="w-4 h-4 mr-1.5 text-gray-400 group-hover:text-purple-500 flex-shrink-0" />
                      <span className="truncate max-w-[160px]">
                        {watch("email")}
                      </span>
                    </span>
                  </div>

                  {/* Social Handle Field */}
                  <div
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 px-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group min-h-[44px]"
                    onClick={() =>
                      handleEditSection("basic-info", "socialHandle")
                    }
                  >
                    <span className="text-sm text-gray-600 group-hover:text-gray-800 mb-1 sm:mb-0">
                      Social Handle
                    </span>
                    <span className="text-sm font-medium text-gray-900 flex items-center group-hover:text-purple-600 break-words">
                      <Sparkles className="w-4 h-4 mr-1.5 text-gray-400 group-hover:text-purple-500 flex-shrink-0" />
                      <span className="truncate max-w-[160px]">
                        {watch("socialHandle")}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Security Status */}
              <div
                className={`bg-white rounded-lg border shadow-sm transition-all duration-200 ${
                  editingSection === "security"
                    ? "border-purple-300 ring-2 ring-purple-100"
                    : "border-gray-200"
                }`}
              >
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Security
                  </h3>
                </div>
                <div className="px-6 py-4">
                  <div
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group"
                    onClick={() => handleEditSection("security", "password")}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-purple-100">
                        <Shield className="w-4 h-4 text-green-600 group-hover:text-purple-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 group-hover:text-purple-600 truncate">
                        Password Secured
                      </p>
                      <p className="text-xs text-gray-500">
                        Click to change password
                      </p>
                    </div>
                    <Check className="w-5 h-5 text-green-600 group-hover:text-purple-600 flex-shrink-0" />
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Profile Details */}
            <div className="lg:col-span-2">
              <div
                className={`bg-white rounded-lg border shadow-sm transition-all duration-200 ${
                  editingSection === "profile"
                    ? "border-purple-300 ring-2 ring-purple-100"
                    : "border-gray-200"
                }`}
              >
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Profile Details
                  </h3>
                </div>

                <div className="px-6 py-6">
                  {/* Profile Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 mb-6 pb-6 border-b border-gray-200">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <User className="w-8 h-8 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xl font-semibold text-gray-900 mb-1 break-words">
                        @{watch("username")}
                      </h4>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 text-sm text-gray-600 mb-2">
                        {/* Clickable Category */}
                        <span
                          className="flex items-center hover:text-purple-600 cursor-pointer transition-colors group break-words"
                          onClick={() =>
                            handleEditSection("profile-details", "category")
                          }
                        >
                          <Tag className="w-4 h-4 mr-1 group-hover:text-purple-500 flex-shrink-0" />
                          <span className="truncate">{watch("category")}</span>
                          <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                        </span>
                        {/* Clickable Location */}
                        <span
                          className="flex items-center hover:text-purple-600 cursor-pointer transition-colors group break-words"
                          onClick={() =>
                            handleEditSection("profile-details", "location")
                          }
                        >
                          <MapPin className="w-4 h-4 mr-1 group-hover:text-purple-500 flex-shrink-0" />
                          <span className="truncate">{watch("location")}</span>
                          <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                        </span>
                      </div>
                      {/* Clickable Website */}
                      {watch("website") && (
                        <div
                          className="text-sm text-purple-600 hover:text-purple-700 flex items-center cursor-pointer group break-all"
                          onClick={() =>
                            handleEditSection("profile-details", "website")
                          }
                        >
                          <Globe className="w-4 h-4 mr-1 flex-shrink-0" />
                          <span className="truncate">{watch("website")}</span>
                          <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                        </div>
                      )}
                    </div>
                    {/* Clickable Followers (if influencer) */}
                    {watch("userType") === "influencer" && (
                      <div
                        className="text-center sm:text-right cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors group flex-shrink-0"
                        onClick={() =>
                          handleEditSection("profile-details", "followers")
                        }
                      >
                        <div className="flex items-center justify-center sm:justify-end text-sm text-gray-900 font-medium group-hover:text-purple-600">
                          <Users className="w-4 h-4 mr-1" />
                          <span className="whitespace-nowrap">
                            {watch("followers")
                              ? parseInt(watch("followers")).toLocaleString()
                              : 0}
                          </span>
                          <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-xs text-gray-500">Followers</p>
                      </div>
                    )}
                  </div>

                  {/* Clickable Bio */}
                  <div
                    className="mb-6 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group"
                    onClick={() => handleEditSection("bio-interests", "bio")}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="text-sm font-medium text-gray-900 group-hover:text-purple-600">
                        About
                      </h5>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-purple-500 flex-shrink-0" />
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed group-hover:text-gray-900 break-words">
                      {watch("bio")}
                    </p>
                  </div>

                  {/* Clickable Interests */}
                  {Array.isArray(watch("interests")) &&
                    watch("interests").length > 0 && (
                      <div
                        className="mb-6 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group"
                        onClick={() =>
                          handleEditSection("bio-interests", "interests")
                        }
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="text-sm font-medium text-gray-900 group-hover:text-purple-600">
                            Interests
                          </h5>
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-purple-500 flex-shrink-0" />
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {watch("interests").map((interest, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium group-hover:bg-purple-100 group-hover:text-purple-700 transition-colors break-words"
                            >
                              {interest}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Clickable Looking For */}
                  {Array.isArray(watch("lookingFor")) &&
                    watch("lookingFor").length > 0 && (
                      <div
                        className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group"
                        onClick={() =>
                          handleEditSection("bio-interests", "lookingFor")
                        }
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="text-sm font-medium text-gray-900 group-hover:text-purple-600">
                            Collaboration Interests
                          </h5>
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-purple-500 flex-shrink-0" />
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {watch("lookingFor").map((item, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium group-hover:bg-purple-100 transition-colors flex items-center break-words"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={() => {
                setEditingSection(null);
                setEditingField(null);
                navigate("/auth/signup/security");
              }}
              className="flex-1 px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Edit</span>
            </button>
            <button
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
              className="flex-2 px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-sm"
            >
              <span>Create Account</span>
              <CheckCircle className="w-4 h-4" />
            </button>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              By creating an account, you agree to our{" "}
              <a
                href="#"
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );

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
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default SignUp;
