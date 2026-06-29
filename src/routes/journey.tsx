import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/PhoneFrame";
import { BottomNav } from "@/components/BottomNav";
import { Check, Sun, Clock, Lock, Upload, MapPin } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/journey")({
  head: () => ({ meta: [{ title: "My Journey — Elgris Solar" }] }),
  component: JourneyPage,
});

const STAGES = [
  { label: "Advance Received", status: "done", date: "20 May 2026", desc: "Rs. 1,000 advance payment confirmed, deal closed." },
  { label: "Documents Required", status: "done", date: "22 May 2026", desc: "Electricity bill, Aadhaar, PAN submitted." },
  { label: "Sales Order Draft", status: "done", date: "25 May 2026", desc: "Draft sales order prepared for review." },
  { label: "Customer Approval", status: "done", date: "27 May 2026", desc: "Sales order reviewed and approved." },
  { label: "Sales Order Confirmed", status: "done", date: "28 May 2026", desc: "Final sales order completed." },
  { label: "Agreement Signed", status: "done", date: "01 June 2026", desc: "Bond/agreement copy uploaded and confirmed." },
  { label: "Loan Sanctioned", status: "done", date: "05 June 2026", desc: "Bank loan sanction completed." },
  { label: "Loan Disbursed", status: "done", date: "10 June 2026", desc: "Loan disbursement completed." },
  { label: "Material Dispatched", status: "active", date: "Started 29 June 2026", desc: "Panels, inverter, structure dispatched to your site." },
  { label: "Installation Completed", status: "upcoming", date: "Est. 05 July 2026", desc: "Panel, inverter, structure installation done." },
  { label: "Documents Uploaded", status: "upcoming", date: "Est. 07 July 2026", desc: "Installation documents uploaded to DISCOM portal." },
  { label: "Inspection & Release Order", status: "upcoming", date: "Est. 12 July 2026", desc: "Inspection completed, release order received." },
  { label: "Net Metering / Commissioning", status: "upcoming", date: "Est. 18 July 2026", desc: "Net meter installed, project commissioned." },
  { label: "Subsidy Request Submitted", status: "upcoming", date: "Est. 20 July 2026", desc: "Subsidy token requested." },
  { label: "Subsidy Received", status: "upcoming", date: "Est. 15 Aug 2026", desc: "Subsidy amount disbursed/credited." },
  { label: "After-Sales Support", status: "upcoming", date: "Ongoing", desc: "System is fully active and ongoing support phase begins." },
] as const;

function JourneyPage() {
  const [photoUploaded, setPhotoUploaded] = useState(false);

  return (
    <PhoneFrame>
      <div className="px-5 pt-6 pb-24">
        <h1 className="text-[22px] font-bold">My Journey</h1>
        <p className="text-[13px] text-text-muted">From survey to switched-on</p>

        <ol className="relative mt-6 pl-6">
          <span className="absolute left-[11px] top-2 bottom-2 w-px bg-border-soft" />
          {STAGES.map((s, idx) => {
            const Icon =
              s.status === "done" ? Check : s.status === "active" ? Sun : Clock;
            const ring =
              s.status === "done" ? "bg-electric text-background" :
              s.status === "active" ? "grad-amber text-background animate-pulse-amber" :
              "bg-surface border border-border-soft text-text-muted";
              
            const stageIndex = idx + 1; // 1-indexed

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
                  
                  {/* Action UI specifically for ACTIVE stages that require action */}
                  {s.status === "active" && stageIndex === 9 && (
                    <div className="mt-4 pt-4 border-t border-border-soft">
                      <div className="mb-3">
                        <label className="flex items-center gap-1.5 text-[13px] font-bold text-foreground">
                          <MapPin size={14} className="text-amber-solar" />
                          Geo-tagged Photo (Mandatory)
                        </label>
                        <p className="text-[11px] text-text-muted mt-1">
                          Please upload a photo of your delivered materials with location tag enabled on your camera app
                        </p>
                      </div>
                      
                      {/* TODO: integrate with device camera geolocation API or EXIF geo-tag validation when backend is ready — for now, just accept any image file as a placeholder */}
                      <button
                        onClick={() => setPhotoUploaded(true)}
                        className={`w-full h-24 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-colors ${
                          photoUploaded ? "border-success bg-success/10 text-success" : "border-border-soft bg-background hover:bg-surface text-text-muted"
                        }`}
                      >
                        {photoUploaded ? (
                          <>
                            <Check size={24} />
                            <span className="text-[12px] font-medium">Photo Attached Successfully</span>
                          </>
                        ) : (
                          <>
                            <Upload size={24} />
                            <span className="text-[12px] font-medium">Tap to upload photo</span>
                          </>
                        )}
                      </button>

                      <button
                        disabled={!photoUploaded}
                        className={`mt-4 w-full h-12 rounded-xl flex items-center justify-center gap-2 font-bold text-[14px] transition
                          ${photoUploaded 
                            ? "grad-amber text-background active:scale-[0.98] shadow-[0_10px_30px_-12px_rgba(245,158,11,0.7)]" 
                            : "bg-surface border border-border-soft text-text-muted opacity-60 cursor-not-allowed"}`}
                      >
                        <Lock size={14} /> CONFIRM & UPLOAD GEO-TAG PHOTO
                      </button>
                      <p className="mt-2 text-[11px] text-text-muted text-center">
                        This action is permanent and cannot be undone
                      </p>
                    </div>
                  )}

                  {s.status === "active" && stageIndex === 2 && (
                    <div className="mt-4 pt-4 border-t border-border-soft">
                      <button
                        className="w-full h-12 rounded-xl flex items-center justify-center gap-2 font-bold text-[14px] grad-amber text-background active:scale-[0.98] transition shadow-[0_10px_30px_-12px_rgba(245,158,11,0.7)]"
                      >
                        <Lock size={14} /> UPLOAD DOCUMENTS & PROCEED
                      </button>
                      <p className="mt-2 text-[11px] text-text-muted text-center">
                        This action is permanent and cannot be undone
                      </p>
                    </div>
                  )}

                  {s.status === "active" && stageIndex === 4 && (
                    <div className="mt-4 pt-4 border-t border-border-soft">
                      <button
                        className="w-full h-12 rounded-xl flex items-center justify-center gap-2 font-bold text-[14px] grad-amber text-background active:scale-[0.98] transition shadow-[0_10px_30px_-12px_rgba(245,158,11,0.7)]"
                      >
                        <Lock size={14} /> APPROVE & PROCEED
                      </button>
                      <p className="mt-2 text-[11px] text-text-muted text-center">
                        This action is permanent and cannot be undone
                      </p>
                    </div>
                  )}

                  {s.status === "active" && ![2, 4, 9].includes(stageIndex) && (
                    <div className="mt-4 pt-3 border-t border-border-soft">
                      <p className="text-[12px] font-medium text-amber-solar flex items-center gap-2">
                        <Clock size={14} /> Our team is processing this stage
                      </p>
                    </div>
                  )}
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
