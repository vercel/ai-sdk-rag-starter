import { pgTable, text, integer } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const Subject = pgTable("Subject", {
  Code: text("Code").primaryKey(),
  School: text("School").primaryKey(),
  Teacher: text("Teacher").notNull(),
  Year: integer("Year").notNull(),
  Name: text("Name").notNull(),
  AuxTeacher: text("AuxTeacher").notNull(),
});

export const selectSubjectSchema = createSelectSchema(Subject, {
  Code: z.string(),
  School: z.string(),
  Teacher: z.string(),
  Year: z.number(),
  Name: z.string(),
  AuxTeacher: z.string(),
});

export type NewSubjectParams = z.infer<typeof selectSubjectSchema>;
