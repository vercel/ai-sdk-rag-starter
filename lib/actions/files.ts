'use server';

import { File, selectFileSchema, NewFileParams } from '@/lib/db/schema/file';
import { db } from '../db';

type CreateFileResponse = {
  message: string;
  file_id?: { id: number };
};

export const createFile = async (input: NewFileParams): Promise<CreateFileResponse> => {
  try {
    const { FilePath, FileName, Topic } = selectFileSchema.parse(input);

    const [file_id] = await db
      .insert(File)
      .values({ FilePath, FileName, Topic })
      .returning({ id: File.ID });

    return { message: "File successfully created.", file_id };
  } catch (error) {
    return { 
            message: (
                error instanceof Error && error.message.length > 0
                ? error.message
                : 'Error, please try again.'
            )
        };
  }
};
