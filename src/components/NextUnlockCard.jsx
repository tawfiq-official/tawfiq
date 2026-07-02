import { Lock, Trees, Sparkles, ArrowRight } from "lucide-react";

export default function NextUnlockCard({
  unlockName,
  unlockLevel,
  xpRemaining,
  rewards = [],
}) {
  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-[30px]
        bg-gradient-to-br
        from-emerald-500
        via-green-600
        to-emerald-700
        p-6
        text-white
        shadow-[0_20px_60px_rgba(16,185,129,0.35)]
        border
        border-white/10
      "
    >
      {/* Glow */}

      <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/10 blur-3xl" />

      {/* Header */}

      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/70 font-bold">
            Next Unlock
          </p>

          <h2 className="text-2xl font-black mt-2 flex items-center gap-2">
            <Trees size={26} />
            {unlockName}
          </h2>
        </div>

        <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center">
          <Lock size={28} />
        </div>
      </div>

      {/* Rewards */}

      <div className="mt-6 space-y-3">
        {rewards.map((reward, index) => (
          <div key={index} className="flex items-center gap-3 text-white/90">
            <Sparkles size={16} />

            <span>{reward}</span>
          </div>
        ))}
      </div>

      {/* Footer */}

      <div className="mt-8 flex items-center justify-between rounded-2xl bg-white/10 backdrop-blur-md px-4 py-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-white/70">
            Unlocks at Level {unlockLevel}
          </p>

          <p className="font-bold mt-1">{xpRemaining} XP Remaining</p>
        </div>

        <ArrowRight />
      </div>
    </div>
  );
}
