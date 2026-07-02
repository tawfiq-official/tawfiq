import BottomNav from "@/components/BottomNav";
import MosqueHeroCard from "@/components/MosqueHeroCard";
import NextUnlockCard from "@/components/NextUnlockCard";

import level1 from "@/assets/mosque/level1.png";

export default function Journey() {
  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}

      <header className="border-b border-border bg-background">
        <div className="max-w-md mx-auto px-6 py-6">
          <p className="text-emerald-600 text-xs font-bold tracking-[0.3em] uppercase">
            Tawfiq Journey
          </p>

          <h1 className="text-3xl font-black mt-2">My Mosque</h1>

          <p className="text-muted-foreground mt-2">
            Build your mosque by remaining consistent in your worship and
            learning.
          </p>
        </div>
      </header>

      {/* Content */}

      <main className="max-w-md mx-auto px-5 py-6 space-y-6">
        {/* Hero */}

        <MosqueHeroCard
          level={2}
          title="Village Mosque"
          currentXP={180}
          nextXP={300}
          image={level1}
          nextUnlock="Garden of Reflection"
        />

        {/* Next Unlock */}

        <NextUnlockCard
          unlockName="Garden of Reflection"
          unlockLevel={3}
          xpRemaining={120}
          rewards={[
            "🌴 Palm Trees",
            "🌸 Flower Garden",
            "🐦 Birds",
            "🪨 Stone Path",
          ]}
        />

        {/* Earn XP */}

        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-600 font-bold">
            Earn XP
          </p>

          <div className="mt-5 space-y-4">
            <XPRow title="Pray all 5 Salah" xp="+25 XP" />

            <XPRow title="Read Quran" xp="+15 XP" />

            <XPRow title="Complete Lesson" xp="+30 XP" />

            <XPRow title="Morning Adhkar" xp="+10 XP" />

            <XPRow title="Evening Adhkar" xp="+10 XP" />

            <XPRow title="Finish Quiz" xp="+20 XP" />
          </div>
        </div>

        {/* Recent Activity */}

        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-600 font-bold">
            Recent Activity
          </p>

          <div className="mt-5 space-y-4">
            <ActivityRow title="Completed Wudu Lesson" xp="+30 XP" />

            <ActivityRow title="Read Quran" xp="+15 XP" />

            <ActivityRow title="Prayed Fajr" xp="+20 XP" />
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

function XPRow({ title, xp }) {
  return (
    <div className="flex items-center justify-between">
      <span className="font-medium">{title}</span>

      <span className="font-bold text-emerald-600">{xp}</span>
    </div>
  );
}

function ActivityRow({ title, xp }) {
  return (
    <div className="flex items-center justify-between border-b border-border pb-3 last:border-none last:pb-0">
      <div>
        <p className="font-semibold">{title}</p>

        <p className="text-xs text-muted-foreground">Just now</p>
      </div>

      <span className="font-bold text-emerald-600">{xp}</span>
    </div>
  );
}