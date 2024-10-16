CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS "embedding" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"resource_id" varchar(191),
	"content" text NOT NULL,
	"embedding" vector(1536) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "file" (
	"ID" serial PRIMARY KEY NOT NULL,
	"FilePath" text NOT NULL,
	"FileName" text NOT NULL,
	"Topic" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question" (
	"ID" serial PRIMARY KEY NOT NULL,
	"Topic" serial NOT NULL,
	"Student" text,
	"LastDate" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "resources" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"page_number" integer DEFAULT 0 NOT NULL,
	"File" serial NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "school" (
	"Code" text PRIMARY KEY NOT NULL,
	"Name" text NOT NULL,
	"Location" text NOT NULL,
	"Type" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "student" (
	"ID" text PRIMARY KEY NOT NULL,
	"Email" text NOT NULL,
	"Name" text NOT NULL,
	"Surname" text NOT NULL,
	"School" text NOT NULL,
	"Year" integer NOT NULL,
	"Password" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "student_in_subject" (
	"ID" serial PRIMARY KEY NOT NULL,
	"Student" text,
	"Subject" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subject" (
	"ID" serial PRIMARY KEY NOT NULL,
	"Code" text,
	"School" text,
	"Teacher" text NOT NULL,
	"Year" integer NOT NULL,
	"Name" text NOT NULL,
	"AuxTeacher" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "teacher" (
	"ID" text PRIMARY KEY NOT NULL,
	"Email" text NOT NULL,
	"Name" text NOT NULL,
	"Surname" text NOT NULL,
	"School" text NOT NULL,
	"Password" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "topics_in_subject" (
	"ID" serial PRIMARY KEY NOT NULL,
	"Topic" text,
	"Subject" serial NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "embedding" ADD CONSTRAINT "embedding_resource_id_resources_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "file" ADD CONSTRAINT "file_Topic_topics_in_subject_ID_fk" FOREIGN KEY ("Topic") REFERENCES "public"."topics_in_subject"("ID") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question" ADD CONSTRAINT "question_Topic_topics_in_subject_ID_fk" FOREIGN KEY ("Topic") REFERENCES "public"."topics_in_subject"("ID") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question" ADD CONSTRAINT "question_Student_student_ID_fk" FOREIGN KEY ("Student") REFERENCES "public"."student"("ID") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "resources" ADD CONSTRAINT "resources_File_file_ID_fk" FOREIGN KEY ("File") REFERENCES "public"."file"("ID") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "student" ADD CONSTRAINT "student_School_school_Code_fk" FOREIGN KEY ("School") REFERENCES "public"."school"("Code") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "student_in_subject" ADD CONSTRAINT "student_in_subject_Student_student_ID_fk" FOREIGN KEY ("Student") REFERENCES "public"."student"("ID") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "student_in_subject" ADD CONSTRAINT "student_in_subject_Subject_subject_ID_fk" FOREIGN KEY ("Subject") REFERENCES "public"."subject"("ID") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subject" ADD CONSTRAINT "subject_School_school_Code_fk" FOREIGN KEY ("School") REFERENCES "public"."school"("Code") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subject" ADD CONSTRAINT "subject_Teacher_teacher_ID_fk" FOREIGN KEY ("Teacher") REFERENCES "public"."teacher"("ID") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subject" ADD CONSTRAINT "subject_AuxTeacher_teacher_ID_fk" FOREIGN KEY ("AuxTeacher") REFERENCES "public"."teacher"("ID") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "teacher" ADD CONSTRAINT "teacher_School_school_Code_fk" FOREIGN KEY ("School") REFERENCES "public"."school"("Code") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "topics_in_subject" ADD CONSTRAINT "topics_in_subject_Subject_subject_ID_fk" FOREIGN KEY ("Subject") REFERENCES "public"."subject"("ID") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "embeddingIndex" ON "embedding" USING hnsw ("embedding" vector_cosine_ops);