import Dexie from "dexie";
import { addNotification } from "@/utils/notifications";

export enum Databases {
  reminders = "reminders",
}

export interface Reminder {
  id: number;
  title: string;
  date?: string;
  location?: string;
  description?: string;
}

export class Database extends Dexie {
  public reminders!: Dexie.Table<Reminder, number>;

  constructor() {
    super("PersonalAppDatabase");
    this.version(1).stores({
      [Databases.reminders]: "++id, title, date, location, description",
    });
  }
}

export const db = new Database();

export function getReminders() {
  return db.table(Databases.reminders).toArray();
}

export async function createReminder(values: Omit<Reminder, "id">) {
  const reminderId = await db.table(Databases.reminders).put(values);
  const reminder: Reminder = await db
    .table(Databases.reminders)
    .get(reminderId);
  addNotification({
    id: reminder.id,
    title: reminder.title,
    description: "Reminder at 22:30h",
  });
  return reminder;
}
