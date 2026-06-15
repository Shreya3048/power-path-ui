import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/PhoneFrame";
import { BottomNav } from "@/components/BottomNav";
import { FolderClosed, FileText, Download } from "lucide-react";

export const Route = createFileRoute("/documents")({
  head: () => ({ meta: [{ title: "Documents — SolarTrack" }] }),
  component: DocsPage,
});

const DOCS = [
  { name: "Site Survey Report.pdf", size: "1.2 MB", date: "20 May 2026" },
  { name: "System Design Layout.pdf", size: "2.4 MB", date: "27 May 2026" },
  { name: "Purchase Invoice.pdf", size: "0.6 MB", date: "03 Jun 2026" },
  { name: "Inspection Report.pdf", size: "0.9 MB", date: "12 Jun 2026" },
  { name: "Net Metering Application.pdf", size: "0.4 MB", date: "13 Jun 2026" },
];

function DocsPage() {
  return (
    <PhoneFrame>
      <div className="px-5 pt-6">
        <h1 className="text-[22px] font-bold">Documents</h1>
        <p className="text-[13px] text-text-muted">All your solar paperwork in one place</p>

        <div className="mt-5 rounded-2xl bg-surface border border-border-soft glow-card divide-y divide-border-soft">
          {DOCS.map((d) => (
            <div key={d.name} className="flex items-center gap-3 p-4">
              <div className="h-10 w-10 rounded-xl bg-electric/15 grid place-items-center text-electric shrink-0">
                <FileText size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-medium truncate">{d.name}</p>
                <p className="text-[11px] text-text-muted">{d.size} · {d.date}</p>
              </div>
              <button className="h-9 w-9 rounded-lg bg-background border border-border-soft grid place-items-center text-electric shrink-0">
                <Download size={16} />
              </button>
            </div>
          ))}
        </div>

        <Link
          to="/support/new"
          className="mt-5 flex items-center gap-3 p-4 rounded-2xl bg-surface border border-border-soft"
        >
          <FolderClosed size={18} className="text-amber-solar" />
          <span className="text-[13px]">Need a document we haven&apos;t shared? Raise a request →</span>
        </Link>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}
