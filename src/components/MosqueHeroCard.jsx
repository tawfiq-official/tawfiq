import { Sparkles, Star, ChevronRight } from "lucide-react";
import XPProgressBar from "./XPProgressBar";
export default function MosqueHeroCard({
  level,
  title,
  currentXP,
  nextXP,
  image,
  nextUnlock,
}) {


  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-[34px]
        h-[340px]
        hover:scale-[1.01] transition-all duration-500
        shadow-[0_20px_60px_rgba(16,185,129,0.25)]
        border
        border-white/20
      "
    >
      {/* Background Image */}

      <img
        src={image}
        alt="Mosque"
        className="absolute inset-0 w-full h-full object-cover scale-105"
      />

      {/* Dark Overlay */}

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />

      {/* Glow */}

      <div className="absolute -top-24 -right-16 w-60 h-60 bg-emerald-400/20 blur-[100px]" />

      {/* Content */}

      <div className="relative z-10 flex flex-col justify-between h-full p-6 text-white">
        {/* Header */}

        <div className="flex justify-between items-start">
          <div>
            <p className="uppercase tracking-[0.25em] text-xs opacity-80 font-bold">
              My Mosque
            </p>

            <h1 className="text-3xl font-black mt-2">{title}</h1>

            <p className="text-sm opacity-80 mt-1">Level {level}</p>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center">
            <Sparkles size={28} />
          </div>
        </div>

        {/* XP */}

        <div>
          <XPProgressBar currentXP={currentXP} nextXP={nextXP} />
          <div className="w-full h-3 rounded-full bg-white/20 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-green-300 transition-all duration-1000"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          {/* Next Unlock */}

          <div className="mt-5 rounded-2xl bg-white/10 backdrop-blur-md px-4 py-3 flex justify-between items-center">
            <div>
              <p className="text-xs uppercase tracking-widest opacity-70">
                Next Unlock
              </p>

              <p className="font-bold mt-1">{nextUnlock}</p>
            </div>

            <ChevronRight />
          </div>

          {/* XP Hint */}

          <div className="mt-4 flex items-center gap-2 text-sm opacity-90">
            <Star size={16} />

            <span>{nextXP - currentXP} XP until next level</span>
          </div>
        </div>
      </div>
    </div>
  );
}
