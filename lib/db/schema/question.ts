import { pgTable, text, integer,date, serial } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { Student } from "./student";
import { TopicsInSubject } from "./topics_subject";

export const Question = pgTable("question", {
  ID: serial("ID").primaryKey(),
  Topic: serial("Topic").references(() => TopicsInSubject.ID),
  // Subject: text("Subject").references(() => TopicsInSubject.Subject),
  Student: text("Student").references(() => Student.ID),
  // Count: integer("Count").notNull(), 
  LastDate: date("LastDate").notNull(),
});

export const selectQuestionSchema = createSelectSchema(Question, {
  Topic: z.string(),
  // Subject: z.string(),
  Student: z.string(),
  // Count: z.number(),
  LastDate: z.string(),
});


export type NewQuestionParams = z.infer<typeof selectQuestionSchema>;
