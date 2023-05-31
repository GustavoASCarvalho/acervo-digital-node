import aws, { S3 } from 'aws-sdk';
import path from 'path';
import mime from 'mime';
import fs from 'fs';
import { IStorageProvider } from './IStorageProvider';

import multerConfig from '../config/multer';

export class StorageProvider implements IStorageProvider {
	public client: S3;

	constructor() {
		this.client = new aws.S3({
			region: process.env.S3_REGION!,
		});
	}

	async upload(filename: string): Promise<string> {
		const originalPath = path.resolve(multerConfig.directory, filename);
		const contentType = mime.getType(originalPath);

		if (!contentType) {
			throw new Error('File not found');
		}

		const fileContent = await fs.promises.readFile(originalPath);

		await this.client
			.putObject({
				Bucket: process.env.S3_BUCKET!,
				Key: filename,
				ACL: 'public-read',
				Body: fileContent,
				ContentType: contentType,
			})
			.promise();

		await fs.promises.unlink(originalPath);

		return `https://acervoparanagua.s3.sa-east-1.amazonaws.com/${filename}`;
	}

	async delete(filename: string): Promise<void> {
		await this.client
			.deleteObject({
				Bucket: process.env.S3_BUCKET!,
				Key: filename,
			})
			.promise();
	}
}
