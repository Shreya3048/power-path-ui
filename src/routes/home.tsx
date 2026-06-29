import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bell, Check, Lock, ArrowRight, Sun, Leaf, FileText, CheckCircle2, Wrench,
} from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/home")({
  head: () => ({ meta: [{ title: "Dashboard — Elgris Solar" }] }),
  component: HomePage,
});

type Stage = { label: string; status: "done" | "active" | "upcoming"; desc?: string; started?: string };

const STAGES: Stage[] = [
  { label: "Advance Received", status: "done" },
  { label: "Documents Required", status: "done" },
  { label: "Sales Order Draft", status: "done" },
  { label: "Customer Approval", status: "done" },
  { label: "Sales Order Confirmed", status: "done" },
  { label: "Agreement Signed", status: "done" },
  { label: "Loan Sanctioned", status: "done" },
  { label: "Loan Disbursed", status: "done" },
  {
    label: "Material Dispatched", status: "active",
    desc: "Panels, inverter, structure dispatched to your site.",
    started: "29 June 2026",
  },
  { label: "Installation Completed", status: "upcoming" },
  { label: "Documents Uploaded", status: "upcoming" },
  { label: "Inspection & Release Order", status: "upcoming" },
  { label: "Net Metering", status: "upcoming" },
  { label: "Subsidy Request", status: "upcoming" },
  { label: "Subsidy Received", status: "upcoming" },
  { label: "After-Sales Support", status: "upcoming" },
];

