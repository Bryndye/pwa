// notification.js
export const requestPermission = async () => {
    if (!("Notification" in window)) {
      throw new Error("Notification not supported");
    }
    const permission = await window.Notification.requestPermission();
    if (permission !== "granted") {
      throw new Error("Permission not granted for Notification");
    }
  };
  
export const showNotification = async (title, options) => {
    if (!("Notification" in window)) {
      throw new Error("Notification not supported");
    }
    if (window.Notification.permission !== "granted") {
      throw new Error("Permission not granted for Notification");
    }
    if ("vibrate" in navigator) {
      navigator.vibrate(200);
    }
    return new window.Notification(title, options);
};

requestPermission()