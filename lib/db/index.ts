import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { supabase } from "./supabase";
import { env } from "@/lib/env.mjs";

const client = postgres(env.DATABASE_URL);
export const db = drizzle(supabase.pool);

