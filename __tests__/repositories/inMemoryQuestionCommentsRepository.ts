import { QuestionCommentsRepository } from '@domain/forum/application/repositories/questionCommentsRepository';
import { QuestionComment } from '@domain/forum/enterprise/entities/questionComment';

export class InMemoryQuestionCommentsRepository implements QuestionCommentsRepository {
	public items: QuestionComment[] = [];

	async findById(questionCommentId: string): Promise<QuestionComment | null> {
		const questionComment = this.items.find((item) => item.id.toString() === questionCommentId);

		if (!questionComment) {
			return null;
		}

		return questionComment;
	}
  
	async create(questionComment: QuestionComment): Promise<void> {
		this.items.push(questionComment);
	}

	async delete(questionComment: QuestionComment): Promise<void> {
		const questionCommentIndex = this.items.findIndex((item) => item.id === questionComment.id);

		this.items.splice(questionCommentIndex, 1);
	}
}