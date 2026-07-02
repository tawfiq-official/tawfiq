import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./AuthContext";
import { format } from "date-fns";

const BLANK_LOG = (dateStr) => ({
  date: dateStr,
  prayers: {
    fajr: "none",
    dhuhr: "none",
    asr: "none",
    maghrib: "none",
    isha: "none",
  },
  jamaah: {
    fajr: false,
    dhuhr: false,
    asr: false,
    maghrib: false,
    isha: false,
  },
  nawafil: {
    tahajjud: false,
    duha: false,
    witr: false,
    ishraq: false,
    awwabin: false,
  },
  quality: {},
  missed_reasons: {},
  is_exempt: false,
  travel_mode: false,
  taraweeh: false,
  quran_pages: 0,
});

export function useDailyLog(date = new Date()) {
  const { user } = useAuth();

  const dateStr = format(date, "yyyy-MM-dd");

  const [log, setLog] = useState(BLANK_LOG(dateStr));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      load();
    }
  }, [user, dateStr]);

  async function load() {
    setLoading(true);

    const { data, error } = await supabase
      .from("daily_logs")
      .select("*")
      .eq("user_id", user.id)
      .eq("date", dateStr)
      .maybeSingle();

    console.log("Daily Log:", data);
    console.log("Daily Log Error:", error);

    if (data) {
      setLog({
        ...BLANK_LOG(dateStr),
        ...data,
      });
    } else {
      setLog(BLANK_LOG(dateStr));
    }

    setLoading(false);
  }

  async function save(next) {
    setLog(next);

    const { data, error } = await supabase
      .from("daily_logs")
      .upsert({
        ...next,
        user_id: user.id,
      })
      .select();

    console.log("SAVE DATA:", data);
    console.log("SAVE ERROR:", error);
  }

  const setPrayerStatus = useCallback(
    async (prayer, status) => {
      const next = {
        ...log,
        prayers: {
          ...log.prayers,
          [prayer]: status,
        },
      };

      await save(next);
    },
    [log],
  );

  const toggleJamaah = useCallback(
    async (prayer) => {
      const next = {
        ...log,
        jamaah: {
          ...log.jamaah,
          [prayer]: !log.jamaah[prayer],
        },
      };

      await save(next);
    },
    [log],
  );

  const toggleNawafil = useCallback(
    async (name) => {
      const next = {
        ...log,
        nawafil: {
          ...log.nawafil,
          [name]: !log.nawafil[name],
        },
      };

      await save(next);
    },
    [log],
  );

  const saveQuality = async (prayer, value) => {
    await save({
      ...log,
      quality: {
        ...log.quality,
        [prayer]: value,
      },
    });
  };

  const saveMissedReason = async (prayer, value) => {
    await save({
      ...log,
      missed_reasons: {
        ...log.missed_reasons,
        [prayer]: value,
      },
    });
  };

  const toggleTaraweeh = async () => {
    await save({
      ...log,
      taraweeh: !log.taraweeh,
    });
  };

  const updateQuranPages = async (pages) => {
    await save({
      ...log,
      quran_pages: pages,
    });
  };

  return {
    log,
    loading,
    setPrayerStatus,
    toggleJamaah,
    toggleNawafil,
    saveQuality,
    saveMissedReason,
    toggleTaraweeh,
    updateQuranPages,
  };
}

export async function fetchAllLogs(userId) {
  const { data, error } = await supabase
    .from("daily_logs")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false });

  console.log("All Logs:", data);
  console.log("All Logs Error:", error);

  return data ?? [];
}
