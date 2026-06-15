import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { SunIcon } from "@/components/SunIcon";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — Elgris Solar" }] }),
  component: LoginPage,
});

function LoginPage() {
  const [show, setShow] = useState(false);
  const nav = useNavigate();

  return (
    <PhoneFrame>
      <div className="min-h-screen px-5 pt-6 pb-10 flex flex-col">
        <div className="flex items-center">
          <Link
            to="/"
            className="h-10 w-10 rounded-full grid place-items-center bg-surface border border-border-soft"
          >
            <ArrowLeft size={18} />
          </Link>
        </div>

        <div className="mt-6">
          <h1 className="text-[24px] font-bold">Welcome Back</h1>
          <p className="text-[14px] text-text-muted mt-1">Sign in to track your solar system</p>
        </div>

        <div className="flex justify-center my-8">
          <SunIcon size={84} />
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); nav({ to: "/home" }); }}
          className="bg-surface rounded-2xl p-6 border border-border-soft glow-card"
        >
          <label className="block text-[12px] font-medium text-text-muted mb-2">Email Address</label>
          <div className="relative mb-4">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="email"
              defaultValue="priya@hearwave.in"
              placeholder="you@email.com"
              className="w-full h-12 rounded-xl bg-background border border-border-soft pl-10 pr-3
                         text-[14px] outline-none focus:border-electric focus:ring-2 focus:ring-electric/30 transition"
            />
          </div>

          <label className="block text-[12px] font-medium text-text-muted mb-2">Password</label>
          <div className="relative mb-2">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type={show ? "text" : "password"}
              defaultValue="••••••••"
              className="w-full h-12 rounded-xl bg-background border border-border-soft pl-10 pr-10
                         text-[14px] outline-none focus:border-electric focus:ring-2 focus:ring-electric/30 transition"
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
              aria-label="Toggle password visibility"
            >
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <div className="flex justify-end mb-5">
            <button type="button" className="text-[12px] font-medium text-electric">
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="grad-primary w-full h-[52px] rounded-xl flex items-center justify-center gap-2
                       font-semibold text-[15px] active:scale-[0.98] transition
                       shadow-[0_10px_30px_-12px_rgba(27,79,216,0.7)]"
          >
            Sign In <ArrowRight size={18} />
          </button>
        </form>

        <p className="text-center text-[13px] text-text-muted mt-6">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-electric font-semibold">Sign Up</Link>
        </p>
      </div>
    </PhoneFrame>
  );
}
