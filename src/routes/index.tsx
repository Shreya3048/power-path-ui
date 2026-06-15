import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { SunIcon } from "@/components/SunIcon";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SolarTrack — Your solar journey" },
      { name: "description", content: "Track your solar journey, one step at a time with HearWave Solar." },
    ],
  }),
  component: Splash,
});

function Splash() {
  return (
    <PhoneFrame>
      <div className="relative flex flex-col items-center min-h-screen px-6 pt-20 pb-10">
        {/* Ambient background glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full
                        bg-[radial-gradient(circle,rgba(245,158,11,0.18),transparent_60%)] pointer-events-none" />
        <div className="absolute top-1/3 -right-20 w-[260px] h-[260px] rounded-full
                        bg-[radial-gradient(circle,rgba(56,189,248,0.18),transparent_60%)] pointer-events-none" />

        <div className="flex flex-col items-center text-center mt-6 animate-fade-up">
          {/* Animated sun: glowing ring + slow-spinning rays */}
          <SunIcon size={140} />

          <h1 className="mt-10 text-[34px] leading-none font-extrabold tracking-tight">
            Solar<span className="text-amber-solar">Track</span>
          </h1>
          <p className="mt-3 text-[14px] text-text-muted max-w-[260px]">
            Your solar journey, one step at a time.
          </p>

          <p className="mt-6 text-[11px] uppercase tracking-[0.2em] text-text-muted/80">
            by HearWave Solar
          </p>
        </div>

        <div className="mt-auto w-full flex flex-col gap-3 animate-fade-up">
          <Link
            to="/signup"
            className="grad-primary h-[52px] rounded-xl flex items-center justify-center gap-2
                       font-semibold text-foreground text-[15px] shadow-[0_10px_30px_-12px_rgba(27,79,216,0.7)]
                       active:scale-[0.98] transition"
          >
            Get Started <ArrowRight size={18} />
          </Link>
          <Link
            to="/login"
            className="h-[52px] rounded-xl flex items-center justify-center font-semibold text-[15px]
                       border border-border-soft text-foreground/90 hover:border-electric transition"
          >
            I already have an account
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
