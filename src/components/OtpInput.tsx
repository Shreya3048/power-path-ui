import React, { useRef, useEffect } from "react";

interface OtpInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  hasError: boolean;
  disabled?: boolean;
}

export function OtpInput({ value, onChange, hasError, disabled = false }: OtpInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    if (inputsRef.current[0] && !disabled) {
      inputsRef.current[0].focus();
    }
  }, [disabled]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value;
    if (!/^\d*$/.test(val)) return; // Allow only digits

    const newValue = [...value];
    // Take the last character if user types in an already filled box
    const char = val.slice(-1);
    newValue[index] = char;
    onChange(newValue);

    // Auto-advance if we entered a digit and are not at the end
    if (char !== "" && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (value[index] === "") {
        // Current box is empty, move to previous and clear it
        if (index > 0) {
          const newValue = [...value];
          newValue[index - 1] = "";
          onChange(newValue);
          inputsRef.current[index - 1]?.focus();
        }
      } else {
        // Clear current box but don't move cursor yet
        const newValue = [...value];
        newValue[index] = "";
        onChange(newValue);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (!/^\d{6}$/.test(pastedData)) return; // Must be exactly 6 digits

    const digits = pastedData.split("");
    onChange(digits);
    // Focus last input box
    inputsRef.current[5]?.focus();
  };

  return (
    <div className={`flex justify-center gap-[10px] ${hasError ? "animate-shake" : ""}`}>
      {/* Inline styles for the shake animation */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
      
      {Array.from({ length: 6 }).map((_, i) => (
        <input
          key={i}
          ref={(el) => {
            inputsRef.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={value[i] || ""}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={handlePaste}
          disabled={disabled}
          className={`w-12 h-14 rounded-xl bg-background text-center text-[24px] font-bold text-white outline-none transition-all
            border ${
              hasError
                ? "border-destructive ring-2 ring-destructive/20"
                : "border-border-soft focus:border-electric focus:ring-2 focus:ring-electric/30"
            }
            disabled:opacity-50`}
        />
      ))}
    </div>
  );
}
