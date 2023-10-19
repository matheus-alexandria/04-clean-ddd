import { AnswerComment } from '@domain/forum/enterprise/entities/answerComment';
import { AnswerCommentsRepository } from '../repositories/answerCommentsRepository';
import { Either, right } from '@core/either';

export class FetchAnswerCommentsUseCase {
	constructor(
    private answerCommentsRepository: AnswerCommentsRepository
	) {}

	async execute({ 
		answerId,
		page,
	}: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
		const answerComments = await this.answerCommentsRepository.findManyByAnswerId(answerId, { page });

		return right({
			answerComments
		});
	}
}

interface FetchAnswerCommentsUseCaseRequest {
  answerId: string;
  page: number;
}

type FetchAnswerCommentsUseCaseResponse = Either<null, { answerComments: AnswerComment[] }>