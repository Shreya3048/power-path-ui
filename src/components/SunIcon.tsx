import elgrisLogo from "@/assets/elgris-logo-full.png";

interface SunIconProps {
  size?: number;
  glow?: boolean;
}

export function SunIcon({ size = 96, glow = true }: SunIconProps) {
  return (
    <div
      className={`grid place-items-center rounded-2xl bg-white p-3 ${glow ? "glow-amber" : ""}`}
      style={{ width: size, height: size }}
    >
      <img
        src={elgrisLogo}
        alt="Elgris Solar"
        className="w-full h-full object-contain rounded-xl"
      />
    </div>
  );
}