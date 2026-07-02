import React from "react";
import { CheckCircle2 } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { PRAYER_NAMES, PRAYERS } from "@/lib/prayerUtils";

export default function RecoveryCard({ log, prayerTimes, qazaTotal }) {
  if (!log) return null;

  const prayers = log.prayers || {};
  const missed = PRAYERS.filter((p) => prayers[p] === "missed");
  const pending = PRAYERS.filter((p) => prayers[p] === "none");

  const tasks = [];

  if (qazaTotal > 0)
    tasks.push({
      text: "Complete 1 Qaza prayer from your backlog",
      type: "qaza",
    });
  pending.forEach((p) =>
    tasks.push({
      text: `Pray ${PRAYER_NAMES[p]}${prayerTimes[p] ? ` (${prayerTimes[p]})` : ""}`,
      type: "pending",
    }),
  );
  missed.forEach((p) =>
    tasks.push({ text: `Make up ${PRAYER_NAMES[p]} as Qaza`, type: "missed" }),
  );

  if (tasks.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-green-50 to-white dark:from-green-950/20 dark:to-card border border-green-200 dark:border-green-800 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="mb-4">
        <p className="text-[11px] uppercase tracking-[0.2em] text-green-700 dark:text-green-400 font-bold">
          TODAY'S FOCUS
        </p>

        <h3 className="text-xl font-bold text-foreground mt-1">
          Recovery Plan
        </h3>
      </div>
      <div className="space-y-3">
        {tasks.slice(0, 4).map((task, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-2xl bg-white dark:bg-green-950/20 p-3 border border-green-100 dark:border-green-800"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                task.type === "qaza"
                  ? "bg-amber-100 text-amber-600"
                  : task.type === "missed"
                    ? "bg-red-100 text-red-500"
                    : "bg-green-100 text-green-700"
              }`}
            >
              <CheckCircle2 size={15} />
            </div>

            <p className="text-[15px] font-medium text-foreground leading-6">
              {task.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
