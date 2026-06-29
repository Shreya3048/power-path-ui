import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import { useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { SunIcon } from "@/components/SunIcon";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — Elgris Solar" }] }),
  component: LoginPage,
});

export function LoginPage() {
  const [tab, setTab] = useState<"phone" | "email">("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (tab === "phone") {
      const cleanPhone = phone.replace(/\s+/g, "");
      if (!/^\d{10}$/.test(cleanPhone)) {
        setError("Please enter a valid 10-digit phone number.");
        return;
      }
      nav({
        to: "/verify-otp",
        search: {
          method: "phone",
          value: cleanPhone,
        },
      });
    } else {
      const cleanEmail = email.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
        setError("Please enter a valid email address.");
        return;
      }
      nav({
        to: "/verify-otp",
        search: {
          method: "email",
          value: cleanEmail,
        },
      });
    }
  };

  return (
    <PhoneFrame>
      <div className="min-h-screen px-5 pt-6 pb-10 flex flex-col justify-between">
        <div>
          {/* Header & Back arrow */}
          <div className="flex items-center">
            <Link
              to="/"
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
          <div className="text-center mb-6">
            <h1 className="text-[24px] font-bold text-white">Welcome to Elgris Solar</h1>
            <p className="text-[14px] text-text-muted mt-1">Sign in or create your account instantly</p>
          </div>

          {/* Tab Selector */}
          <div className="flex bg-secondary rounded-full p-1 mb-6 border border-border-soft">
            <button
              type="button"
              onClick={() => {
                setTab("phone");
                setError("");
              }}
              className={`flex-1 py-2.5 rounded-full text-[13px] font-semibold transition flex items-center justify-center gap-1.5 ${
                tab === "phone" ? "grad-primary text-white" : "bg-transparent text-text-muted hover:text-white"
              }`}
            >
              <span className="text-[14px]">📱</span> Phone Number
            </button>
            <button
              type="button"
              onClick={() => {
                setTab("email");
                setError("");
              }}
              className={`flex-1 py-2.5 rounded-full text-[13px] font-semibold transition flex items-center justify-center gap-1.5 ${
                tab === "email" ? "grad-primary text-white" : "bg-transparent text-text-muted hover:text-white"
              }`}
            >
              <span className="text-[14px]">✉️</span> Email
            </button>
          </div>

          {/* Input Form */}
          <form onSubmit={handleContinue} className="bg-surface rounded-2xl p-6 border border-border-soft glow-card">
            {tab === "phone" ? (
              <div className="mb-4">
                <label className="block text-[12px] font-medium text-text-muted mb-2">Phone Number</label>
                <div className="flex gap-2">
                  <div className="h-12 px-3 rounded-xl bg-background border border-border-soft flex items-center gap-2 text-[14px] select-none">
                    <span aria-hidden>🇮🇳</span>
                    <span className="text-text-muted font-medium">+91</span>
                  </div>
                  <input
                    type="tel"
                    placeholder="98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 h-12 rounded-xl bg-background border border-border-soft px-3
                               text-[14px] outline-none focus:border-electric focus:ring-2 focus:ring-electric/30 transition text-white"
                  />
                </div>
              </div>
            ) : (
              <div className="mb-4">
                <label className="block text-[12px] font-medium text-text-muted mb-2">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 rounded-xl bg-background border border-border-soft pl-10 pr-3
                               text-[14px] outline-none focus:border-electric focus:ring-2 focus:ring-electric/30 transition text-white"
                  />
                </div>
              </div>
            )}

            {error && (
              <p className="text-destructive text-[12px] mb-4 font-medium animate-fade-up">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="grad-primary w-full h-[52px] rounded-xl flex items-center justify-center gap-2
                         font-semibold text-[15px] active:scale-[0.98] transition
                         shadow-[0_10px_30px_-12px_rgba(27,79,216,0.7)] text-white cursor-pointer"
            >
              Send OTP <ArrowRight size={18} />
            </button>
          </form>
        </div>

        {/* Footer info */}
        <p className="text-center text-[12px] text-text-muted mt-5 px-6">
          By continuing you agree to our{" "}
          <span className="text-electric cursor-pointer hover:underline">Terms</span> &{" "}
          <span className="text-electric cursor-pointer hover:underline">Privacy Policy</span>
        </p>
      </div>
    </PhoneFrame>
  );
}
