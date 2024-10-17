import cloudinary from '../../cloudinary_config';

export async function uploadFile2Cloudinary(fileBuffer: Buffer, fileName: string) {
    
    const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                public_id: fileName,
                resource_type: 'auto',
                overwrite: true
            },
            (error: any, result: any) => {
                if (error) {
                    reject(new Error(`Upload failed: ${error.message}`));
                } else {
                    resolve(result);
                }
            }
        );
        stream.end(fileBuffer);
    });

    console.log(`File uploaded to Cloudinary`);

    const url = (uploadResult as any).secure_url;

    return url;
}
