export function requestNotificationPermission() {
  if (!("Notification" in window)) return;

  if (Notification.permission === "default") {
    Notification.requestPermission();
  }
}

export function startPrayerReminder() {
  if (!("Notification" in window)) return;

  setInterval(() => {
    const now = new Date();

    const hour = now.getHours();
    const minute = now.getMinutes();

    const today = now.toDateString();

    const lastNotification = localStorage.getItem("lastPrayerReminder");

    // 9:00 PM
    if (hour === 21 && minute === 0 && lastNotification !== today) {
      new Notification("🌙 Daily Prayer Check", {
        body: "Have you completed all 5 prayers today? Open Tawfiq to update your progress.",
        icon: "/logo192.png", // optional
      });

      localStorage.setItem("lastPrayerReminder", today);
    }
  }, 60000); // check every minute
}
    