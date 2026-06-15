import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/PhoneFrame";
import { BottomNav } from "@/components/BottomNav";
import { SlidersHorizontal, Plus, Zap, Wrench, FileText, CreditCard, Calendar, MessageSquare } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/support/")({
  head: () => ({ meta: [{ title: "My Requests — Elgris Solar" }] }),
  component: TicketsPage,
});

type Status = "Open" | "In Progress" | "Resolved" | "Closed";
const TABS: ("All" | Status)[] = ["All", "Open", "In Progress", "Resolved", "Closed"];

type Ticket = { id: string; category: string; title: string; status: Status; date: string; icon: React.ReactNode };
const TICKETS: Ticket[] = [
  { id: "TK-1042", category: "Power Generation Issue", title: "Inverter showing low output", status: "Open", date: "10 Jun 2026", icon: <Zap size={14} /> },
  { id: "TK-1038", category: "Equipment Fault", title: "Panel string 2 disconnected", status: "In Progress", date: "08 Jun 2026", icon: <Wrench size={14} /> },
  { id: "TK-1024", category: "Documentation", title: "Need warranty certificate copy", status: "Resolved", date: "02 Jun 2026", icon: <FileText size={14} /> },
  { id: "TK-1011", category: "Billing & Payment", title: "Subsidy disbursement query", status: "Resolved", date: "24 May 2026", icon: <CreditCard size={14} /> },
  { id: "TK-1004", category: "Appointment / Visit", title: "Reschedule site visit", status: "Closed", date: "15 May 2026", icon: <Calendar size={14} /> },
  { id: "TK-0991", category: "Other", title: "App login glitch", status: "Closed", date: "02 May 2026", icon: <MessageSquare size={14} /> },
];

const STATUS_STYLES: Record<Status, { pill: string; border: string }> = {
  Open:          { pill: "bg-[#7C3AED]/20 text-[#C4B5FD] border-[#7C3AED]/40", border: "border-l-[#7C3AED]" },
  "In Progress": { pill: "bg-amber-solar/20 text-amber-solar border-amber-solar/40", border: "border-l-amber-solar" },
  Resolved:      { pill: "bg-success/20 text-success border-success/40", border: "border-l-success" },
  Closed:        { pill: "bg-text-muted/20 text-text-muted border-text-muted/40", border: "border-l-text-muted" },
};

function TicketsPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");
  const filtered = tab === "All" ? TICKETS : TICKETS.filter((t) => t.status === tab);

  return (
    <PhoneFrame>
      <div className="px-5 pt-6">
        <header className="flex items-center justify-between">
          <div className="min-w-0">
            <h1 className="text-[22px] font-bold">My Requests</h1>
            <p className="text-[12px] text-text-muted">Track and manage all your support tickets</p>
          </div>
          <button className="h-10 w-10 rounded-full bg-surface border border-border-soft grid place-items-center shrink-0">
            <SlidersHorizontal size={16} />
          </button>
        </header>

        {/* Tabs */}
        <div className="mt-5 flex gap-2 overflow-x-auto no-scrollbar -mx-5 px-5">
          {TABS.map((t) => {
            const active = t === tab;
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`shrink-0 px-4 h-9 rounded-full text-[12px] font-semibold transition
                  ${active ? "grad-amber text-background" : "bg-surface border border-border-soft text-text-muted"}`}
              >
                {t}
              </button>
            );
          })}
        </div>

        {/* Cards */}
        <ul className="mt-4 flex flex-col gap-3">
          {filtered.length === 0 ? (
            <li className="rounded-2xl bg-surface border border-border-soft py-14 px-6 text-center">
              <div className="mx-auto h-14 w-14 rounded-full grad-amber grid place-items-center text-background glow-amber">
                ✓
              </div>
              <h3 className="mt-4 text-[16px] font-bold">No requests yet</h3>
              <p className="mt-1 text-[13px] text-text-muted">Your system is running smoothly! 🎉</p>
              <Link
                to="/support/new"
                className="mt-5 inline-flex items-center gap-2 grad-primary px-5 h-11 rounded-xl font-semibold text-[13px]"
              >
                Raise a Request
              </Link>
            </li>
          ) : (
            filtered.map((t) => {
              const s = STATUS_STYLES[t.status];
              return (
                <li
                  key={t.id}
                  className={`rounded-2xl bg-surface border border-border-soft border-l-4 ${s.border} p-4 glow-card`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[11px] font-mono text-text-muted">#{t.id}</span>
                    <span className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full border ${s.pill}`}>
                      {t.status}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-[12px] text-text-muted">
                    <span className="text-electric">{t.icon}</span>
                    <span>{t.category}</span>
                  </div>
                  <p className="mt-1 text-[14px] font-medium">{t.title}</p>
                  <div className="mt-3 pt-3 border-t border-border-soft flex items-center justify-between">
                    <span className="text-[11px] text-text-muted">📅 {t.date}</span>
                    <button className="text-[12px] font-semibold text-electric">View →</button>
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </div>

      {/* Floating action */}
      <Link
        to="/support/new"
        className="fixed bottom-24 right-[max(1.25rem,calc(50%-210px+1.25rem))] z-50
                   h-14 w-14 rounded-full grad-amber grid place-items-center text-background
                   shadow-[0_15px_40px_-10px_rgba(245,158,11,0.7)] active:scale-95 transition"
        aria-label="Raise a new request"
      >
        <Plus size={22} strokeWidth={3} />
      </Link>

      <BottomNav />
    </PhoneFrame>
  );
}
