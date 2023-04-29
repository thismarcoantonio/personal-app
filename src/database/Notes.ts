import dayjs from "dayjs";
import { db, Databases } from "@/database";

export interface Note {
  id?: number;
  createdAt: number;
  updatedAt: number;
  pinned: boolean;
  title: string;
  description: string;
}

class NotesTable {
  private get db() {
    return db.table(Databases.notes);
  }

  public list(): Promise<Note[]> {
    return this.db.toArray();
  }

  public async save(values: Partial<Note>): Promise<Note> {
    const noteId = await this.db.put({
      ...values,
      createdAt: values.createdAt ?? dayjs().valueOf(),
      updatedAt: dayjs().valueOf(),
    });
    return this.db.get(noteId);
  }
}

export const Notes = new NotesTable();
