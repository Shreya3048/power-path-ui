import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bell, Check, Lock, ArrowRight, Sun, Leaf, FileText, CheckCircle2, Wrench,
} from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/home")({
  head: () => ({ meta: [{ title: "Dashboard — SolarTrack" }] }),
  component: HomePage,
});

type Stage = { label: string; status: "done" | "active" | "upcoming"; desc?: string; started?: string };

const STAGES: Stage[] = [
  { label: "Site Survey", status: "done" },
  { label: "Design & Approval", status: "done" },
  { label: "Material Procurement", status: "done" },
  {
    label: "Installation", status: "active",
    desc: "Our certified team is installing panels, wiring and the inverter at your site.",
    started: "10 June 2026",
  },
  { label: "Inspection & Testing", status: "upcoming" },
  { label: "Net Metering", status: "upcoming" },
  { label: "Live & Active", status: "upcoming" },
];

function StageNode({ stage }: { stage: Stage }) {
  if (stage.status === "done") {
    return (
      <div className="flex flex-col items-center w-[88px] shrink-0">
        <div className="h-9 w-9 rounded-full bg-electric grid place-items-center text-background">
          <Check size={18} strokeWidth={3} />
        </div>
        <span className="mt-2 text-[11px] text-foreground text-center leading-tight">{stage.label}</span>
      </div>
    );
  }
  if (stage.status === "active") {
    return (
      <div className="flex flex-col items-center w-[88px] shrink-0">
        <div className="h-11 w-11 rounded-full grad-amber animate-pulse-amber grid place-items-center text-background font-bold">
          <Sun size={20} />
        </div>
        <span className="mt-2 text-[11px] font-bold text-amber-solar text-center leading-tight">{stage.label}</span>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center w-[88px] shrink-0">
      <div className="h-9 w-9 rounded-full border-2 border-dashed border-border-soft" />
      <span className="mt-2 text-[11px] text-text-muted text-center leading-tight">{stage.label}</span>
    </div>
  );
}

function Connector({ left, right }: { left: Stage["status"]; right: Stage["status"] }) {
  const solid = left === "done" && right === "done";
  // Position connector to overlap node centers; sits behind nodes via negative margin trick handled in flex layout.
  return (
    <div className="flex-1 h-9 flex items-center -mx-2">
      <div
        className={`w-full h-[2px] ${solid ? "bg-electric" : ""}`}
        style={solid ? undefined : { backgroundImage: "repeating-linear-gradient(90deg, #1E3A5F 0 6px, transparent 6px 12px)" }}
      />
    </div>
  );
}

function StageTracker() {
  const active = STAGES.find((s) => s.status === "active")!;
  return (
    <div className="mt-4 rounded-2xl bg-surface border border-border-soft p-5
                    shadow-[0_0_0_1px_rgba(245,158,11,0.08),0_20px_60px_-30px_rgba(245,158,11,0.35)]">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[16px] font-semibold">Project Progress</h2>
        <span className="text-[11px] text-text-muted">4 of 7</span>
      </div>

      {/* Horizontal scroll: nodes + connectors */}
      <div className="overflow-x-auto no-scrollbar -mx-1">
        <div className="flex items-start px-1 min-w-max">
          {STAGES.map((s, i) => (
            <div key={s.label} className="flex items-start">
              <StageNode stage={s} />
              {i < STAGES.length - 1 && (
                <Connector left={s.status} right={STAGES[i + 1].status} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Active stage detail card */}
      <div className="mt-5 rounded-xl bg-background/60 border border-border-soft p-4">
        <div className="flex items-center gap-2">
          <span className="text-[11px] uppercase tracking-wider font-bold text-amber-solar">Current Stage</span>
          <span className="h-1 w-1 rounded-full bg-text-muted" />
          <span className="text-[11px] text-text-muted">Step 4 of 7</span>
        </div>
        <h3 className="mt-1 text-[16px] font-bold">{active.label}</h3>
        <p className="mt-1 text-[13px] text-text-muted leading-relaxed">{active.desc}</p>
        <p className="mt-2 text-[12px] text-text-muted">Started: {active.started}</p>

        <button
          className="mt-4 grad-amber w-full h-12 rounded-xl flex items-center justify-center gap-2
                     font-bold text-background text-[14px] active:scale-[0.98] transition
                     shadow-[0_10px_30px_-12px_rgba(245,158,11,0.7)]"
        >
          <Lock size={14} /> APPROVE & PROCEED <ArrowRight size={16} />
        </button>
        <p className="mt-2 text-[11px] text-text-muted text-center">
          This action is permanent and cannot be undone
        </p>
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
