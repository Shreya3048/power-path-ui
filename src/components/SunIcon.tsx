import logoAsset from "@/assets/elgris-logo.png.asset.json";

export function SunIcon({ size = 96, glow = true }: { size?: number; glow?: boolean }) {
  return (
    <div
      className={`grid place-items-center rounded-2xl bg-white px-4 py-3 ${glow ? "glow-amber" : ""}`}
      style={{ height: size, maxWidth: size * 2.6 }}
    >
      <img
        src={logoAsset.url}
        alt="Elgris Solar Power Systems"
        className="h-full w-auto object-contain"
      />
    </div>
  );
}
