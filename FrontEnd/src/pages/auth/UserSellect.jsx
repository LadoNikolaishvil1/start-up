import React from "react";
import { Building2, Users, ArrowLeft, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

const UserSelect = ({ colors, userType, setUserType, setCurrentPage }) => {
  const { handleSubmit } = useForm();
  const location = useLocation();
  const navigate = useNavigate();

  // Get state from location for edit context
  const { state } = location;
  const isFromReview = state?.fromReview;
  const editingSectionFromState = state?.editingSection;
  const editingFieldFromState = state?.editingField;

  const isEditingFromReview =
    isFromReview || editingSectionFromState || editingFieldFromState;

  const onSubmit = () => {
    if (userType) {
      if (isEditingFromReview) {
        // If editing from review, go back to review and clear editing states
        navigate("/auth/signup/review", {
          state: {
            clearEditingStates: true, // Add this flag to indicate we should clear editing states
          },
        });
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
          clearEditingStates: true, // Add this flag to indicate we should clear editing states
        },
      });
    } else {
      // Normal back navigation (you might want to navigate to login or previous page)
      navigate("/auth/login");
    }
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

        {/* User Type Cards */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Influencer Card */}
            <div
              onClick={() => setUserType("influencer")}
              className={`${
                colors.card
              } rounded-2xl p-8 cursor-pointer transition-all duration-300 border-2 ${
                userType === "influencer"
                  ? `${colors.primaryBorder} shadow-xl ${
                      isEditingFromReview ? "ring-2 ring-purple-100" : ""
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
                  {/* Show indicator if this is the field being edited */}
                  {editingFieldFromState === "userType" &&
                    userType === "influencer" && (
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
              onClick={() => setUserType("company")}
              className={`${
                colors.card
              } rounded-2xl p-8 cursor-pointer transition-all duration-300 border-2 ${
                userType === "company"
                  ? `${colors.primary
                      .replace("from-", "border-")
                      .replace(" to-blue-600", "")
                      .replace(" to-blue-500", "")} shadow-xl ${
                      isEditingFromReview ? "ring-2 ring-purple-100" : ""
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
                  {/* Show indicator if this is the field being edited */}
                  {editingFieldFromState === "userType" &&
                    userType === "company" && (
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
          {isEditingFromReview ? (
            // Edit mode buttons (similar to step function)
            <div className="flex space-x-4">
              <button
                type="button"
                className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors flex items-center justify-center space-x-2"
                onClick={handleCancel}
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Cancel</span>
              </button>
              <button
                type="submit"
                disabled={!userType}
                className={`flex-1 px-6 py-3 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 ${
                  userType
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <span>Save & Return</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          ) : (
            // Normal mode button
            <div className="text-center">
              <button
                type="submit"
                disabled={!userType}
                className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 ${
                  userType
                    ? `bg-gradient-to-r ${colors.primary} ${colors.primaryHover} text-white hover:shadow-lg`
                    : `${colors.accent} ${colors.textSecondary} cursor-not-allowed`
                }`}
              >
                Continue as{" "}
                {userType
                  ? userType === "influencer"
                    ? "Influencer"
                    : "Company"
                  : "User"}
              </button>
            </div>
          )}
        </form>

        {/* Show editing indicator at the bottom (similar to step function) */}
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

        {/* Back to Login - only show in normal mode */}
        {!isEditingFromReview && (
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
