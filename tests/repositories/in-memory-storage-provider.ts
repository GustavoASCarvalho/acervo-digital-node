import { IStorageProvider } from '../../src/utils/IStorageProvider';
import { Tag } from '../../src/domain/entities/tag';
import { ApiError } from '../../src/helpers/types/api-error';
import { S3 } from 'aws-sdk';

export class InMemoryStorageProvider implements IStorageProvider {
	public client: S3;

	constructor() {
		this.client = {} as S3;
	}

	upload(filename: string): Promise<string> {
		return Promise.resolve(
			`https://acervoparanagua.s3.sa-east-1.amazonaws.com/${filename}`,
		);
	}
	delete(filename: string): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
