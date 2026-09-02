import { cn } from "../../utils/cn";

interface BrandLogoProps {
  showName?: boolean;
  size?: "sm" | "md" | "lg";
  tone?: "light" | "dark";
  className?: string;
}

const sizeClasses = {
  sm: "h-10 w-10",
  md: "h-12 w-12",
  lg: "h-16 w-16"
};

export function BrandLogo({ showName = false, size = "md", tone = "light", className }: BrandLogoProps) {
  return (
    <span className={cn("inline-flex min-w-0 items-center gap-3", className)}>
      <span
        className={cn(
          "grid flex-none place-items-center overflow-hidden rounded-full border bg-ink shadow-soft",
          tone === "dark" ? "border-white/20" : "border-slate-200",
          sizeClasses[size]
        )}
      >
        <img
          src="/images/logo/logo-padrao.jpeg"
          alt="iZone Club"
          className="h-full w-full rounded-full object-cover"
          width="256"
          height="256"
        />
      </span>
      {showName ? (
        <span className={cn("truncate text-base font-semibold", tone === "dark" ? "text-white" : "text-ink")}>
          iZone Club
        </span>
      ) : null}
    </span>
  );
}
