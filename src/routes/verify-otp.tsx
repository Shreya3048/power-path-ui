import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { SunIcon } from "@/components/SunIcon";
import { OtpInput } from "@/components/OtpInput";
import { z } from "zod";

const searchSchema = z.object({
  method: z.enum(["phone", "email"]).catch("phone"),
  value: z.string().catch(""),
});

export const Route = createFileRoute("/verify-otp")({
  validateSearch: (search) => searchSchema.parse(search),
  component: VerifyOtpPage,
});

function VerifyOtpPage() {
  const { method, value } = Route.useSearch();
  const nav = useNavigate();

  // Screen State: 'otp' | 'details'
  const [screen, setScreen] = useState<"otp" | "details">("otp");
  
  // OTP input state
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [isVerifying, setIsVerifying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorText, setErrorText] = useState("");

  // Details screen state
  const [fullName, setFullName] = useState("");
  const [detailsError, setDetailsError] = useState("");

  // Resend timer state
  const [timeLeft, setTimeLeft] = useState(45);

  useEffect(() => {
    if (timeLeft <= 0 || screen !== "otp") return;
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, screen]);

  // Auto-submit OTP when 6th digit is entered
  const otpString = otp.join("");
  const isOtpComplete = otpString.length === 6;

  useEffect(() => {
    if (isOtpComplete && screen === "otp") {
      handleVerify(otpString);
    }
  }, [isOtpComplete, otpString, screen]);

  const handleVerify = async (code: string) => {
    if (isVerifying) return;
    setIsVerifying(true);
    setHasError(false);
    setErrorText("");

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // MOCK OTP VERIFICATION
    // TODO: integrate with Zoho OTP API / SMS gateway when backend is ready
    if (code === "123456") {
      setIsVerifying(false);

      // TEMPORARY: Using localStorage to mock new-vs-existing user check.
      // Replace with real Zoho CRM contact lookup when backend API integration is ready —
      // check if a Contact record exists for this phone/email before deciding whether to show the name collection screen.
      const lowercaseVal = value.trim().toLowerCase();
      const storageKey = `elgris_user_registered_${lowercaseVal}`;
      const isAlreadyRegistered = localStorage.getItem(storageKey) === "true";

      // Keep default placeholders as existing users for easy developer testing
      const isDefaultMockUser =
        lowercaseVal === "priya@example.com" ||
        lowercaseVal === "priya@hearwave.in" ||
        lowercaseVal === "9876543210" ||
        lowercaseVal === "";

      if (isAlreadyRegistered || isDefaultMockUser) {
        nav({ to: "/home" });
      } else {
        setScreen("details");
      }
    } else {
      setIsVerifying(false);
      setHasError(true);
      setErrorText("Invalid code. Please try again.");
      // Reset OTP values on error so user can re-try
      setOtp(Array(6).fill(""));
    }
  };

  const handleResend = () => {
    if (timeLeft > 0) return;
    setTimeLeft(45);
    setOtp(Array(6).fill(""));
    setHasError(false);
    setErrorText("");
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setDetailsError("Full name is required.");
      return;
    }
    
    // Save registration status to localStorage
    const lowercaseVal = value.trim().toLowerCase();
    localStorage.setItem(`elgris_user_registered_${lowercaseVal}`, "true");
    localStorage.setItem("elgris_user_name", fullName.trim());

    // Proceed to dashboard /home
    nav({ to: "/home" });
  };

  const formatPhoneNumber = (num: string) => {
    if (num.length === 10) {
      return `+91 ${num.slice(0, 5)} ${num.slice(5)}`;
    }
    return `+91 ${num}`;
  };

  if (screen === "details") {
    // SCREEN 3: NEW USER DETAILS
    return (
      <PhoneFrame>
        <div className="min-h-screen px-5 pt-6 pb-10 flex flex-col justify-between">
          <div>
            <h1 className="mt-8 text-[28px] font-bold text-white leading-tight">Just one more step</h1>
            <p className="text-[14px] text-text-muted mt-2">Tell us your name to personalize your dashboard</p>

            <form onSubmit={handleDetailsSubmit} className="mt-8 bg-surface rounded-2xl p-6 border border-border-soft glow-card">
              <div className="mb-4">
                <label className="block text-[12px] font-medium text-text-muted mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Priya Sharma"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    setDetailsError("");
                  }}
                  className="w-full h-12 rounded-xl bg-background border border-border-soft px-3
                             text-[14px] outline-none focus:border-electric focus:ring-2 focus:ring-electric/30 transition text-white"
                  autoFocus
                />
              </div>

              {detailsError && (
                <p className="text-destructive text-[12px] mb-4 font-medium animate-fade-up">
                  {detailsError}
                </p>
              )}

              <button
                type="submit"
                className="grad-primary w-full h-[52px] rounded-xl flex items-center justify-center gap-2
                           font-semibold text-[15px] active:scale-[0.98] transition
                           shadow-[0_10px_30px_-12px_rgba(27,79,216,0.7)] text-white cursor-pointer"
              >
                Get Started <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  // SCREEN 2: OTP VERIFICATION
  return (
    <PhoneFrame>
      <div className="min-h-screen px-5 pt-6 pb-10 flex flex-col justify-between">
        <div>
          {/* Back Arrow */}
          <div className="flex items-center">
            <Link
              to="/login"
              className="h-10 w-10 rounded-full grid place-items-center bg-surface border border-border-soft hover:border-electric transition"
            >
              <ArrowLeft size={18} />
            </Link>
          </div>

          {/* Logo */}
          <div className="flex justify-center mt-6 mb-8">
            <SunIcon size={110} />
          </div>

          {/* Title & Subtitle */}
          <div className="text-center mb-8">
            <h1 className="text-[24px] font-bold text-white">Enter Verification Code</h1>
            <p className="text-[14px] text-text-muted mt-2 px-2">
              {method === "phone" ? (
                <>
                  We sent a 6-digit code to{" "}
                  <span className="text-white font-medium">
                    {formatPhoneNumber(value)}
                  </span>
                </>
              ) : (
                <>
                  We sent a 6-digit code to{" "}
                  <span className="text-white font-medium">{value}</span>
                </>
              )}
            </p>
          </div>

          {/* OTP Input Boxes */}
          <div className="mb-6">
            <OtpInput
              value={otp}
              onChange={(newOtp) => {
                setOtp(newOtp);
                if (hasError) {
                  setHasError(false);
                  setErrorText("");
                }
              }}
              hasError={hasError}
              disabled={isVerifying}
            />
            {errorText && (
              <p className="text-destructive text-[13px] text-center mt-4 font-medium animate-fade-up">
                {errorText}
              </p>
            )}
          </div>

          {/* Resend Timer */}
          <div className="text-center mb-8">
            {timeLeft > 0 ? (
              <span className="text-[14px] text-text-muted">
                Resend code in 0:{timeLeft.toString().padStart(2, "0")}
              </span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="text-[14px] text-electric font-semibold hover:underline cursor-pointer"
              >
                Resend OTP
              </button>
            )}
          </div>

          {/* Verify Button */}
          <button
            type="button"
            disabled={!isOtpComplete || isVerifying}
            onClick={() => handleVerify(otpString)}
            className={`w-full h-[52px] rounded-xl flex items-center justify-center gap-2 font-semibold text-[15px] transition
              ${
                !isOtpComplete || isVerifying
                  ? "bg-secondary text-text-muted cursor-not-allowed opacity-60"
                  : "grad-primary text-white cursor-pointer active:scale-[0.98] shadow-[0_10px_30px_-12px_rgba(27,79,216,0.7)]"
              }`}
          >
            {isVerifying ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Verifying...
              </>
            ) : (
              <>
                Verify & Continue <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}
