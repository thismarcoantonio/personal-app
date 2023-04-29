import dayjs from "dayjs";
import { db, Databases } from "@/database";

export enum Frequency {
  ONCE = "Once",
  DAILY = "Daily",
  WEEKLY = "Weekly",
  MONTHLY = "Monthly",
  YEARLY = "Yearly",
}

export interface Reminder {
  id?: number;
  date: number;
  title: string;
  allDay: boolean;
  frequency: keyof typeof Frequency;
  location?: string;
  description?: string;
}

class RemindersTable {
  private get db() {
    return db.table(Databases.reminders);
  }

  public list(): Promise<Reminder[]> {
    const todayTimestamp = dayjs().startOf("day").valueOf();
    return this.db.where("date").aboveOrEqual(todayTimestamp).toArray();
  }

  public async create(values: Reminder): Promise<Reminder> {
    const reminderId = await this.db.put({
      ...values,
      allDay: values.allDay,
      date: values.allDay
        ? dayjs(values.date).startOf("day").valueOf()
        : values.date,
    });
    const reminder: Reminder = await this.db.get(reminderId);

    // Revisit notifications later
    // addNotification({
    //   id: reminder.id,
    //   title: reminder.title,
    //   description: "Reminder at 22:30h",
    // });

    return reminder;
  }

  public destroy(reminder: Reminder): Promise<void> {
    return this.db.delete(reminder.id!);
  }
}

export const Reminders = new RemindersTable();
