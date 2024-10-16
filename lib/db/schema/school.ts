import { pgTable, text } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const School = pgTable("school", {
  Code: text("Code").primaryKey(),
  Name: text("Name").notNull(),
  Location: text("Location").notNull(),
  Type: text("Type").notNull(),
});

// Updated Zod schema for School with new fields and validation constraints
export const selectSchoolSchema = createSelectSchema(School, {
  Code: z.string().max(10),
  Name: z.string(),
  Location: z.string(),
  Type: z.enum(["Elementary", "High School", "University", "Other"]),
});

export type NewSchoolParams = z.infer<typeof selectSchoolSchema>;
