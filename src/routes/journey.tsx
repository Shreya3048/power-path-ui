import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/PhoneFrame";
import { BottomNav } from "@/components/BottomNav";
import { Check, Sun, Clock } from "lucide-react";

export const Route = createFileRoute("/journey")({
  head: () => ({ meta: [{ title: "My Journey — Elgris Solar" }] }),
  component: JourneyPage,
});

const STAGES = [
  { label: "Site Survey", status: "done", date: "20 May 2026", desc: "Site assessed for sunlight, shading and roof structure." },
  { label: "Design & Approval", status: "done", date: "27 May 2026", desc: "Custom 5 kWp layout designed and approved by you." },
  { label: "Material Procurement", status: "done", date: "03 June 2026", desc: "Panels, inverter and BoS components dispatched." },
  { label: "Installation", status: "active", date: "Started 10 June 2026", desc: "Panels mounted, inverter wired and AC/DC connections in progress." },
  { label: "Inspection & Testing", status: "upcoming", date: "Est. 22 June 2026", desc: "Safety, grounding and performance tests." },
  { label: "Net Metering", status: "upcoming", date: "Est. 28 June 2026", desc: "Bidirectional meter installed by DISCOM." },
  { label: "Live & Active", status: "upcoming", date: "Est. 03 July 2026", desc: "System goes live and starts saving you money." },
] as const;

function JourneyPage() {
  return (
    <PhoneFrame>
      <div className="px-5 pt-6">
        <h1 className="text-[22px] font-bold">My Journey</h1>
        <p className="text-[13px] text-text-muted">From survey to switched-on</p>

        <ol className="relative mt-6 pl-6">
          <span className="absolute left-[11px] top-2 bottom-2 w-px bg-border-soft" />
          {STAGES.map((s) => {
            const Icon =
              s.status === "done" ? Check : s.status === "active" ? Sun : Clock;
            const ring =
              s.status === "done" ? "bg-electric text-background" :
              s.status === "active" ? "grad-amber text-background animate-pulse-amber" :
              "bg-surface border border-border-soft text-text-muted";
            return (
              <li key={s.label} className="relative mb-5 last:mb-0">
                <span className={`absolute -left-6 top-1 h-6 w-6 rounded-full grid place-items-center ${ring}`}>
                  <Icon size={12} strokeWidth={3} />
                </span>
                <div className={`rounded-2xl border p-4 ${
                  s.status === "active"
                    ? "bg-surface border-amber-solar/40 shadow-[0_0_40px_-20px_rgba(245,158,11,0.6)]"
                    : "bg-surface border-border-soft"
                }`}>
                  <div className="flex items-center justify-between">
                    <h3 className={`text-[14px] font-semibold ${s.status === "active" ? "text-amber-solar" : "text-foreground"}`}>
                      {s.label}
                    </h3>
                    <span className="text-[11px] text-text-muted">{s.date}</span>
                  </div>
                  <p className="mt-1 text-[12px] text-text-muted leading-relaxed">{s.desc}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}
