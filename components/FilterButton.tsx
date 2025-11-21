"use client";

import { useFilter } from "@/context/FilterContext";

export default function FilterButton() {
  const { setIsFilterOpen } = useFilter();

  return (
    <button
      onClick={() => setIsFilterOpen(true)}
      className="md:hidden flex items-center space-x-2 text-white hover:text-yallashop-yellow"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 4h18M3 12h12M3 20h6"
        />
      </svg>
    </button>
  );
}
