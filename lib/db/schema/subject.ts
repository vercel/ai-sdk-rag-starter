import { pgTable, text, integer, serial } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { School } from "./school";
import { Teacher } from "./teacher";

export const Subject = pgTable("subject", {
  ID: serial("ID").primaryKey(),
  Code: text("Code"),
  School: text("School").references(() => School.Code),
  Teacher: text("Teacher").notNull().references(() => Teacher.ID),
  Year: integer("Year").notNull(),
  Name: text("Name").notNull(),
  AuxTeacher: text("AuxTeacher").notNull().references(() => Teacher.ID),
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
