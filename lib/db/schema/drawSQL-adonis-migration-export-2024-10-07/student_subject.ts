import { pgTable, text } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const StudentInSubject = pgTable("StudentInSubject", {
  Student: text("Student").primaryKey(),
  Subject: text("Subject").primaryKey(),
});

export const selectStudentSubjectSchema = createSelectSchema(StudentInSubject, {
  Student: z.string(),
  Subject: z.string(),
});

export type NewStudentSubjectParams = z.infer<typeof selectStudentSubjectSchema>;
