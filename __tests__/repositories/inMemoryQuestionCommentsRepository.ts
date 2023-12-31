import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { PaginationParams } from '@core/repositories/PaginationParams';
import { QuestionCommentsRepository } from '@domain/forum/application/repositories/questionCommentsRepository';
import { QuestionComment, QuestionCommentProps } from '@domain/forum/enterprise/entities/questionComment';
import { faker } from '@faker-js/faker';

export class InMemoryQuestionCommentsRepository implements QuestionCommentsRepository {
	public items: QuestionComment[] = [];
  
	async findById(questionCommentId: string): Promise<QuestionComment | null> {
		const questionComment = this.items.find((item) => item.id.toString() === questionCommentId);
    
		if (!questionComment) {
			return null;
		}
    
		return questionComment;
	}
  
	async findManyByQuestionId(questionId: string, { page }: PaginationParams): Promise<QuestionComment[]> {
		const questionComments = this.items
			.filter((item) => item.questionId.toString() === questionId)
			.slice((page - 1) * 20, page * 20);

		return questionComments;
	}
  
	async create(questionComment: QuestionComment): Promise<void> {
		this.items.push(questionComment);
	}

	async delete(questionComment: QuestionComment): Promise<void> {
		const questionCommentIndex = this.items.findIndex((item) => item.id === questionComment.id);

		this.items.splice(questionCommentIndex, 1);
	}

	factory(override: Partial<QuestionCommentProps> = {}, id?: UniqueEntityID): QuestionComment {
		const questionComment = QuestionComment.create({
			authorId: new UniqueEntityID(),
			content: faker.lorem.sentence(),
			questionId: new UniqueEntityID,
			...override
		}, id);

		this.items.push(questionComment);

		return questionComment;
	}
}