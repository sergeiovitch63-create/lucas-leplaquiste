import type { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
}

interface PhoneFrameProps {
  children: ReactNode;
  compact?: boolean;
}

export function PhoneFrame({ children, compact = false }: PhoneFrameProps) {
  return (
    <div className={`flex w-full justify-center ${compact ? "py-2" : "py-8 sm:py-12"}`}>
      <div className="w-full max-w-[420px]">{children}</div>
    </div>
  );
}


