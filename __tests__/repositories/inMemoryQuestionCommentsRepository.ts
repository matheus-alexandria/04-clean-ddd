import { QuestionCommentsRepository } from '@domain/forum/application/repositories/questionCommentsRepository';
import { QuestionComment } from '@domain/forum/enterprise/entities/questionComment';

export class InMemoryQuestionCommentsRepository implements QuestionCommentsRepository {
	public items: QuestionComment[] = [];

	async create(questionComment: QuestionComment): Promise<void> {
		this.items.push(questionComment);
	}
}