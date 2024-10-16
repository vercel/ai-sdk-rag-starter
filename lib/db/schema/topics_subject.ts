import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { Subject } from "./subject";

export const TopicsInSubject = pgTable("topics_in_subject", {
  ID: serial("ID").primaryKey(),
  Topic: text("Topic"),
  Subject: serial("Subject").references(() => Subject.ID),
});

export const selectTopicsSubjectSchema = createSelectSchema(TopicsInSubject, {
  Topic: z.string(),
  Subject: z.string(),
});

export type NewTopicsSubjectParams = z.infer<typeof selectTopicsSubjectSchema>;
