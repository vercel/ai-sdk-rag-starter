import { pgTable, text, char } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const Teacher = pgTable("Teacher", {
  ID: text("ID").primaryKey(),
  Email: text("Email").notNull(),
  Name: char("Name").notNull(),
  Surname: char("Surname").notNull(),
  School: text("School").notNull(),
  Password: text("Password").notNull(),
});

export const selectTeacherSchema = createSelectSchema(Teacher, {
  ID: z.string(),
  Email: z.string(),
  Name: z.string(),
  Surname: z.string(),
  School: z.string(),
  Password: z.string(),
});

export type NewTeacherParams = z.infer<typeof selectTeacherSchema>;
