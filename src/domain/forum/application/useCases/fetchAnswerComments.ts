import { AnswerComment } from '@domain/forum/enterprise/entities/answerComment';
import { AnswerCommentsRepository } from '../repositories/answerCommentsRepository';

export class FetchAnswerCommentsUseCase {
	constructor(
    private answerCommentsRepository: AnswerCommentsRepository
	) {}

	async execute({ 
		answerId,
		page,
	}: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
		const answerComments = await this.answerCommentsRepository.findManyByAnswerId(answerId, { page });

		return {
			answerComments
		};
	}
}

interface FetchAnswerCommentsUseCaseRequest {
  answerId: string;
  page: number;
}

interface FetchAnswerCommentsUseCaseResponse {
  answerComments: AnswerComment[];
}