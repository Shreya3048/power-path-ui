import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create account — Elgris Solar" }] }),
  component: SignupPage,
});

function Field({
  label, type = "text", placeholder, defaultValue,
}: { label: string; type?: string; placeholder?: string; defaultValue?: string }) {
  return (
    <div className="mb-4">
      <label className="block text-[12px] font-medium text-text-muted mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="w-full h-12 rounded-xl bg-background border border-border-soft px-3
                   text-[14px] outline-none focus:border-electric focus:ring-2 focus:ring-electric/30 transition"
      />
    </div>
  );
}

function SignupPage() {
  const nav = useNavigate();
  return (
    <PhoneFrame>
      <div className="min-h-screen px-5 pt-6 pb-10 flex flex-col">
        <div className="flex items-center justify-between">
          <Link to="/" className="h-10 w-10 rounded-full grid place-items-center bg-surface border border-border-soft">
            <ArrowLeft size={18} />
          </Link>
          <span className="text-[12px] text-text-muted">Step 1 of 3</span>
        </div>

        <h1 className="mt-5 text-[24px] font-bold">Create Account</h1>
        <p className="text-[14px] text-text-muted mt-1">Let&apos;s set up your solar dashboard</p>

        {/* Progress indicator */}
        <div className="flex items-center gap-2 mt-5">
          <span className="flex-1 h-1.5 rounded-full bg-amber-solar" />
          <span className="flex-1 h-1.5 rounded-full bg-border-soft" />
          <span className="flex-1 h-1.5 rounded-full bg-border-soft" />
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); nav({ to: "/home" }); }}
          className="mt-6 bg-surface rounded-2xl p-6 border border-border-soft glow-card"
        >
          <Field label="Full Name" placeholder="Priya Sharma" />
          <Field label="Email Address" type="email" placeholder="you@email.com" />

          <div className="mb-4">
            <label className="block text-[12px] font-medium text-text-muted mb-2">Phone Number</label>
            <div className="flex gap-2">
              <div className="h-12 px-3 rounded-xl bg-background border border-border-soft flex items-center gap-2 text-[14px]">
                <span aria-hidden>🇮🇳</span><span className="text-text-muted">+91</span>
              </div>
              <input
                type="tel"
                placeholder="98765 43210"
                className="flex-1 h-12 rounded-xl bg-background border border-border-soft px-3
                           text-[14px] outline-none focus:border-electric focus:ring-2 focus:ring-electric/30 transition"
              />
            </div>
          </div>

          <Field label="Password" type="password" placeholder="At least 8 characters" />
          <Field label="Confirm Password" type="password" placeholder="Re-enter password" />

          <button
            type="submit"
            className="mt-2 grad-primary w-full h-[52px] rounded-xl flex items-center justify-center gap-2
                       font-semibold text-[15px] shadow-[0_10px_30px_-12px_rgba(27,79,216,0.7)]"
          >
            Create Account <ArrowRight size={18} />
          </button>
        </form>

        <p className="text-center text-[12px] text-text-muted mt-5 px-6">
          By signing up you agree to our{" "}
          <span className="text-electric">Terms</span> &{" "}
          <span className="text-electric">Privacy Policy</span>
        </p>
      </div>
    </PhoneFrame>
  );
}
