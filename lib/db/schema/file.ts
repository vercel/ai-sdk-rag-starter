import { pgTable, text, serial,timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { Subject } from "./subject";
import { TopicsInSubject } from "./topics_subject";

export const File = pgTable("file", {
  ID: serial("ID").primaryKey(),
  FilePath: text("FilePath").notNull(),
  FileName: text("FileName").notNull(),
  // Subject: serial("Subject").notNull().references(() => Subject.ID),
  Topic: serial("Topic").notNull().references(() => TopicsInSubject.ID),
});

export const selectFileSchema = createSelectSchema(File, {
  ID: z.number(),
  FilePath: z.string(),
  FileName: z.string(),
  // Subject: z.string(),
  Topic: z.string(),
});

export type NewFileParams = z.infer<typeof selectFileSchema>;