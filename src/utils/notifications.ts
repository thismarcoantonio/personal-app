import { LocalNotifications } from "@capacitor/local-notifications";

interface Notification {
  id: number;
  title: string;
  description: string;
}

export function addNotification({ id, title, description }: Notification) {
  LocalNotifications.schedule({
    notifications: [
      {
        id,
        title,
        body: description,
        schedule: {
          allowWhileIdle: true,
          at: new Date(new Date().getTime() + 5000),
        },
      },
    ],
  });
}
