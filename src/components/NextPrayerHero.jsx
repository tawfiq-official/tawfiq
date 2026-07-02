import React, { useState, useEffect, useRef, memo } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Sparkles } from "lucide-react";
import { CALCULATION_METHODS } from "@/lib/prayerUtils";

// Makkah images per prayer (free Unsplash URLs, always valid)
// Replace this URL with your preferred simple Hajj image link
// const simpleHajjBg =
//   "https://images.unsplash.com/photo-1583057577582-748987391515?w=800&q=80";
//going to delete this 
// const BG = {
//   fajr: simpleHajjBg,
//   dhuhr: simpleHajjBg,
//   asr: simpleHajjBg,
//   maghrib: simpleHajjBg,
//   isha: simpleHajjBg,
//   default: simpleHajjBg,
// };

function parseTimeToDate(timeStr) {
  if (!timeStr) return null;
  const [h, min] = timeStr.split(":").map(Number);
  const d = new Date();
  d.setHours(h, min, 0, 0);
  return d;
}

function getNextPrayer(rawTimings) {
  if (!rawTimings) return null;
  const now = new Date();
  const order = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
  for (const name of order) {
    const t = parseTimeToDate(rawTimings[name]);
    if (t && t > now)
      return {
        name: name.toLowerCase(),
        label: name,
        time: t,
        raw: rawTimings[name],
      };
  }
  // All passed → next is Fajr tomorrow
  const t = parseTimeToDate(rawTimings["Fajr"]);
  if (t) {
    t.setDate(t.getDate() + 1);
  }
  return { name: "fajr", label: "Fajr", time: t, raw: rawTimings["Fajr"] };
}

function getStatus(nextPrayer) {
  if (!nextPrayer?.time) return null;
  const diffMs = nextPrayer.time - new Date();
  const diffMin = diffMs / 60000;
  if (diffMs <= 0)
    return { label: "Time Entered", color: "bg-red-500", dot: "bg-red-400" };
  if (diffMin <= 15)
    return {
      label: "Starting Soon",
      color: "bg-amber-500",
      dot: "bg-amber-400",
    };
  return { label: "Upcoming", color: "bg-green-600", dot: "bg-green-400" };
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

function formatCountdown(ms) {
  if (ms <= 0) return { h: "00", m: "00", s: "00" };
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return { h: pad2(h), m: pad2(m), s: pad2(s) };
}

function formatDisplayTime(timeStr) {
  if (!timeStr) return "--:--";
  const [h, min] = timeStr.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${pad2(min)} ${period}`;
}

const NextPrayerHero = memo(function NextPrayerHero({
  rawTimings,
  calcMethod,
}) {
  const [countdown, setCountdown] = useState({ h: "--", m: "--", s: "--" });
  const [status, setStatus] = useState(null);
  const timerRef = useRef(null);

  const next = rawTimings ? getNextPrayer(rawTimings) : null;
  const methodName =
    CALCULATION_METHODS.find((m) => m.id === calcMethod)?.name ||
    "Standard Method";
const bgUrl =
  "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=1800&q=80&auto=format&fit=crop";
  useEffect(() => {
    if (!next?.time) return;
    function tick() {
      const ms = next.time - new Date();
      setCountdown(formatCountdown(ms));
      setStatus(getStatus(next));
    }
    tick();
    timerRef.current = setInterval(tick, 1000);
    return () => clearInterval(timerRef.current);
  }, [next?.name, next?.time?.getTime()]);

  const st = status || getStatus(next);

  return (
    <div
      className="relative overflow-hidden rounded-3xl shadow-2xl border border-white/10 ring-1 ring-white/10"
      style={{ minHeight: 220 }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{
          backgroundImage: `url(${bgUrl})`,
          willChange: "transform",
          animation: "heroZoom 35s ease-in-out infinite alternate",
        }}
      />
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/35 to-black/10" />
      <div className="absolute inset-0 bg-primary/10" />

      {/* Content */}
      <div className="relative px-5 pt-5 pb-5 flex flex-col gap-3">
        {/* Top row: status + method */}
        <div className="flex items-center justify-between">
          {st ? (
            <span
              className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2 shadow-lg rounded-full text-white ${st.color}`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full animate-pulse ${st.dot}`}
              />
              {st.label}
            </span>
          ) : (
            <span className="text-xs text-white/60">Loading…</span>
          )}
          {rawTimings && (
            <span className="text-[11px] text-green-100/90 text-right font-medium max-w-[130px] leading-tight">
              {methodName}
            </span>
          )}
        </div>

        {/* Prayer name + time */}
        <div>
          <p className="text-xs font-bold text-green-200 uppercase tracking-[0.25em] mb-2">
            Next Prayer
          </p>
          <div className="flex items-baseline gap-3">
            <p className="text-5xl font-extrabold tracking-tight text-white leading-none">
              {next?.label || "—"}
            </p>
            <p className="text-xl font-semibold text-green-100">
              {next ? formatDisplayTime(next.raw) : ""}
            </p>
          </div>
        </div>

        {/* Countdown */}
        {next && (
          <div className="flex items-center gap-2">
            {[
              ["h", "Hours"],
              ["m", "Min"],
              ["s", "Sec"],
            ].map(([key, label]) => (
              <div
                key={key}
                className="flex flex-col items-center bg-white/20 border border-white/20 backdrop-blur-md rounded-2xl px-4 py-3 min-w-[62px] shadow-lg"
              >
                <span className="text-3xl font-black text-white tabular-nums leading-none">
                  {countdown[key]}
                </span>
                <span className="text-[10px] text-green-100/80 uppercase tracking-[0.15em] mt-1">
                  {label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Quick actions */}
        <div className="flex items-center gap-2 mt-1">
          <Link
            to="/quran"
            className="flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/20 text-white text-sm font-semibold px-5 py-3 rounded-2xl hover:bg-white/30 hover:-translate-y-0.5 hover:shadow-lg transition-all active:scale-95"
          >
            <BookOpen size={13} /> Quran
          </Link>
          <Link
            to="/intelligence"
            className="flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/20 text-white text-sm font-semibold px-5 py-3 rounded-2xl hover:bg-white/30 hover:-translate-y-0.5 hover:shadow-lg transition-all active:scale-95"
          >
            <Sparkles size={13} /> Mentor
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes heroZoom {
          from { transform: scale(1.1); }
          to   { transform: scale(1.18); }
        }
      `}</style>
    </div>
  );
});

export default NextPrayerHero;
