import React, { useState, useEffect } from "react";
import { Building2, Users, ArrowLeft, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

const UserSelect = ({
  colors,
  userType,
  setUserType,
  setCurrentPage,
  getNextRequiredStep,
  getNextUserTypeSpecificStep,
}) => {
  const { handleSubmit } = useForm();
  const location = useLocation();
  const navigate = useNavigate();

  // Get state from location for edit context
  const { state } = location;
  const isFromReview = state?.fromReview;
  const editingSectionFromState = state?.editingSection;
  const editingFieldFromState = state?.editingField;

  // NEW: Get preserved navigation states
  const isFromEditedUserType = state?.isFromEditedUserType;
  const fromNavigation = state?.fromNavigation;
  const requiredFields = state?.requiredFields || [];
  const isLastRequiredStep = state?.isLastRequiredStep;

  const [tempUserType, setTempUserType] = useState(userType);

  const isEditingFromReview =
    isFromReview || editingSectionFromState || editingFieldFromState;

  // NEW: Effect to handle when coming back from steps with preserved states
  useEffect(() => {
    // If we're coming back from a step during edited user type flow,
    // we should maintain the current userType selection
    if (isFromEditedUserType && userType) {
      setTempUserType(userType);
    }
  }, [isFromEditedUserType, userType]);

  const onSubmit = () => {
    if (tempUserType) {
      // Set the actual userType only on submit
      setUserType(tempUserType);

      if (isEditingFromReview) {
        // Find the next incomplete step instead of going to review
        const userTypeSteps = getNextUserTypeSpecificStep(
          undefined,
          tempUserType
        );
        if (userTypeSteps && userTypeSteps.length > 0) {
          const firstStep = userTypeSteps[0];
          const requiredFieldNames = firstStep.fields.map((f) => f.field);
          navigate(`/auth/signup/${firstStep.step}`, {
            state: {
              clearEditingStates: true,
              isFromEditedUserType: true,
              fromNavigation: true,
              requiredFields: requiredFieldNames,
              isLastRequiredStep: firstStep.isLastStep,
            },
          });
        } else {
          // If no user type specific steps, go to review
          navigate("/auth/signup/review", {
            state: { clearEditingStates: true },
          });
        }
      } else {
        // Normal flow
        setCurrentPage("basic-info");
      }
    }
  };

  const handleCancel = () => {
    if (isEditingFromReview) {
      // Go back to review without saving changes and clear editing states
      navigate("/auth/signup/review", {
        state: {
          clearEditingStates: true,
        },
      });
    } else if (isFromEditedUserType || fromNavigation) {
      // NEW: If we came here during edited user type flow, go back to the previous step
      // with preserved states instead of going to login

      // Find which step we should return to
      const currentUserType = userType || tempUserType;
      const nextStep = getNextRequiredStep(currentUserType);

      if (nextStep) {
        // Go back to the step we came from, preserving the navigation context
        navigate(`/auth/signup/${nextStep.currentStep}`, {
          state: {
            isFromEditedUserType: true,
            fromNavigation: true,
            requiredFields: nextStep.fields.map((f) => f.field),
            isLastRequiredStep: nextStep.isLastStep,
          },
        });
      } else {
        // If no required steps, go to review
        navigate("/auth/signup/review");
      }
    } else {
      // Normal back navigation (go to login or previous page)
      navigate("/auth/login");
    }
  };

  // NEW: Get the appropriate button text based on context
  const getBackButtonText = () => {
    if (isEditingFromReview) return "Cancel";
    if (isFromEditedUserType || fromNavigation) return "Back";
    return "Back to Login";
  };

  const getContinueButtonText = () => {
    if (isEditingFromReview) return "Continue";
    if (isFromEditedUserType || fromNavigation) return "Continue";
    return `Continue as ${
      tempUserType
        ? tempUserType === "influencer"
          ? "Influencer"
          : "Company"
        : "User"
    }`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-2xl">
        {/* Header with edit indication */}
        {isEditingFromReview && (
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Edit Account Type
            </h2>
            <p className="text-gray-600">
              Update your account type and return to review
            </p>
          </div>
        )}

        {/* NEW: Show context indicator for edited user type flow */}
        {(isFromEditedUserType || fromNavigation) && !isEditingFromReview && (
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Confirm Account Type
            </h2>
            <p className="text-gray-600">
              Continue filling required fields for your account type
            </p>
          </div>
        )}

        {/* User Type Cards */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Influencer Card */}
            <div
              onClick={() => setTempUserType("influencer")}
              className={`${
                colors.card
              } rounded-2xl p-8 cursor-pointer transition-all duration-300 border-2 ${
                tempUserType === "influencer"
                  ? `${colors.primaryBorder} shadow-xl ${
                      isEditingFromReview || isFromEditedUserType
                        ? "ring-2 ring-purple-100"
                        : ""
                    }`
                  : `${colors.border} hover:shadow-lg hover:${colors.accent}`
              }`}
            >
              <div className="text-center">
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${colors.primary} flex items-center justify-center`}
                >
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-2xl font-bold ${colors.text} mb-3`}>
                  Influencer
                  {/* Show indicator if this is the field being edited or selected */}
                  {(editingFieldFromState === "userType" ||
                    isFromEditedUserType) &&
                    tempUserType === "influencer" && (
                      <span className="ml-2 text-xs text-purple-600 font-medium">
                        (Selected)
                      </span>
                    )}
                </h3>
                <p className={`${colors.textSecondary} mb-6`}>
                  Connect with brands, showcase your content, and monetize your
                  influence
                </p>

                <div className="space-y-3 text-left">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full ${colors.primarySolid}`}
                    />
                    <span className={`text-sm ${colors.textSecondary}`}>
                      Set your rates and availability
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full ${colors.primarySolid}`}
                    />
                    <span className={`text-sm ${colors.textSecondary}`}>
                      Browse brand partnerships
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full ${colors.primarySolid}`}
                    />
                    <span className={`text-sm ${colors.textSecondary}`}>
                      Showcase your portfolio
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Card */}
            <div
              onClick={() => setTempUserType("company")}
              className={`${
                colors.card
              } rounded-2xl p-8 cursor-pointer transition-all duration-300 border-2 ${
                tempUserType === "company"
                  ? `${colors.primary
                      .replace("from-", "border-")
                      .replace(" to-blue-600", "")
                      .replace(" to-blue-500", "")} shadow-xl ${
                      isEditingFromReview || isFromEditedUserType
                        ? "ring-2 ring-purple-100"
                        : ""
                    }`
                  : `${colors.border} hover:shadow-lg hover:${colors.accent}`
              }`}
            >
              <div className="text-center">
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${colors.primary} flex items-center justify-center`}
                >
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-2xl font-bold ${colors.text} mb-3`}>
                  Company
                  {/* Show indicator if this is the field being edited or selected */}
                  {(editingFieldFromState === "userType" ||
                    isFromEditedUserType) &&
                    tempUserType === "company" && (
                      <span className="ml-2 text-xs text-purple-600 font-medium">
                        (Selected)
                      </span>
                    )}
                </h3>
                <p className={`${colors.textSecondary} mb-6`}>
                  Find the perfect influencers to promote your brand and reach
                  new audiences
                </p>

                <div className="space-y-3 text-left">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full ${colors.primarySolid}`}
                    />
                    <span className={`text-sm ${colors.textSecondary}`}>
                      Browse verified influencers
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full ${colors.primarySolid}`}
                    />
                    <span className={`text-sm ${colors.textSecondary}`}>
                      Set campaign requirements
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full ${colors.primarySolid}`}
                    />
                    <span className={`text-sm ${colors.textSecondary}`}>
                      Track campaign performance
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {isEditingFromReview || isFromEditedUserType || fromNavigation ? (
            // UPDATED: Enhanced buttons for all editing/navigation contexts
            <div className="flex space-x-4">
              <button
                type="button"
                className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors flex items-center justify-center space-x-2"
                onClick={handleCancel}
              >
                <ArrowLeft className="w-5 h-5" />
                <span>{getBackButtonText()}</span>
              </button>
              <button
                type="submit"
                disabled={!tempUserType}
                className={`flex-1 px-6 py-3 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 ${
                  tempUserType
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <span>{getContinueButtonText()}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          ) : (
            // Normal mode button
            <div className="text-center">
              <button
                type="submit"
                disabled={!tempUserType}
                className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 ${
                  tempUserType
                    ? `bg-gradient-to-r ${colors.primary} ${colors.primaryHover} text-white hover:shadow-lg`
                    : `${colors.accent} ${colors.textSecondary} cursor-not-allowed`
                }`}
              >
                Continue as{" "}
                {tempUserType
                  ? tempUserType === "influencer"
                    ? "Influencer"
                    : "Company"
                  : "User"}
              </button>
            </div>
          )}
        </form>

        {/* Show editing indicator at the bottom */}
        {(isEditingFromReview || isFromEditedUserType || fromNavigation) && (
          <div className="mt-6 p-3 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-purple-700 font-medium">
                {isEditingFromReview
                  ? "Editing from review"
                  : "Updating account type"}
              </span>
            </div>
            <p className="text-xs text-purple-600 mt-1">
              {isEditingFromReview
                ? 'Your changes will be saved when you click "Save & Return"'
                : "Complete the required fields for your selected account type"}
            </p>
          </div>
        )}

        {/* Back to Login - only show in normal mode */}
        {!isEditingFromReview && !isFromEditedUserType && !fromNavigation && (
          <div className="mt-6 text-center">
            <p className={`${colors.textSecondary}`}>
              Already have an account?{" "}
              <button
                onClick={() => setCurrentPage("../../auth/login")}
                className={`bg-gradient-to-r ${colors.primary} bg-clip-text text-transparent hover:underline font-medium`}
              >
                Log In
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSelect;
