import Dexie from "dexie";

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

export function createReminder(values: Omit<Reminder, "id">) {
  return db.table(Databases.reminders).put(values);
}
