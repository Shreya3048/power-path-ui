export function SunIcon({ size = 96, glow = true }: { size?: number; glow?: boolean }) {
  return (
    <div
      className={`relative grid place-items-center rounded-full ${glow ? "glow-amber" : ""}`}
      style={{ width: size, height: size }}
    >
      <div
        className="absolute inset-0 animate-sun-spin"
        aria-hidden
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 360) / 12;
            return (
              <rect
                key={i}
                x="48.5"
                y="2"
                width="3"
                height="12"
                rx="1.5"
                fill="#F59E0B"
                opacity={i % 2 === 0 ? 1 : 0.55}
                transform={`rotate(${angle} 50 50)`}
              />
            );
          })}
        </svg>
      </div>
      <div
        className="rounded-full grad-amber"
        style={{ width: size * 0.55, height: size * 0.55 }}
      />
    </div>
  );
}
