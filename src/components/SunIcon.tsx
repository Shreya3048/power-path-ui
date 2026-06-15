import elgrisLogo from "@/assets/elgris-logo.png";

export function SunIcon({ size = 96, glow = true }: { size?: number; glow?: boolean }) {
  return (
    <div
      className={`grid place-items-center rounded-2xl bg-white px-4 py-3 ${glow ? "glow-amber" : ""}`}
      style={{ height: size, maxWidth: size * 2.6 }}
    >
      <img
        src={elgrisLogo}
        alt="Elgris Solar"
        className="w-full h-full object-contain"
      />
    </div>
  );
}
