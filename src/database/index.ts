import Dexie from "dexie";
import type { Reminder } from "@/database/Reminders";
import type { Note } from "@/database/Notes";

export enum Databases {
  reminders = "reminders",
  notes = "notes",
}

export class Database extends Dexie {
  public reminders!: Dexie.Table<Reminder, number>;
  public notes!: Dexie.Table<Note, number>;

  constructor() {
    super("PersonalAppDatabase");
    this.version(1).stores({
      [Databases.reminders]: "++id, title, date, frequency",
      [Databases.notes]: "++id, title, description",
    });
  }
}

export const db = new Database();
