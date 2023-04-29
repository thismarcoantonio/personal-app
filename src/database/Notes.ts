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
}

export const Notes = new NotesTable();
