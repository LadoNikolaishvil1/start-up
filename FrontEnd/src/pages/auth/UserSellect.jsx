import React from "react";
import { Building2, Users } from "lucide-react";
import { useForm } from "react-hook-form";

const UserSelect = ({ colors, userType, setUserType, setCurrentPage }) => {
  const { handleSubmit } = useForm();

  const onSubmit = () => {
    if (userType) setCurrentPage("basic-info");
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-2xl">
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
                  ? `${colors.primaryBorder} shadow-xl`
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
                      .replace(" to-blue-500", "")} shadow-xl`
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
          {/* Continue Button */}
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
        </form>
        {/* Back to Login */}
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
      </div>
    </div>
  );
};

export default UserSelect;
