declare module "cloudinary" {
    export namespace v2 {
        export interface UploadApiResponse {
            public_id: string;
            version: string;
            signature: string;
            width: number;
            height: number;
            format: string;
            resource_type: string;
            created_at: string;
            tags: string[];
            bytes: number;
            type: string;
            etag: string;
            placeholder: boolean;
            url: string;
            secure_url: string;
            access_mode: string;
            asset_id: string;
            original_filename: string;
        }

        export interface UploadApiOptions {
            public_id?: string;
            context?: string | string[] | object;
            moderation?: string;
            raw_convert?: string;
            ocr?: string;
            categorization?: string;
            detection?: string;
            similarity_search?: string;
            background_removal?: string;
        }

        export interface Uploader {
            upload(
                file: string | Buffer,
                options?: UploadApiOptions,
                callback?: (error: any, result: UploadApiResponse) => void
            ): Promise<UploadApiResponse>;
        }

        export interface CloudinaryConfig {
            cloud_name: string;
            api_key: string;
            api_secret: string;
        }

        export function config(config: CloudinaryConfig): void;

        export const uploader: Uploader;
    }
}