import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Route as RouteIcon, Headset, FolderClosed, User } from "lucide-react";
import type { ComponentType } from "react";

type Item = { to: string; label: string; icon: ComponentType<{ size?: number; className?: string }> };

const items: Item[] = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/journey", label: "Journey", icon: RouteIcon },
  { to: "/support", label: "Support", icon: Headset },
  { to: "/documents", label: "Docs", icon: FolderClosed },
  { to: "/profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <>
      {/* Spacer so content isn't hidden behind the fixed bar */}
      <div className="h-24" aria-hidden />
      <nav
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] z-40
                   bg-[#0A1628]/95 backdrop-blur-md border-t border-border-soft"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <ul className="grid grid-cols-5 px-2 py-2">
          {items.map(({ to, label, icon: Icon }) => {
            const active =
              pathname === to ||
              (to !== "/home" && pathname.startsWith(to));
            return (
              <li key={to} className="flex">
                <Link
                  to={to}
                  className={`flex flex-1 flex-col items-center justify-center gap-1 py-1.5 rounded-xl transition-colors
                              ${active ? "text-amber-solar" : "text-text-muted hover:text-foreground"}`}
                >
                  <Icon size={20} className={active ? "drop-shadow-[0_0_8px_rgba(245,158,11,0.55)]" : ""} />
                  <span className="text-[10px] font-medium tracking-wide">{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
