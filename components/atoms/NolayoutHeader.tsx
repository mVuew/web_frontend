"use client";

import ThemeToggle from "@/components/ui/ThemeToggle";

interface NolayoutHeaderProps {
  onBack: () => void;
  onOpenModal: () => void;
}

export default function NolayoutHeader({
  onBack,
  onOpenModal,
}: NolayoutHeaderProps) {
  return (
    <div className="mb-8 flex items-center justify-between gap-4 sm:mb-10">
      <button
        onClick={onBack}
        className="
          px-4 py-2
          rounded-xl
          text-sm
          font-medium
          transition-all
          border border-border
          bg-surface
          text-foreground
          hover:bg-accent/10
          hover:border-slate-500
          whitespace-nowrap
        "
      >
        Back
      </button>

      <div className="flex items-center justify-end gap-3">
        <ThemeToggle />
        <button
          onClick={onOpenModal}
          className="
            px-4 py-2
            rounded-xl
            text-sm
            font-medium
            transition-all
            border border-border
            bg-surface
            text-foreground
            hover:bg-accent/10
            hover:border-slate-500
            whitespace-nowrap
          "
        >
          Get Early Access
        </button>
      </div>
    </div>
  );
}
