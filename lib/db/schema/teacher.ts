import { pgTable, text, char } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { School } from "./school";

export const Teacher = pgTable("teacher", {
  ID: text("ID").primaryKey(),
  Email: text("Email").notNull(),
  Name: text("Name").notNull(),
  Surname: text("Surname").notNull(),
  School: text("School").notNull().references(() => School.Code),
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
