"use server";

import {
  NewResourceParams,
  insertResourceSchema,
  resources,
} from "@/lib/db/schema/resources";
import { db } from "../db";

export const createResource = async (input: NewResourceParams) => {
  try {
    const payload = insertResourceSchema.parse(input);

    const contentWithoutLineBreaks = payload.content.replace("\n", " ");
    const [resource] = await db
      .insert(resources)
      .values({ content: contentWithoutLineBreaks })
      .returning();

    return "Resource successfully created.";
  } catch (e) {
    if (e instanceof Error)
      return e.message.length > 0 ? e.message : "Error, please try again.";
  }
};
