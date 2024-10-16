import cloudinary from '../../cloudinary_config';

export async function uploadFile(fileBuffer: Buffer, fileName: string) {
    
    const uploadResult = await cloudinary.uploader
           .upload_stream(
                {
                     public_id: fileName,
                     resource_type: 'auto',
                     overwrite: true
                },
                (error, result) => {
                    if (error) {
                        throw new Error(`Upload failed: ${error.message}`);
                    }
                    return result;
                }
              ).end(fileBuffer);

    return uploadResult;
}