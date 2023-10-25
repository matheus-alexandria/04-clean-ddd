import { AnswersRepository } from '../repositories/answersRepository';
import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { AnswerComment } from '@domain/forum/enterprise/entities/answerComment';
import { AnswerCommentsRepository } from '../repositories/answerCommentsRepository';
import { Either, left, right } from '@core/either';
import { ResourceNotFoundError } from '@core/errors/errors/resourceNotFoundError';

export class CommentOnAnswerUseCase {
	constructor(
    private answersRepository: AnswersRepository,
    private answerCommentsRepository: AnswerCommentsRepository
	) {}

	async execute({ 
		authorId,
		answerId,
		content 
	}: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
		const answer = await this.answersRepository.findById(answerId);

		if (!answer) {
			return left(new ResourceNotFoundError());
		}

		const answerComment = AnswerComment.create({
			authorId: new UniqueEntityID(authorId),
			answerId: new UniqueEntityID(answerId),
			content,
		});

		await this.answerCommentsRepository.create(answerComment);

		return right({
			answerComment
		});
	}
}

interface CommentOnAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string;
}

type CommentOnAnswerUseCaseResponse = Either<ResourceNotFoundError, { answerComment: AnswerComment }>