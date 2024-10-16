import { pgTable, text, integer, char } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { School } from "./school";

export const Student = pgTable("student", {
  ID: text("ID").primaryKey(),
  Email: text("Email").notNull(),
  Name: text("Name").notNull(),
  Surname: text("Surname").notNull(),
  School: text("School").notNull().references(() => School.Code),
  Year: integer("Year").notNull(),
  Password: text("Password").notNull(),
});

export const selectStudentSchema = createSelectSchema(Student, {
  ID: z.string(),
  Email: z.string(),
  Name: z.string(),
  Surname: z.string(),
  School: z.string(),
  Year: z.number(),
  Password: z.string(),
});

export type NewStudentParams = z.infer<typeof selectStudentSchema>;