function StageNode({ stage }: { stage: Stage }) {
  if (stage.status === "done") {
    return (
      <div className="flex flex-col items-center w-full z-10">
        <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-electric grid place-items-center text-background shrink-0 mx-auto">
          <Check size={14} strokeWidth={3} />
        </div>
      </div>
    );
  }
  if (stage.status === "active") {
    return (
      <div className="flex flex-col items-center w-full z-10">
        <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full grad-amber animate-pulse-amber grid place-items-center text-background font-bold shrink-0 -mt-[4px] sm:-mt-[2px]">
          <Sun size={18} />
        </div>
        <span className="mt-1 text-[8px] sm:text-[9px] font-bold text-amber-solar text-center leading-[1.1] px-0.5">{stage.label}</span>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center w-full z-10">
      <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full border-2 border-dashed border-border-soft bg-surface shrink-0 mx-auto" />
    </div>
  );
}

function Connector({ solid, direction }: { solid: boolean; direction: "left" | "right" }) {
  if (direction === "right") {
    return (
      <div className="absolute top-[11px] sm:top-[15px] left-[calc(50%+12px)] sm:left-[calc(50%+16px)] right-[calc(-50%+12px)] sm:right-[calc(-50%+16px)] h-[2px] z-0 flex items-center justify-end"
           style={solid ? undefined : { backgroundImage: "repeating-linear-gradient(90deg, #1E3A5F 0 4px, transparent 4px 8px)" }}>
        <div className={`w-full h-full ${solid ? "bg-electric" : ""}`} />
        <div className={`absolute -right-2 ${solid ? "text-electric" : "text-border-soft"}`}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </div>
      </div>
    );
  }
  
  return (
    <div className="absolute top-[11px] sm:top-[15px] right-[calc(50%+12px)] sm:right-[calc(50%+16px)] left-[calc(-50%+12px)] sm:left-[calc(-50%+16px)] h-[2px] z-0 flex items-center justify-start"
         style={solid ? undefined : { backgroundImage: "repeating-linear-gradient(270deg, #1E3A5F 0 4px, transparent 4px 8px)" }}>
      <div className={`w-full h-full ${solid ? "bg-electric" : ""}`} />
      <div className={`absolute -left-2 ${solid ? "text-electric" : "text-border-soft"}`}>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      </div>
    </div>
  );
}

function StageTracker() {
  const active = STAGES.find((s) => s.status === "active")!;
  const activeIndex = STAGES.indexOf(active);

  return (
    <div className="mt-4 rounded-2xl bg-surface border border-border-soft p-4 sm:p-5
                    shadow-[0_0_0_1px_rgba(245,158,11,0.08),0_20px_60px_-30px_rgba(245,158,11,0.35)]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[16px] font-semibold">Project Progress</h2>
        <span className="text-[11px] text-text-muted">{activeIndex + 1} of 16</span>
      </div>

      <div className="grid grid-cols-8 gap-y-6 gap-x-0 relative w-full pt-1">
        {STAGES.map((s, logicalIndex) => {
          const row = Math.floor(logicalIndex / 8);
          const colInRow = logicalIndex % 8;
          const isRowRightToLeft = row % 2 !== 0;
          const visualCol = isRowRightToLeft ? 7 - colInRow : colInRow;
          
          const hasConnectorToNextLogical = colInRow < 7 && logicalIndex < STAGES.length - 1;
          const solid = s.status === "done" && (STAGES[logicalIndex + 1]?.status === "done" || STAGES[logicalIndex + 1]?.status === "active");
          
          return (
            <div 
              key={s.label} 
              className="relative flex flex-col items-center justify-start h-full"
              style={{ gridColumn: visualCol + 1, gridRow: row + 1 }}
            >
              <StageNode stage={s} />
              
              {hasConnectorToNextLogical && (
                <Connector solid={solid} direction={isRowRightToLeft ? "left" : "right"} />
              )}
            </div>
          );
        })}

        {/* Vertical Row Connector from Row 1 to Row 2 */}
        <div className="absolute right-[6.25%] top-[24px] sm:top-[32px] h-[20px] w-[2px] z-0 flex flex-col items-center justify-end">
            <div className="w-full h-full bg-electric opacity-50" />
            <div className="absolute -bottom-2 text-electric opacity-70">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
        </div>
      </div>

      {/* Active stage detail card */}
      <div className="mt-6 rounded-xl bg-background/60 border border-border-soft p-4">
        <div className="flex items-center gap-2">
          <span className="text-[11px] uppercase tracking-wider font-bold text-amber-solar">Current Stage</span>
          <span className="h-1 w-1 rounded-full bg-text-muted" />
          <span className="text-[11px] text-text-muted">Step {activeIndex + 1} of 16</span>
        </div>
        <h3 className="mt-1 text-[16px] font-bold">{active.label}</h3>
        <p className="mt-1 text-[13px] text-text-muted leading-relaxed">{active.desc}</p>
        <p className="mt-2 text-[12px] text-text-muted">Started: {active.started}</p>

        <Link to="/journey" className="mt-4 flex items-center justify-center gap-1 text-[13px] font-medium text-electric hover:text-white transition-colors py-2">
          View Full Journey <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

function StatCard({
  title, value, sub, accent, icon,
}: { title: string; value: string; sub: string; accent: "amber" | "green"; icon: React.ReactNode }) {
  const color = accent === "amber" ? "text-amber-solar" : "text-success";
  return (
    <div className="flex-1 rounded-2xl bg-surface border border-border-soft p-4 glow-card">
      <div className="flex items-center gap-2">
        <div className={`h-8 w-8 rounded-lg grid place-items-center bg-background ${color}`}>{icon}</div>
        <span className="text-[12px] text-text-muted">{title}</span>
      </div>
      <div className={`mt-3 text-[24px] font-extrabold tracking-tight ${color}`}>{value}</div>
      <div className="text-[11px] text-text-muted mt-0.5">{sub}</div>
    </div>
  );
}

function GenerationChart() {
  const data = [3.2, 4.8, 5.6, 4.1, 6.0, 5.4, 6.3];
  const max = Math.max(...data);
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  return (
    <div className="mt-3 rounded-2xl bg-surface border border-border-soft p-5 glow-card">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[15px] font-semibold">Weekly Generation</h3>
          <p className="text-[11px] text-text-muted">Last 7 days · kWh</p>
        </div>
        <button className="text-[12px] font-medium text-electric">View Full Report →</button>
      </div>
      <div className="mt-5 flex items-end gap-3 h-[120px]">
        {data.map((v, i) => {
          const h = (v / max) * 100;
          const active = i === data.length - 1;
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div
                className={`w-full rounded-t-md ${active ? "grad-amber" : "bg-gradient-to-t from-primary to-electric"}`}
                style={{ height: `${h}%` }}
              />
              <span className={`text-[10px] ${active ? "text-amber-solar font-semibold" : "text-text-muted"}`}>{days[i]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ActivityItem({ icon, color, text, time }: { icon: React.ReactNode; color: string; text: string; time: string }) {
  return (
    <li className="flex items-center gap-3 py-3">
      <div className={`h-10 w-10 shrink-0 rounded-xl grid place-items-center ${color}`}>{icon}</div>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] text-foreground truncate">{text}</p>
      </div>
      <span className="text-[11px] text-text-muted shrink-0">{time}</span>
    </li>
  );
}

function HomePage() {
  return (
    <PhoneFrame>
      <div className="px-5 pt-6">
        {/* Header */}
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <div className="min-w-0">
            <h1 className="text-[20px] font-bold truncate">Hello, Priya ☀️</h1>
            <p className="text-[12px] text-text-muted">Welcome back to your solar journey</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button className="relative h-10 w-10 rounded-full bg-surface border border-border-soft grid place-items-center">
              <Bell size={18} />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-amber-solar ring-2 ring-background" />
            </button>
            <div className="h-10 w-10 rounded-full grad-amber grid place-items-center text-background font-bold text-[14px]">PS</div>
          </div>
        </header>

        {/* Chip row */}
        <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar">
          <span className="shrink-0 text-[11px] px-3 py-1.5 rounded-full bg-surface border border-electric/40 text-electric">
            System ID: SYS-2024-001
          </span>
          <span className="shrink-0 text-[11px] px-3 py-1.5 rounded-full bg-surface border border-electric/40 text-electric">
            5 kWp System
          </span>
          <span className="shrink-0 text-[11px] px-3 py-1.5 rounded-full bg-surface border border-success/40 text-success">
            ● Healthy
          </span>
        </div>

        <StageTracker />

        {/* Stats */}
        <h2 className="mt-6 text-[16px] font-semibold">System at a glance</h2>
        <div className="mt-3 flex gap-3">
          <StatCard
            title="Today's Generation" value="18.4 kWh" sub="↑ 12% vs yesterday"
            accent="amber" icon={<Sun size={16} />}
          />
          <StatCard
            title="Total Savings" value="₹42,800" sub="Since installation"
            accent="green" icon={<Leaf size={16} />}
          />
        </div>

        <GenerationChart />

        {/* Activity */}
        <section className="mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-semibold">Recent Updates</h2>
            <Link to="/support" className="text-[12px] font-medium text-electric">See All</Link>
          </div>
          <ul className="mt-1 rounded-2xl bg-surface border border-border-soft px-4 divide-y divide-border-soft glow-card">
            <ActivityItem
              icon={<FileText size={16} className="text-electric" />}
              color="bg-electric/15"
              text="Inspection report uploaded"
              time="2d ago"
            />
            <ActivityItem
              icon={<CheckCircle2 size={16} className="text-success" />}
              color="bg-success/15"
              text="Net metering application submitted"
              time="5d ago"
            />
            <ActivityItem
              icon={<Wrench size={16} className="text-amber-solar" />}
              color="bg-amber-solar/15"
              text="Installation completed"
              time="12 Jun"
            />
          </ul>
        </section>
      </div>

      <BottomNav />
    </PhoneFrame>
  );
}
