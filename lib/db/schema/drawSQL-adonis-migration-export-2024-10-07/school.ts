import { pgTable, text } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const School = pgTable("School", {
  Code: text("Code").primaryKey(),
  Name: text("Name").notNull(),
});

export const selectSchoolSchema = createSelectSchema(School, {
  Code: z.string(),
  Name: z.string(),
});

export type NewSchoolParams = z.infer<typeof selectSchoolSchema>;
