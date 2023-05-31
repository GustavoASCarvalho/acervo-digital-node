import { S3 } from 'aws-sdk';

export interface IStorageProvider {
	client: S3;

	upload(filename: string): Promise<String>;
	delete(filename: string): Promise<void>;
}
