import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/PhoneFrame";
import { BottomNav } from "@/components/BottomNav";
import { FolderClosed, FileText, Download, ImageIcon } from "lucide-react";

export const Route = createFileRoute("/documents")({
  head: () => ({ meta: [{ title: "Documents — Elgris Solar" }] }),
  component: DocsPage,
});

type Doc = { name: string; size: string; date: string };

const STAGE_DOCS: { stage: string; status: "done" | "active" | "upcoming"; docs: Doc[] }[] = [
  {
    stage: "Documents Required",
    status: "done",
    docs: [
      { name: "Electricity Bill.pdf", size: "1.2 MB", date: "20 May 2026" },
      { name: "Aadhaar Card.pdf", size: "0.8 MB", date: "20 May 2026" },
      { name: "PAN Card.pdf", size: "0.5 MB", date: "20 May 2026" },
      { name: "Bank Details / Cancelled Cheque.pdf", size: "0.3 MB", date: "21 May 2026" },
      { name: "Quotation Copy.pdf", size: "1.5 MB", date: "22 May 2026" },
    ]
  },
  {
    stage: "Sales Order Draft",
    status: "done",
    docs: [
      { name: "Draft Sales Order.pdf", size: "2.1 MB", date: "25 May 2026" },
    ]
  },
  {
    stage: "Customer Approval",
    status: "done",
    docs: [
      { name: "Customer Approval Confirmation.pdf", size: "0.6 MB", date: "27 May 2026" },
    ]
  },
  {
    stage: "Sales Order Confirmed",
    status: "done",
    docs: [
      { name: "Final Sales Order.pdf", size: "2.2 MB", date: "28 May 2026" },
    ]
  },
  {
    stage: "Agreement Signed",
    status: "done",
    docs: [
      { name: "Agreement / Bond Copy.pdf", size: "4.5 MB", date: "01 Jun 2026" },
    ]
  },
  {
    stage: "Loan Sanctioned",
    status: "done",
    docs: [
      { name: "Bank Sanction Letter.pdf", size: "1.8 MB", date: "05 Jun 2026" },
    ]
  },
  {
    stage: "Loan Disbursed",
    status: "done",
    docs: [
      { name: "Loan Disbursement Confirmation.pdf", size: "1.1 MB", date: "10 Jun 2026" },
    ]
  },
  {
    stage: "Material Dispatched",
    status: "active",
    docs: [
      { name: "Delivery Challan.pdf", size: "0.9 MB", date: "29 Jun 2026" },
      { name: "Material Dispatch Photo.jpg", size: "3.2 MB", date: "29 Jun 2026" },
      { name: "Geo-tagged Site Photo.jpg", size: "4.1 MB", date: "29 Jun 2026" },
    ]
  },
  {
    stage: "Installation Completed",
    status: "upcoming",
    docs: []
  },
  {
    stage: "Documents Uploaded",
    status: "upcoming",
    docs: []
  },
  {
    stage: "Inspection & Release Order",
    status: "upcoming",
    docs: []
  },
  {
    stage: "Net Metering / Commissioning",
    status: "upcoming",
    docs: []
  },
  {
    stage: "Subsidy Request Submitted",
    status: "upcoming",
    docs: []
  },
  {
    stage: "Subsidy Received",
    status: "upcoming",
    docs: []
  }
];

function StatusBadge({ status }: { status: "done" | "active" | "upcoming" }) {
  if (status === "done") return <span className="px-2 py-0.5 text-[10px] uppercase font-bold rounded-full bg-success/15 text-success">Completed</span>;
  if (status === "active") return <span className="px-2 py-0.5 text-[10px] uppercase font-bold rounded-full bg-amber-solar/15 text-amber-solar">In Progress</span>;
  return <span className="px-2 py-0.5 text-[10px] uppercase font-bold rounded-full bg-border-soft text-text-muted">Upcoming</span>;
}

function DocsPage() {
  return (
    <PhoneFrame>
      <div className="px-5 pt-6 pb-24">
        <h1 className="text-[22px] font-bold">Documents</h1>
        <p className="text-[13px] text-text-muted">All your solar paperwork in one place</p>

        <div className="mt-6 flex flex-col gap-5">
          {STAGE_DOCS.map((stageInfo) => (
            <div key={stageInfo.stage} className="rounded-2xl bg-surface border border-border-soft overflow-hidden glow-card">
              <div className="bg-background/40 border-b border-border-soft p-4 flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-[14px] font-bold">{stageInfo.stage}</h2>
                <StatusBadge status={stageInfo.status} />
              </div>
              
              <div className="divide-y divide-border-soft">
                {stageInfo.docs.length > 0 ? (
                  stageInfo.docs.map((d) => {
                    const isImage = d.name.endsWith(".jpg") || d.name.endsWith(".png");
                    return (
                      <div key={d.name} className="flex items-center gap-3 p-4">
                        <div className="h-10 w-10 rounded-xl bg-electric/15 grid place-items-center text-electric shrink-0">
                          {isImage ? <ImageIcon size={18} /> : <FileText size={18} />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[13px] font-medium truncate">{d.name}</p>
                          <p className="text-[11px] text-text-muted">{d.size} · {d.date}</p>
                        </div>
                        <button className="h-9 w-9 rounded-lg bg-background border border-border-soft grid place-items-center text-electric shrink-0 hover:bg-border-soft transition-colors">
                          <Download size={16} />
                        </button>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-5 flex flex-col items-center justify-center text-center">
                    <p className="text-[12px] text-text-muted">Documents will appear here once this stage begins</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <Link
          to="/support/new"
          className="mt-6 mb-4 flex items-center gap-3 p-4 rounded-2xl bg-surface border border-border-soft hover:bg-border-soft/50 transition-colors"
        >
          <FolderClosed size={18} className="text-amber-solar shrink-0" />
          <span className="text-[13px]">Need a document we haven&apos;t shared? Raise a request →</span>
        </Link>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}
