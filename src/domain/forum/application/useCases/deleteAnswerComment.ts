import { Either, left, right } from '@core/either';
import { AnswerCommentsRepository } from '../repositories/answerCommentsRepository';
import { NotAllowedError } from '@core/errors/errors/notAllowedError';
import { ResourceNotFoundError } from '@core/errors/errors/resourceNotFoundError';

export class DeleteAnswerCommentUseCase {
	constructor(
    private answerCommentsRepository: AnswerCommentsRepository
	) {}

	async execute({ 
		authorId,
		answerCommentId
	}: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
		const answerComment = await this.answerCommentsRepository.findById(answerCommentId);

		if (!answerComment) {
			return left(new ResourceNotFoundError());
		}

		if (authorId !== answerComment.authorId.toString()) {
			return left(new NotAllowedError());
		}

		await this.answerCommentsRepository.delete(answerComment);

		return right({});
	}
}

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string;
  answerCommentId: string;
}

type DeleteAnswerCommentUseCaseResponse = Either<NotAllowedError | ResourceNotFoundError, Record<string, never>>