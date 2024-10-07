import { pgTable, text } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const TopicsInSubject = pgTable("Topics in Subject", {
  Topic: text("Topic").primaryKey(),
  Subject: text("Subject").primaryKey(),
});

export const selectTopicsSubjectSchema = createSelectSchema(TopicsInSubject, {
  Topic: z.string(),
  Subject: z.string(),
});

export type NewTopicsSubjectParams = z.infer<typeof selectTopicsSubjectSchema>;
