import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/PhoneFrame";
import { ArrowLeft, ArrowRight, Check, ChevronDown, UploadCloud, X } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/support/new")({
  head: () => ({ meta: [{ title: "Raise a Request — SolarTrack" }] }),
  component: NewTicketPage,
});

const CATEGORIES = [
  { key: "power", icon: "⚡", label: "Power Generation Issue" },
  { key: "equipment", icon: "🔧", label: "Equipment Fault" },
  { key: "docs", icon: "📋", label: "Documentation" },
  { key: "billing", icon: "💳", label: "Billing & Payment" },
  { key: "appointment", icon: "📅", label: "Appointment / Visit" },
  { key: "other", icon: "💬", label: "Other" },
] as const;

const REASONS: Record<string, string[]> = {
  power: ["Low generation", "No generation", "Sudden drop", "Inverter fault display", "Other"],
  equipment: ["Panel damage", "Inverter not responding", "Wiring issue", "Mounting issue", "Other"],
  docs: ["Warranty copy", "Invoice copy", "Subsidy proof", "System design file", "Other"],
  billing: ["Subsidy delay", "Payment failed", "Wrong amount", "Refund request", "Other"],
  appointment: ["Reschedule visit", "Cancel visit", "Engineer no-show", "Other"],
  other: ["App issue", "Feature request", "General feedback", "Other"],
};

function NewTicketPage() {
  const nav = useNavigate();
  const [cat, setCat] = useState<string | null>(null);
  const [reason, setReason] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState<string | null>(null);

  return (
    <PhoneFrame>
      <div className="px-5 pt-6 pb-10">
        <header className="flex items-center gap-3">
          <Link to="/support" className="h-10 w-10 rounded-full bg-surface border border-border-soft grid place-items-center">
            <ArrowLeft size={18} />
          </Link>
          <div className="min-w-0">
            <h1 className="text-[18px] font-bold truncate">Raise a Request</h1>
            <p className="text-[11px] text-text-muted">We typically respond within 24 hours</p>
          </div>
        </header>

        <form
          onSubmit={(e) => { e.preventDefault(); nav({ to: "/support" }); }}
          className="mt-5 rounded-2xl bg-surface border border-border-soft p-5 glow-card"
        >
          {/* Category grid */}
          <h2 className="text-[12px] uppercase tracking-wider font-bold text-text-muted">Grievance Category</h2>
          <div className="mt-3 grid grid-cols-2 gap-2.5">
            {CATEGORIES.map((c) => {
              const active = cat === c.key;
              return (
                <button
                  type="button"
                  key={c.key}
                  onClick={() => { setCat(c.key); setReason(null); }}
                  className={`relative text-left rounded-xl p-3 border transition
                    ${active ? "border-electric bg-electric/10" : "border-border-soft bg-background hover:border-electric/50"}`}
                >
                  <div className="text-[20px]">{c.icon}</div>
                  <div className="mt-1 text-[12px] font-medium leading-tight">{c.label}</div>
                  {active && (
                    <span className="absolute top-2 right-2 h-5 w-5 rounded-full bg-electric text-background grid place-items-center">
                      <Check size={12} strokeWidth={3} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Reason dropdown */}
          {cat && (
            <div className="mt-5 animate-fade-up">
              <label className="block text-[12px] font-medium text-text-muted mb-2">Select Reason</label>
              <button
                type="button"
                onClick={() => setSheetOpen(true)}
                className="w-full h-12 px-4 rounded-xl bg-background border border-border-soft flex items-center justify-between text-[13px]"
              >
                <span className={reason ? "text-foreground" : "text-text-muted"}>
                  {reason ?? "Choose a reason…"}
                </span>
                <ChevronDown size={16} className="text-text-muted" />
              </button>
            </div>
          )}

          {/* Description */}
          <div className="mt-5">
            <label className="block text-[12px] font-medium text-text-muted mb-2">Describe your issue</label>
            <div className="relative">
              <textarea
                maxLength={500}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Tell us what's happening with your solar system..."
                className="w-full h-[120px] resize-none rounded-xl bg-background border border-border-soft p-3
                           text-[13px] outline-none focus:border-electric focus:ring-2 focus:ring-electric/30 transition"
              />
              <span className="absolute bottom-2 right-3 text-[10px] text-text-muted">{desc.length} / 500</span>
            </div>
          </div>

          {/* Attachment */}
          <div className="mt-5">
            <label className="block text-[12px] font-medium text-text-muted mb-2">Attachment (optional)</label>
            {file ? (
              <div className="flex items-center justify-between rounded-xl bg-background border border-border-soft px-3 py-2.5">
                <span className="text-[12px] truncate">{file}</span>
                <button type="button" onClick={() => setFile(null)} className="text-text-muted">
                  <X size={16} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setFile("inverter-photo.jpg")}
                className="w-full rounded-xl border border-dashed border-border-soft bg-background py-6 grid place-items-center text-text-muted hover:border-amber-solar/60 transition"
              >
                <UploadCloud size={22} className="text-amber-solar" />
                <span className="mt-1.5 text-[12px]">Tap to attach photo or document</span>
              </button>
            )}
          </div>

          <button
            type="submit"
            className="mt-6 grad-primary w-full h-[52px] rounded-xl flex items-center justify-center gap-2
                       font-semibold text-[15px] shadow-[0_10px_30px_-12px_rgba(27,79,216,0.7)]"
          >
            Submit Request <ArrowRight size={18} />
          </button>
        </form>
      </div>

      {/* Bottom sheet */}
      {sheetOpen && (
        <div className="fixed inset-0 z-50 flex justify-center">
          <button
            aria-label="Close"
            onClick={() => setSheetOpen(false)}
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-[420px] mt-auto rounded-t-3xl bg-surface border-t border-border-soft p-5 animate-fade-up">
            <div className="mx-auto h-1.5 w-12 rounded-full bg-border-soft" />
            <h3 className="mt-4 text-[16px] font-semibold">Select a Reason</h3>
            <ul className="mt-3 max-h-[50vh] overflow-y-auto">
              {(cat ? REASONS[cat] : []).map((r) => {
                const active = reason === r;
                return (
                  <li key={r}>
                    <button
                      type="button"
                      onClick={() => { setReason(r); setSheetOpen(false); }}
                      className="w-full flex items-center justify-between py-3 border-b border-border-soft text-left"
                    >
                      <span className="text-[14px]">{r}</span>
                      <span className={`h-5 w-5 rounded-full grid place-items-center border-2
                        ${active ? "border-electric bg-electric" : "border-border-soft"}`}>
                        {active && <span className="h-2 w-2 rounded-full bg-background" />}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </PhoneFrame>
  );
}
