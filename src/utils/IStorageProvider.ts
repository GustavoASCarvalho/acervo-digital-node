import { S3 } from '@aws-sdk/client-s3';

export interface IStorageProvider {
	client: S3;

	upload(filename: string): Promise<string>;
	delete(filename: string): Promise<void>;
}
