export default function XPProgressBar({
  currentXP,
  nextXP,
  color = "from-emerald-400 to-green-300",
}) {
  const progress = Math.min((currentXP / nextXP) * 100, 100);

  return (
    <div className="space-y-3">
      {/* Labels */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-white/90">Experience</span>

        <span className="text-sm font-bold text-white">
          {currentXP} / {nextXP} XP
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-4 rounded-full overflow-hidden bg-white/20">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-1000`}
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      {/* Percentage */}
      <div className="text-right">
        <span className="text-xs text-white/70 font-semibold">
          {progress.toFixed(0)}% Completed
        </span>
      </div>
    </div>
  );
}
