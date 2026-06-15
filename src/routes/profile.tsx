import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/PhoneFrame";
import { BottomNav } from "@/components/BottomNav";
import { Pencil, Camera, LogOut, ChevronRight, MapPin, Mail, Phone, User as UserIcon } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "My Profile — SolarTrack" }] }),
  component: ProfilePage,
});

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 py-3.5">
      <div className="h-9 w-9 rounded-lg bg-background border border-border-soft grid place-items-center text-electric shrink-0">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] text-text-muted">{label}</p>
        <p className="text-[13px] font-medium truncate">{value}</p>
      </div>
      <button className="text-text-muted shrink-0"><ChevronRight size={16} /></button>
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-4 rounded-2xl bg-surface border border-border-soft p-4 glow-card">
      <div className="flex items-center justify-between">
        <h3 className="text-[14px] font-semibold">{title}</h3>
        <button className="text-text-muted"><Pencil size={14} /></button>
      </div>
      <div className="mt-1 divide-y divide-border-soft">{children}</div>
    </section>
  );
}

function ProfilePage() {
  return (
    <PhoneFrame>
      <div className="px-5 pt-6">
        <div className="flex items-center justify-between">
          <h1 className="text-[22px] font-bold">My Profile</h1>
          <button className="h-10 w-10 rounded-full bg-surface border border-border-soft grid place-items-center">
            <Pencil size={16} />
          </button>
        </div>

        {/* Hero */}
        <div className="mt-5 rounded-2xl grad-hero border border-border-soft p-6 text-center
                        shadow-[0_20px_60px_-30px_rgba(27,79,216,0.7)]">
          <div className="relative inline-block">
            <div className="h-20 w-20 rounded-full grad-amber grid place-items-center text-background text-[26px] font-extrabold glow-amber">
              PS
            </div>
            <button className="absolute bottom-0 right-0 h-7 w-7 rounded-full bg-electric text-background grid place-items-center border-2 border-surface">
              <Camera size={12} />
            </button>
          </div>
          <h2 className="mt-3 text-[20px] font-bold">Priya Sharma</h2>
          <p className="text-[12px] text-text-muted">Member since March 2025</p>

          <div className="mt-4 flex gap-2 justify-center flex-wrap">
            {["5 kWp System", "SYS-001", "Delhi"].map((c) => (
              <span key={c} className="text-[11px] px-3 py-1.5 rounded-full bg-background/40 border border-border-soft text-foreground">
                {c}
              </span>
            ))}
          </div>
        </div>

        <SectionCard title="Personal Information">
          <Row icon={<UserIcon size={14} />} label="Full Name" value="Priya Sharma" />
          <Row icon={<Mail size={14} />} label="Email Address" value="priya.sharma@gmail.com" />
          <Row icon={<Phone size={14} />} label="Phone Number" value="+91 98765 43210" />
          <Row icon={<MapPin size={14} />} label="Address" value="C-204, Vasant Kunj, New Delhi" />
        </SectionCard>

        <SectionCard title="Solar System Details">
          <Row icon={<span className="text-amber-solar">☀</span>} label="Panel Model" value="SunPower Maxeon 3" />
          <Row icon={<span className="text-amber-solar">⚡</span>} label="System Capacity" value="5 kWp" />
          <Row icon={<span className="text-electric">📅</span>} label="Installation Date" value="15 March 2025" />
          <Row icon={<span className="text-success">🛡</span>} label="Warranty Expiry" value="15 March 2050" />
          <Row icon={<span className="text-electric">⚙</span>} label="Inverter Model" value="Solis 5kW Hybrid" />
        </SectionCard>

        <section className="mt-4 rounded-2xl bg-surface border border-border-soft p-5 glow-card">
          <h3 className="text-[14px] font-semibold">Support Summary</h3>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-background p-3 text-center border border-border-soft">
              <div className="text-[20px] font-extrabold">3</div>
              <div className="text-[10px] text-text-muted">Total</div>
            </div>
            <div className="rounded-xl bg-amber-solar/10 p-3 text-center border border-amber-solar/30">
              <div className="text-[20px] font-extrabold text-amber-solar">1</div>
              <div className="text-[10px] text-text-muted">Open</div>
            </div>
            <div className="rounded-xl bg-success/10 p-3 text-center border border-success/30">
              <div className="text-[20px] font-extrabold text-success">2</div>
              <div className="text-[10px] text-text-muted">Resolved</div>
            </div>
          </div>
        </section>

        <Link
          to="/"
          className="mt-6 flex items-center justify-center gap-2 h-12 rounded-xl border border-destructive/60 text-destructive font-semibold text-[14px]"
        >
          <LogOut size={16} /> Sign Out
        </Link>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}
