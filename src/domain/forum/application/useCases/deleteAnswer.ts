import { Either, left, right } from '@core/either';
import { AnswersRepository } from '../repositories/answersRepository';
import { NotAllowedError } from '@core/errors/errors/notAllowedError';
import { ResourceNotFoundError } from '@core/errors/errors/resourceNotFoundError';

export class DeleteAnswerUseCase {
	constructor(
    private answersRepository: AnswersRepository
	) {}

	async execute({ 
		authorId,
		answerId
	}: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
		const answer = await this.answersRepository.findById(answerId);

		if (!answer) {
			return left(new ResourceNotFoundError());
		}

		if (authorId !== answer.authorId.toString()) {
			return left(new NotAllowedError());
		}

		await this.answersRepository.delete(answer);

		return right({});
	}
}

interface DeleteAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
}

type DeleteAnswerUseCaseResponse = Either<NotAllowedError | ResourceNotFoundError, Record<string, never>>