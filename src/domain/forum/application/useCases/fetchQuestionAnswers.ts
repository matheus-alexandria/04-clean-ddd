import { Either, right } from '@core/either';
import { AnswersRepository } from '../repositories/answersRepository';
import { Answer } from '@domain/forum/enterprise/entities/answer';

export class FetchQuestionAnswersUseCase {
	constructor(
    private answersRepository: AnswersRepository,
	) {}

	async execute({
		questionId,
		page,
	}: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {
		const answers = await this.answersRepository.findManyByQuestionId(
			questionId, 
			{ page }
		);

		return right({
			answers
		});
	}
}

interface FetchQuestionAnswersUseCaseRequest {
  questionId: string;
  page: number;
}

type FetchQuestionAnswersUseCaseResponse = Either<null, { answers: Answer[] }>