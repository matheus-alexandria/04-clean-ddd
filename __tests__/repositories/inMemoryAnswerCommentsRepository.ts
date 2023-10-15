import { AnswerCommentsRepository } from '@domain/forum/application/repositories/answerCommentsRepository';
import { AnswerComment } from '@domain/forum/enterprise/entities/answerComment';

export class InMemoryAnswerCommentsRepository implements AnswerCommentsRepository {
	public items: AnswerComment[] = [];

	async findById(answerCommentId: string): Promise<AnswerComment | null> {
		const answerComment = this.items.find((item) => item.id.toString() === answerCommentId);

		if (!answerComment) {
			return null;
		}

		return answerComment;
	}
  
	async create(answerComment: AnswerComment): Promise<void> {
		this.items.push(answerComment);
	}
  
	async delete(answerComment: AnswerComment): Promise<void> {
		const answerCommentIndex = this.items.findIndex((item) => item.id === answerComment.id);

		this.items.splice(answerCommentIndex, 1);
	}
}