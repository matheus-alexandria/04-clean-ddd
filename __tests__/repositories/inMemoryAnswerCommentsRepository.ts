import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { PaginationParams } from '@core/repositories/PaginationParams';
import { AnswerCommentsRepository } from '@domain/forum/application/repositories/answerCommentsRepository';
import { AnswerComment, AnswerCommentProps } from '@domain/forum/enterprise/entities/answerComment';
import { faker } from '@faker-js/faker';

export class InMemoryAnswerCommentsRepository implements AnswerCommentsRepository {
	public items: AnswerComment[] = [];

	async findById(answerCommentId: string): Promise<AnswerComment | null> {
		const answerComment = this.items.find((item) => item.id.toString() === answerCommentId);

		if (!answerComment) {
			return null;
		}

		return answerComment;
	}

	async findManyByAnswerId(answerId: string, { page }: PaginationParams): Promise<AnswerComment[]> {
		const answerComments = this.items
			.filter((item) => item.answerId.toString() === answerId)
			.slice((page - 1) * 20, page * 20);

		return answerComments;
	}
  
	async create(answerComment: AnswerComment): Promise<void> {
		this.items.push(answerComment);
	}
  
	async delete(answerComment: AnswerComment): Promise<void> {
		const answerCommentIndex = this.items.findIndex((item) => item.id === answerComment.id);

		this.items.splice(answerCommentIndex, 1);
	}

	factory(override: Partial<AnswerCommentProps> = {}, id?: UniqueEntityID) {
		const answerComment = AnswerComment.create(
			{
				answerId: new UniqueEntityID(),
				authorId: new UniqueEntityID(),
				content: faker.lorem.sentence(),
				...override
			}, id
		);

		this.items.push(answerComment);

		return answerComment;
	}
}