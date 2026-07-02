import React, { useState, useEffect, useMemo, useRef } from "react";
import { Users, Star, AlertCircle } from "lucide-react";
import { PRAYER_NAMES } from "@/lib/prayerUtils";
import PrayerQualitySheet from "@/components/PrayerQualitySheet";
import MissedReasonSheet from "@/components/MissedReasonSheet";

const STATUS_STYLES = {
  none: {
    card: "border-border bg-card",
  },

  on_time: {
    card: "border-l-4 border-l-green-600 border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-700",
  },

  late: {
    card: "border-l-4 border-l-amber-500 border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-700",
  },

  missed: {
    card: "border-l-4 border-l-red-500 border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-700",
  },
};

const DOT_COLOR = {
  none: "bg-muted-foreground/30",
  on_time: "bg-green-600",
  late: "bg-amber-400",
  missed: "bg-red-500",
};

const BTN_ACTIVE = {
  on_time: "bg-green-600 text-white shadow-lg shadow-green-500/30",

  late: "bg-amber-500 text-white shadow-lg shadow-amber-400/30",

  missed: "bg-red-500 text-white shadow-lg shadow-red-500/30",
};

export default function PrayerCard({
  prayer,
  status,
  prayerTime,
  jamaah,
  isExempt,
  quality = {},
  missedReason = "",
  rawPrayerTime, // e.g. "05:18" 24h format for lock validation
  onStatusChange,
  onJamaahToggle,
  onQualitySave,
  onMissedReasonSave,
}) {
  const [qualityOpen, setQualityOpen] = useState(false);
  const [reasonOpen, setReasonOpen] = useState(false);
  const [now, setNow] = useState(() => new Date());

  // Update clock every 30s for auto-unlock
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);

  // Future lock: prayer hasn't started yet
  const isLocked = useMemo(() => {
    if (!rawPrayerTime) return false;
    const [h, m] = rawPrayerTime.split(":").map(Number);
    const prayerDate = new Date();
    prayerDate.setHours(h, m, 0, 0);
    return now < prayerDate;
  }, [rawPrayerTime, now]);

  const lockedUntil = useMemo(() => {
    if (!rawPrayerTime || !isLocked) return null;
    const [h, m] = rawPrayerTime.split(":").map(Number);
    const prayerDate = new Date();
    prayerDate.setHours(h, m, 0, 0);
    const diffMs = prayerDate - now;
    const totalMin = Math.floor(diffMs / 60000);
    const hh = Math.floor(totalMin / 60);
    const mm = totalMin % 60;
    return hh > 0 ? `${hh}h ${mm}m` : `${mm}m`;
  }, [rawPrayerTime, isLocked, now]);

  const stl = STATUS_STYLES[status] || STATUS_STYLES.none;

  const handleStatus = (next) => {
    if (isExempt || isLocked) return;
    const newStatus = status === next ? "none" : next;
    onStatusChange(prayer, newStatus);
    if (newStatus === "missed") setTimeout(() => setReasonOpen(true), 300);
  };

  const khushu = quality?.khushu || 0;

  return (
    <>
      <div
        className={`
    rounded-2xl
    border-2
    p-4
    transition-all
    duration-300
    hover:shadow-xl
    hover:border-green-300
    hover:-translate-y-0.5
    ${stl.card}
    ${isExempt ? "opacity-50 pointer-events-none" : ""}
  `}
      >
        {/* Top row */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-3.5 h-3.5 ring-2 ring-white dark:ring-gray-900 rounded-full flex-shrink-0 ${DOT_COLOR[status] || DOT_COLOR.none} transition-colors duration-150`}
            />
            <div>
              <p className="text-xl font-bold tracking-tight text-foreground">
                {PRAYER_NAMES[prayer]}
              </p>
              <p className="text-sm text-muted-foreground font-medium mt-1">
                {prayerTime || "—"}
              </p>

              {status === "on_time" && (
                <p className="text-xs text-green-600 font-medium mt-1">
                  ✓ Completed
                </p>
              )}

              {status === "late" && (
                <p className="text-xs text-amber-500 font-medium mt-1">
                  ⏱ Completed Late
                </p>
              )}

              {status === "missed" && (
                <p className="text-xs text-red-500 font-medium mt-1">
                  ✕ Missed
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Lock badge */}
            {isLocked && (
              <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-green-50 border border-green-200 text-green-700 dark:bg-green-900/30 dark:border-green-700 dark:text-green-300 text-xs font-semibold">
                ⏳ Starts in {lockedUntil}
              </span>
            )}

            {/* Khushu stars indicator */}
            {!isLocked && status === "on_time" && khushu > 0 && (
              <div className="flex items-center gap-0.5">
                {Array(khushu)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      size={10}
                      className="text-amber-400 fill-amber-400"
                    />
                  ))}
              </div>
            )}

            {/* Missed reason indicator */}
            {!isLocked && status === "missed" && missedReason && (
              <span className="text-[10px] text-red-500 font-medium px-3 py-1 rounded-full bg-red-50 dark:bg-red-950/30 border border-red-200/60">
                {missedReason}
              </span>
            )}

            {!isLocked && status === "on_time" && (
              <button
                onClick={() => onJamaahToggle(prayer)}
                className={`flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1.5 rounded-full border transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 ${
                  jamaah
                    ? "bg-green-600 text-primary-foreground border-green-600"
                    : "border-border text-green-700 dark:text-green-300 bg-transparent"
                }`}
              >
                <Users size={10} />
                Jama'ah
              </button>
            )}

            {!isLocked && status === "missed" && (
              <button
                onClick={() => setReasonOpen(true)}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-red-50 dark:bg-red-950/30 text-red-400 border border-red-200/60 transition-all active:scale-90"
              >
                <AlertCircle size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Status buttons */}
        {isLocked ? (
          <div className="grid grid-cols-3 gap-2">
            {["On Time", "Late", "Missed"].map((label) => (
              <div
                key={label}
                className="py-2.5 rounded-xl text-xs font-semibold bg-secondary/50 text-muted-foreground/40 text-center cursor-not-allowed select-none"
              >
                {label}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {["on_time", "late", "missed"].map((btn) => (
              <button
                key={btn}
                onClick={() => handleStatus(btn)}
                className={`py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-95 ${
                  status === btn
                    ? BTN_ACTIVE[btn]
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/40"
                }`}
              >
                {btn === "on_time"
                  ? "On Time"
                  : btn === "late"
                    ? "Late"
                    : "Missed"}
              </button>
            ))}
          </div>
        )}

        {/* Quality log button — only for completed prayers */}
        {!isLocked && (status === "on_time" || status === "late") && (
          <button
            onClick={() => setQualityOpen(true)}
            className="mt-2.5 w-full py-2 rounded-xl text-xs font-medium text-muted-foreground bg-green-50 dark:bg-green-900/20 hover:bg-muted border border-green-200 dark:border-green-700 flex items-center justify-center gap-1.5 transition-all active:scale-[0.99]"
          >
            <Star size={11} />
            {khushu > 0
              ? `Quality logged (${khushu}/5)`
              : "Log quality (optional)"}
          </button>
        )}
      </div>

      <PrayerQualitySheet
        open={qualityOpen}
        onClose={() => setQualityOpen(false)}
        prayer={prayer}
        quality={quality}
        onSave={(q) => onQualitySave(prayer, q)}
      />
      <MissedReasonSheet
        open={reasonOpen}
        onClose={() => setReasonOpen(false)}
        prayer={prayer}
        currentReason={missedReason}
        onSave={(r) => onMissedReasonSave(prayer, r)}
      />
    </>
  );
}
