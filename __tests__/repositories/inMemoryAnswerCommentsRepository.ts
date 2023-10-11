import { AnswerCommentsRepository } from '@domain/forum/application/repositories/answerCommentsRepository';
import { AnswerComment } from '@domain/forum/enterprise/entities/answerComment';

export class InMemoryAnswerCommentsRepository implements AnswerCommentsRepository {
	public items: AnswerComment[] = [];

	async create(answerComment: AnswerComment): Promise<void> {
		this.items.push(answerComment);
	}
}