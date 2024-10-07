import { pgTable, text, integer } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const Question = pgTable("Question", {
  Topic: text("Topic").primaryKey(),
  Subject: text("Subject").primaryKey(),
  Student: text("Student").primaryKey(),
  Count: integer("Count").notNull(),
  LastDate: text("LastDate").notNull(),
});

export const selectQuestionSchema = createSelectSchema(Question, {
  Topic: z.string(),
  Subject: z.string(),
  Student: z.string(),
  Count: z.number(),
  LastDate: z.string(),
});


export type NewQuestionParams = z.infer<typeof selectQuestionSchema>;
