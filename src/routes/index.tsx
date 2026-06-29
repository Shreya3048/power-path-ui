import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { SunIcon } from "@/components/SunIcon";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Elgris Solar — Your solar journey" },
      { name: "description", content: "Track your solar journey, one step at a time with Elgris Solar." },
    ],
  }),
  component: Splash,
});

function Splash() {
  return (
    <PhoneFrame>
      <div className="relative flex flex-col items-center min-h-screen px-6 pt-20 pb-10">
        {/* Ambient background glow - keep background glow behind everything */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full
                        bg-[radial-gradient(circle,rgba(245,158,11,0.18),transparent_60%)] pointer-events-none z-0" />
        <div className="absolute top-1/3 -right-20 w-[260px] h-[260px] rounded-full
                        bg-[radial-gradient(circle,rgba(56,189,248,0.18),transparent_60%)] pointer-events-none z-0" />

        {/* 1. Standalone Logo Container - containing ONLY the logo card with glow effect */}
        <div className="relative z-10 flex justify-center mt-6 animate-fade-up">
          <SunIcon size={140} />
        </div>

        {/* 2. Content Info Area (Normal Flow, separated from logo container by 36px) */}
        <div className="relative z-10 flex flex-col items-center text-center mt-10 animate-fade-up">
          <h1 className="text-[34px] leading-none font-extrabold tracking-tight">
            Elgris<span className="text-amber-solar"> Solar</span>
          </h1>
        </div>

        {/* 3. Action Button & Pagination */}
        <div className="relative z-10 mt-auto w-full flex flex-col gap-3 animate-fade-up">
          <Link
            to="/login"
            className="grad-primary h-[52px] rounded-xl flex items-center justify-center gap-2
                       font-semibold text-foreground text-[15px] shadow-[0_10px_30px_-12px_rgba(27,79,216,0.7)]
                       active:scale-[0.98] transition cursor-pointer"
          >
            Get Started <ArrowRight size={18} />
          </Link>

          {/* Pagination dots */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <span className="h-1.5 w-6 rounded-full bg-amber-solar" />
            <span className="h-1.5 w-1.5 rounded-full bg-border-soft" />
            <span className="h-1.5 w-1.5 rounded-full bg-border-soft" />
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
