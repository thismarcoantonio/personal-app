import Dexie from "dexie";
import dayjs from "dayjs";
// import { addNotification } from "@/utils/notifications";

export enum Databases {
  reminders = "reminders",
}

export enum Frequency {
  ONCE = "Once",
  DAILY = "Daily",
  WEEKLY = "Weekly",
  MONTHLY = "Monthly",
  YEARLY = "Yearly",
}

export interface Reminder {
  id: number;
  date: number;
  title: string;
  allDay: boolean;
  frequency: keyof typeof Frequency;
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
  const todayTimestamp = dayjs().startOf("day").valueOf();
  return db
    .table(Databases.reminders)
    .where("date")
    .aboveOrEqual(todayTimestamp)
    .toArray();
}

export async function saveReminder({
  date,
  allDay,
  ...values
}: Partial<Reminder>) {
  const reminderId = await db.table(Databases.reminders).put({
    ...values,
    allDay,
    date: allDay ? dayjs(date).startOf("day").valueOf() : date,
  });
  const reminder: Reminder = await db
    .table(Databases.reminders)
    .get(reminderId);

  // Revisit notifications later
  // addNotification({
  //   id: reminder.id,
  //   title: reminder.title,
  //   description: "Reminder at 22:30h",
  // });

  return reminder;
}
