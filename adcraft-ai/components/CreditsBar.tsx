"use client";

export default function CreditsBar({ credits }: { credits: number }) {
  const maxCredits = 5; // 🔥 free plan limit
  const percentage = (credits / maxCredits) * 100;

  return (
    <div className="w-full max-w-sm">

      {/* LABEL */}
      <div className="flex justify-between text-xs mb-1 text-gray-500">
        <span>Credits</span>
        <span>{credits} / {maxCredits}</span>
      </div>

      {/* BAR */}
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${
            credits <= 1
              ? "bg-red-500"
              : credits <= 2
              ? "bg-yellow-500"
              : "bg-black"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* WARNING */}
      {credits <= 1 && (
        <p className="text-xs text-red-500 mt-1">
          Almost out of credits
        </p>
      )}
    </div>
  );
}