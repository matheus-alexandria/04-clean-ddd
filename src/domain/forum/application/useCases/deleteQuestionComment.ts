import { left, right, Either } from '@core/either';
import { QuestionCommentsRepository } from '../repositories/questionCommentsRepository';
import { NotAllowedError } from '@core/errors/errors/notAllowedError';
import { ResourceNotFoundError } from '@core/errors/errors/resourceNotFoundError';

export class DeleteQuestionCommentUseCase {
	constructor(
    private questionCommentsRepository: QuestionCommentsRepository
	) {}

	async execute({ 
		authorId,
		questionCommentId
	}: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
		const questionComment = await this.questionCommentsRepository.findById(questionCommentId);

		if (!questionComment) {
			return left(new ResourceNotFoundError());
		}

		if (authorId !== questionComment.authorId.toString()) {
			return left(new NotAllowedError());
		}

		await this.questionCommentsRepository.delete(questionComment);

		return right({});
	}
}

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string;
  questionCommentId: string;
}

type DeleteQuestionCommentUseCaseResponse = Either<NotAllowedError | ResourceNotFoundError, Record<string, never>>