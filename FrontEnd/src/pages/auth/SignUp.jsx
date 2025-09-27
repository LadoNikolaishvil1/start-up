import React, { useEffect, useRef, useState } from "react";
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
  const [isFromEditedUserType, setIsFromEditedUserType] = useLocalStorage(
    "isFromEditedUserType",
    false
  );

  // Get state from location for edit context
  const { state } = location;
  const isFromReview = state?.fromReview;
  const editingSectionFromState = state?.editingSection;
  const editingFieldFromState = state?.editingField;

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
          placeholder: "Optional",
          icon: (
            <Globe className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          ),
          type: "url",
          showIf: (userType) => userType === "company",
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
        {
          name: "hobbies",
          label: "Hobbies",
          placeholder: "photography, travel, food (comma separated)",
          type: "text",
          isArrayInput: true,
          showIf: (userType) => userType === "influencer",
        },
        {
          name: "employer",
          label: "Employer",
          placeholder: "Your employer's name",
          type: "text",
          showIf: (userType) => userType === "company",
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
        {
          name: "securityKey",
          label: "Security Key",
          placeholder: "Enter a security key",
          type: "text",
          showIf: (userType) => userType === "influencer",
        },
      ],
    },
  ];

  const initialDefaultValues = data.reduce(
    (acc, step) => {
      step.inputs?.forEach((input) => {
        if (input.isArrayInput) {
          acc[input.name] = [];
        } else {
          acc[input.name] = "";
        }
      });
      return acc;
    },
    { userType: "" }
  );

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

  const ProgressBar = ({ currentStep }) => {
    const totalSteps = data.length + 2; // +1 for userselect, +1 for review
    const progress = (currentStep / totalSteps) * 100;

    const stepNames = {
      1: "User Type",
      ...data.reduce((acc, step, index) => {
        acc[index + 2] = step.name;
        return acc;
      }, {}),
      [totalSteps]: "Review",
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

  // Set editing state from location state when navigating from review
  useEffect(() => {
    if (editingSectionFromState) {
      setEditingSection(editingSectionFromState);
    }
    if (editingFieldFromState) {
      setEditingField(editingFieldFromState);
    }
  }, [editingSectionFromState, editingFieldFromState]);

  useEffect(() => {
    // Clear editing states when returning from UserSelect
    if (state?.clearEditingStates) {
      setEditingSection(null);
      setEditingField(null);
      setIsFromEditedUserType(state?.isFromEditedUserType || false);
      // Clear the navigation state by replacing the current history entry
      window.history.replaceState({}, "", location.pathname);
    }
  }, [state?.clearEditingStates]);

  const getCurrentStep = () => {
    const path = location.pathname.split("/").pop();
    if (path === "userselect") return 1;
    if (path === "review") return data.length + 2;

    const stepData = data.find((step) => step.RoutePath === path);
    return stepData ? stepData.index + 2 : 1;
  };

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

  const getFieldsForUserType = (userType) => {
    const allFields = data.reduce((acc, step) => {
      step.inputs?.forEach((input) => {
        if (!input.showIf || input.showIf(userType)) {
          acc.push(input.name);
        }
      });
      return acc;
    }, []);

    // Always include basic fields that might not be in data array
    return ["userType", ...allFields];
  };

  const cleanDataForUserType = (formData, userType) => {
    const cleanedData = {};

    // Get all possible fields from your data structure
    const allPossibleFields = data.reduce((acc, step) => {
      step.inputs?.forEach((input) => {
        acc[input.name] = input; // Store the full input config
      });
      return acc;
    }, {});

    // Add userType field
    cleanedData.userType = userType;

    // Only include fields that are relevant to the current user type
    Object.keys(formData).forEach((fieldName) => {
      if (fieldName === "userType") return; // Already handled above

      const inputConfig = allPossibleFields[fieldName];

      // If field exists in our data structure
      if (inputConfig) {
        // Check if field should be included for this user type
        if (!inputConfig.showIf || inputConfig.showIf(userType)) {
          cleanedData[fieldName] = formData[fieldName];
        }
        // If showIf exists and returns false, exclude this field entirely
      } else {
        // For fields not in our data structure (like confirmPassword), include them
        cleanedData[fieldName] = formData[fieldName];
      }
    });

    return cleanedData;
  };

  const handleUserTypeChange = (newUserType) => {
    const currentData = getValues();

    Object.keys(initialDefaultValues).forEach((key) => {
      setValue(key, initialDefaultValues[key]);
    });

    setValue("userType", newUserType);
    setUserType(newUserType);

    const allowedFields = getFieldsForUserType(newUserType);

    const cleanedData = { userType: newUserType };
    allowedFields.forEach((field) => {
      if (field === "userType") return;

      if (currentData[field] !== undefined && currentData[field] !== "") {
        setValue(field, currentData[field]);
        cleanedData[field] = currentData[field];
      } else {
        cleanedData[field] = initialDefaultValues[field];
      }
    });

    setSignupFormData(cleanedData);

    // Force a re-render to ensure conditional fields appear
    setTimeout(() => {
      const updatedData = getValues();
      setSignupFormData(updatedData);
    }, 0);

    // Navigate to first step that needs fields for this user type
    const nextRequired = getNextRequiredStep(newUserType);
    if (nextRequired) {
      const requiredFieldNames = nextRequired.fields.map((f) => f.field);
      navigate(`/auth/signup/${nextRequired.step}`, {
        state: {
          requiredFields: requiredFieldNames,
          isFromEditedUserType: true,
          fromNavigation: true,
        },
      });
    } else {
      navigate("/auth/signup/review");
    }
  };

  useEffect(() => {
    if (userType && userType !== watch("userType")) {
      setValue("userType", userType);
    }
  }, [userType, watch, setValue]);
  // Get missing fields for current user type
  const getMissingFields = (currentUserType) => {
    const savedData = getSavedData();
    const missingFields = [];

    data.forEach((step) => {
      step.inputs?.forEach((input) => {
        if (input.showIf && !input.showIf(currentUserType)) return;

        const value = savedData[input.name];
        const isEmpty =
          !value ||
          value === "" ||
          (Array.isArray(value) && value.length === 0);

        if (isEmpty) {
          missingFields.push({
            field: input.name,
            step: step.RoutePath,
            stepIndex: step.index,
            input: input,
          });
        }
      });
    });

    return missingFields;
  };

  const getNextRequiredStep = (currentUserType) => {
    const savedData = getSavedData();
    const missingFields = [];

    data.forEach((step) => {
      step.inputs?.forEach((input) => {
        // Check if field applies to current user type
        if (input.showIf && !input.showIf(currentUserType)) return;

        const value = savedData[input.name];
        const isEmpty =
          !value ||
          value === "" ||
          (Array.isArray(value) && value.length === 0);

        if (isEmpty) {
          missingFields.push({
            field: input.name,
            step: step.RoutePath,
            stepIndex: step.index,
            input: input,
            isUserTypeSpecific: !!input.showIf,
          });
        }
      });
    });

    if (missingFields.length === 0) return null;

    // Group by step
    const fieldsByStep = missingFields.reduce((acc, field) => {
      if (!acc[field.step]) acc[field.step] = [];
      acc[field.step].push(field);
      return acc;
    }, {});

    // Sort steps by index
    const stepKeys = Object.keys(fieldsByStep);
    const sortedSteps = stepKeys.sort((a, b) => {
      const stepA = data.find((s) => s.RoutePath === a);
      const stepB = data.find((s) => s.RoutePath === b);
      return stepA.index - stepB.index;
    });

    return {
      currentStep: sortedSteps[0],
      fields: fieldsByStep[sortedSteps[0]],
      allRemainingSteps: sortedSteps,
      isLastStep: sortedSteps.length === 1,
    };
  };

  const getNextStepInSequence = (currentStepRoute, userType) => {
    const currentStepData = data.find(
      (step) => step.RoutePath === currentStepRoute
    );
    if (!currentStepData) return null;

    const currentIndex = currentStepData.index;

    // Find the next step that has fields for this user type OR has incomplete fields
    for (let i = currentIndex + 1; i < data.length; i++) {
      const nextStep = data[i];

      // Check if this step has any fields that apply to current user type
      const applicableFields = nextStep.inputs?.filter(
        (input) => !input.showIf || input.showIf(userType)
      );

      if (applicableFields && applicableFields.length > 0) {
        return {
          step: nextStep.RoutePath,
          fields: applicableFields.map((input) => ({
            field: input.name,
            step: nextStep.RoutePath,
            stepIndex: nextStep.index,
            input: input,
          })),
          isLastStep: i === data.length - 1,
        };
      }
    }

    return null; // No more steps
  };

  const getNextUserTypeSpecificStep = (currentStepRoute, currentUserType) => {
    // If no arguments, return all user-type-specific steps for the current user type
    if (!currentStepRoute || !currentUserType) {
      // You need to know the userType to filter steps
      // If you have a global or state userType, use it here
      const userType =
        currentUserType ||
        (typeof watch === "function" ? watch("userType") : undefined);
      if (!userType) return [];
      const filteredData = data
        .filter((step) =>
          step.inputs?.some((input) => input.showIf && input.showIf(userType))
        )
        .map((step) => ({
          step: step.RoutePath,
          fields: step.inputs
            .filter((input) => input.showIf && input.showIf(userType))
            .map((input) => ({
              field: input.name,
              step: step.RoutePath,
              stepIndex: step.index,
              input: input,
              isUserTypeSpecific: true,
            })),
          isLastStep: step.index === data.length - 1,
        }));
      console.log("filteredData", filteredData);
      return filteredData;
    }

    // ...existing code for single next step...
    const currentStepData = data.find(
      (step) => step.RoutePath === currentStepRoute
    );
    if (!currentStepData) return null;

    const currentIndex = currentStepData.index;

    for (let i = currentIndex + 1; i < data.length; i++) {
      const nextStep = data[i];
      const userTypeSpecificFields = nextStep.inputs?.filter(
        (input) => input.showIf && input.showIf(currentUserType)
      );
      if (userTypeSpecificFields && userTypeSpecificFields.length > 0) {
        return {
          step: nextStep.RoutePath,
          fields: userTypeSpecificFields.map((input) => ({
            field: input.name,
            step: nextStep.RoutePath,
            stepIndex: nextStep.index,
            input: input,
            isUserTypeSpecific: true,
          })),
          isLastStep: i === data.length - 1,
        };
      }
    }
    return null;
  };

  // Add this helper function before the signInStepsFunct function
  const getPreviousRequiredStep = (currentStepRoute, currentUserType) => {
    const currentStepData = data.find(
      (step) => step.RoutePath === currentStepRoute
    );
    if (!currentStepData) return null;

    const currentIndex = currentStepData.index;

    // Find the previous step that has fields for this user type
    for (let i = currentIndex - 1; i >= 0; i--) {
      const prevStep = data[i];

      // Check if this step has any fields that have showIf and return true for current user type
      const applicableFields = prevStep.inputs?.filter(
        (input) => input.showIf && input.showIf(currentUserType)
      );

      if (applicableFields && applicableFields.length > 0) {
        // Return the step with applicable fields (regardless of completion status)
        return {
          step: prevStep.RoutePath,
          fields: applicableFields.map((input) => ({
            field: input.name,
            step: prevStep.RoutePath,
            stepIndex: prevStep.index,
            input: input,
          })),
        };
      }
    }

    return null; // No previous step with applicable fields
  };

  const fieldToStepMap = data.reduce((acc, step) => {
    step.inputs?.forEach((input) => {
      acc[input.name] = step.RoutePath;
    });
    return acc;
  }, {});

  const handleEditSection = (sectionType, fieldName = null) => {
    if (fieldName) {
      const stepData = data.find((step) =>
        step.inputs?.some((input) => input.name === fieldName)
      );
      const inputData = stepData?.inputs?.find(
        (input) => input.name === fieldName
      );

      if (inputData?.showIf && !inputData.showIf(watch("userType"))) {
        return;
      }
    }

    setEditingSection(sectionType);
    setEditingField(fieldName);

    const targetStep = fieldToStepMap[fieldName] || sectionType;

    const currentUserType = watch("userType");
    const requiredFieldsForStep =
      data
        .find((step) => step.RoutePath === targetStep)
        ?.inputs?.filter(
          (input) =>
            (!input.showIf || input.showIf(currentUserType)) &&
            !getValues()[input.name]
        )
        ?.map((input) => input.name) || [];

    navigate(`/auth/signup/${targetStep}`, {
      state: {
        editingSection: sectionType,
        editingField: fieldName,
        fromReview: true,
        requiredFields: requiredFieldsForStep,
      },
    });
  };

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

  const getSavedData = () => signupFormData || {};

  const isStepCompleted = (stepRoute) => {
    const formData = getSavedData();
    const currentUserType = formData.userType;

    // Find the step in data array
    const stepData = data.find((step) => step.RoutePath === stepRoute);
    if (!stepData) return true;

    // Get only the required fields for this step and userType
    const requiredFields =
      stepData.inputs
        ?.filter((input) => {
          // Only include fields that are shown for this userType
          if (input.showIf && typeof input.showIf === "function") {
            return input.showIf(currentUserType);
          }
          return true;
        })
        .map((input) => input.name) || [];

    // Create a Joi schema for just these fields
    const stepSchema = createStepSchema(requiredFields);
    // Validate only the current step's fields
    const { error } = stepSchema.validate(formData, {
      abortEarly: false,
      allowUnknown: true,
      context: { userType: currentUserType },
    });

    // If there are errors, step is not completed
    if (error) return false;
    return true;
  };

  const UserSelectStep = (
    <>
      <ProgressBar currentStep={getCurrentStep()} />
      <div className="pt-20">
        <UserSelect
          colors={colors}
          userType={userType}
          setUserType={handleUserTypeChange}
          setCurrentPage={(page) => navigate(`/auth/signup/${page}`)}
          getNextRequiredStep={getNextRequiredStep}
          getNextUserTypeSpecificStep={getNextUserTypeSpecificStep}
        />
      </div>
    </>
  );

  const signInStepsFunct = (WholeData, route) => {
    const stepData = WholeData.find((item) => item.RoutePath === route);
    const nextStep = WholeData.find(
      (item) => item.index === stepData.index + 1
    );
    const prevStep = WholeData.find(
      (item) => item.index === stepData.index - 1
    );

    const isEditingFromReview = isFromReview || editingSection || editingField;
    const currentUserType = watch("userType");

    const requiredFieldsFromState = state?.requiredFields || [];
    const isLastRequiredStep = state?.isLastRequiredStep || false;

    const getFieldsToShow = () => {
      const currentUserType = watch("userType");

      // If editing a specific field, only show that field (and related fields like password/confirmPassword)
      if (editingField) {
        if (editingField === "password" && stepData.RoutePath === "security") {
          return stepData.inputs?.filter(
            (input) =>
              input.name === "password" || input.name === "confirmPassword"
          );
        }
        return stepData.inputs?.filter((input) => input.name === editingField);
      }

      // If we have specific required fields from state (coming from review or navigation)
      if (requiredFieldsFromState.length > 0) {
        return stepData.inputs?.filter(
          (input) =>
            requiredFieldsFromState.includes(input.name) &&
            (!input.showIf || input.showIf(currentUserType))
        );
      }

      // When coming from review (but no specific field) - show only empty fields for current user type
      if (isFromReview && !editingField) {
        return stepData.inputs?.filter((input) => {
          if (input.showIf && !input.showIf(currentUserType)) return false;
          const value = watch(input.name);
          return (
            !value ||
            value === "" ||
            (Array.isArray(value) && value.length === 0)
          );
        });
      }

      // When coming from edited user type - show only fields that apply to new user type AND are empty
      if (isFromEditedUserType) {
        return stepData.inputs?.filter((input) => {
          // Only show fields that have showIf AND it returns true for current userType
          return input.showIf && input.showIf(currentUserType);
        });
      }

      // Default case - show ALL applicable fields for current user type
      // BUT if we're in a navigation flow where we should only show required fields,
      // we need to check if this step has incomplete fields
      const hasIncompleteFields = stepData.inputs?.some((input) => {
        if (input.showIf && !input.showIf(currentUserType)) return false;
        const value = watch(input.name);
        return (
          !value || value === "" || (Array.isArray(value) && value.length === 0)
        );
      });

      // If coming from a navigation flow and there are incomplete fields, show only those
      if (hasIncompleteFields && (isFromReview || state?.fromNavigation)) {
        return stepData.inputs?.filter((input) => {
          if (input.showIf && !input.showIf(currentUserType)) return false;
          const value = watch(input.name);
          return (
            !value ||
            value === "" ||
            (Array.isArray(value) && value.length === 0)
          );
        });
      }

      if (isFromEditedUserType) {
        return stepData.inputs?.filter((input) => {
          // Only show fields that have showIf AND it returns true for current userType
          return input.showIf && input.showIf(currentUserType);
        });
      }

      // Final fallback - show all applicable fields for current user type
      return stepData.inputs?.filter((input) => {
        if (typeof input.showIf === "function") {
          return input.showIf(currentUserType);
        }
        return true;
      });
    };

    const handleFormSubmit = async (e) => {
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

      // FIX: Filter input names based on current user type
      const currentUserType = watch("userType");
      const inputNames = stepData.inputs
        .filter((input) => {
          if (input.showIf && typeof input.showIf === "function") {
            return input.showIf(currentUserType);
          }
          return true;
        })
        .map((i) => i.name);

      const dynamicSchema = createStepSchema(inputNames);
      const isValid = await validateStep(dynamicSchema);

      console.log("is valid:", isValid);

      if (!isValid) {
        console.log(`Continue (${stepData.elementName}) errors:`, stepErrors);
        return;
      }

      if (isEditingFromReview) {
        setEditingSection(null);
        setEditingField(null);
        navigate("/auth/signup/review");
      } else {
        const currentUserType = watch("userType");

        // If coming from edited user type, prioritize user-type-specific fields
        if (isFromEditedUserType) {
          const nextUserTypeStep = getNextUserTypeSpecificStep(
            route,
            currentUserType
          );


          if (nextUserTypeStep) {
            const requiredFieldNames = nextUserTypeStep.fields.map(
              (f) => f.field
            );
            navigate(`/auth/signup/${nextUserTypeStep.step}`, {
              state: {
                requiredFields: requiredFieldNames,
                isFromEditedUserType: true,
                fromNavigation: true,
                isLastRequiredStep: nextUserTypeStep.isLastStep,
              },
            });
            return;
          } else {
            // No more user-type-specific steps, check for any other missing fields
            const nextRequired = getNextRequiredStep(currentUserType);

            console.log("nextRequired", nextRequired);

            if (nextRequired) {
              const requiredFieldNames = nextRequired.fields.map(
                (f) => f.field
              );

              // Create a Joi schema for these fields
              const dynamicSchema = createStepSchema(requiredFieldNames);

              // Validate an empty object to get required fields
              const { error } = dynamicSchema.validate(
                {},
                { abortEarly: false, context: { userType: currentUserType } }
              );

              // Get only required fields from error details
              const actuallyRequiredFields = error
                ? error.details
                    .filter((detail) => detail.type === "any.required")
                    .map((detail) => detail.path[0])
                : [];

              console.log("actuallyRequiredFields", actuallyRequiredFields);

              if(actuallyRequiredFields.length === 0) {
                navigate("/auth/signup/review");
                return;
              }

              navigate(`/auth/signup/${nextRequired.currentStep}`, {
                state: {
                  requiredFields: actuallyRequiredFields,
                  isFromEditedUserType: true,
                  fromNavigation: true,
                  isLastRequiredStep: nextRequired.isLastStep,
                },
              });
              return;
            }
          }
        } else if (state?.fromNavigation) {
          // If coming from navigation flow, continue with required steps
          const nextRequired = getNextRequiredStep(currentUserType);

          if (nextRequired) {
            const requiredFieldNames = nextRequired.fields.map((f) => f.field);
            navigate(`/auth/signup/${nextRequired.currentStep}`, {
              state: {
                requiredFields: requiredFieldNames,
                isFromEditedUserType: isFromEditedUserType ? true : false,
                fromNavigation: true,
                isLastRequiredStep: nextRequired.isLastStep,
              },
            });
            return;
          }
        } else {
          // Normal sequential flow - go to next step in sequence
          const nextStep = getNextStepInSequence(route, currentUserType);

          if (nextStep) {
            navigate(`/auth/signup/${nextStep.step}`, {
              state: {
                fromNavigation: false,
                isSequentialFlow: true,
              },
            });
            return;
          }
        }

        // If no next step, go to review
        setIsFromEditedUserType(false);
        navigate("/auth/signup/review");
      }
    };

    // Update the getButtonText function to be more accurate
    const getButtonText = () => {
      if (isEditingFromReview) {
        return "Save & Return";
      }

      const currentUserType = watch("userType");

      // If coming from edited user type, check for next user-type-specific step first
      if (isFromEditedUserType) {
        const nextUserTypeStep = getNextUserTypeSpecificStep(
          route,
          currentUserType
        );
        if (nextUserTypeStep) {
          return "Continue";
        }

        // Then check for any other required steps
        const nextRequired = getNextRequiredStep(currentUserType);
        if (nextRequired) {
          return "Continue";
        }

        return "Go to Review";
      }

      // For navigation flow
      if (state?.fromNavigation) {
        if (isLastRequiredStep) return "Go to Review";
        return "Continue";
      }

      // For sequential flow, check if there's a next step
      if (!state?.fromNavigation && !isFromEditedUserType) {
        const nextStep = getNextStepInSequence(route, currentUserType);
        return nextStep ? "Continue" : "Go to Review";
      }

      return "Continue";
    };

    const getBackButtonText = () => {
      if (isEditingFromReview) return "Cancel";
      if (route === "basic-info" && requiredFieldsFromState.length > 0)
        return "Cancel";
      return "Back";
    };

    const fieldsToShow = getFieldsToShow();

    return (
      <>
        <ProgressBar currentStep={getCurrentStep()} />
        <form
          key={watch("userType")}
          onSubmit={handleFormSubmit}
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
              {fieldsToShow?.map((input) => (
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
                    setEditingSection(null);
                    setEditingField(null);
                    navigate("/auth/signup/review");
                  } else {
                    const currentUserType = watch("userType");

                    // UPDATED LOGIC: If coming from edited user type, find previous step with user-type-specific fields
                    if (isFromEditedUserType || state?.fromNavigation) {
                      const prevRequired = getPreviousRequiredStep(
                        route,
                        currentUserType
                      );

                      if (prevRequired) {
                        // Navigate to previous step with incomplete user-type-specific fields
                        const requiredFieldNames = prevRequired.fields.map(
                          (f) => f.field
                        );
                        navigate(`/auth/signup/${prevRequired.step}`, {
                          state: {
                            isFromEditedUserType: true,
                            fromNavigation: true,
                            requiredFields: requiredFieldNames,
                          },
                        });
                      } else {
                        // No previous step with incomplete fields, go back to user select
                        setEditingSection("account");
                        setEditingField("userType");
                        navigate("/auth/signup/userselect", {
                          state: {
                            editingSection: "account",
                            editingField: "userType",
                            fromReview: true,
                          },
                        });
                      }
                    } else {
                      // Normal sequential flow - go to previous step
                      if (prevStep) {
                        navigate(`/auth/signup/${prevStep.RoutePath}`);
                      } else {
                        navigate("/auth/signup/userselect");
                      }
                    }
                  }
                }}
              >
                <ArrowLeft className="w-5 h-5" />
                <span>{getBackButtonText()}</span>
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>{getButtonText()}</span>
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
                  editingSection === "account" && editingField
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
                            Looking For
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
                // Clean the form data to only include fields relevant to current user type
                const currentUserType = watch("userType");
                const cleanedFormData = cleanDataForUserType(
                  getValues(),
                  currentUserType
                );

                // Create a schema with only the fields that apply to current user type
                const relevantFields = getFieldsForUserType(currentUserType);
                const reviewSchema = createStepSchema(relevantFields);

                // Temporarily set the cleaned data for validation
                const originalData = getValues();
                Object.keys(cleanedFormData).forEach((key) => {
                  setValue(key, cleanedFormData[key]);
                });

                const isValid = await validateStep(reviewSchema);

                if (!isValid) {
                  console.log(
                    "Create Account (ReviewStep) errors:",
                    stepErrors
                  );
                  // Restore original data if validation fails
                  Object.keys(originalData).forEach((key) => {
                    setValue(key, originalData[key]);
                  });
                  return;
                }

                if (isValid) {
                  console.log("Form submitted:", cleanedFormData);
                  // Update the stored form data with cleaned version
                  setSignupFormData(cleanedFormData);
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
                !isStepCompleted(prevStep.RoutePath) ? (
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
          !isStepCompleted(data[data.length - 1].RoutePath) ? (
            <Navigate
              to={`/auth/signup/${data[data.length - 1].RoutePath}`}
              replace
            />
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
