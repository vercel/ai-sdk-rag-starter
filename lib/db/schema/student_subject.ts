import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { Student } from "./student";
import { Subject } from "./subject";

export const StudentInSubject = pgTable("student_in_subject", {
  ID: serial("ID").primaryKey(),
  Student: text("Student").references(() => Student.ID),
  Subject: serial("Subject").references(() => Subject.ID),
});

export const selectStudentSubjectSchema = createSelectSchema(StudentInSubject, {
  Student: z.string(),
  Subject: z.string(),
});

export type NewStudentSubjectParams = z.infer<typeof selectStudentSubjectSchema>;
