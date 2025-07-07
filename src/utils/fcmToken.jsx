import { getToken } from "firebase/messaging";
import { messaging } from "../utils/firebase";

export const getFCMToken = async () => {
  try {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      alert("Notification permission denied");
      return null;
    }

    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js"
    );

    const token = await getToken(messaging, {
      vapidKey:
        "BIzgPA007P_YuQlCnZUW00dtFThBcK47_5kJbhn6gAWKTCsF4QB7Cr_o28vnRMtU-Yb3OiR-ayJ6f2Z0Dg2Wpns",
      serviceWorkerRegistration: registration,
    });
    console.log("FCM Token:", token);

    if (token) {
      return token;
    } else {
      console.warn("No token received");
      return null;
    }
  } catch (err) {
    console.error("FCM Error:", err);
    return null;
  }
};
