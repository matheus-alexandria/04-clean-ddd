import { Question } from '@domain/forum/enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questionsRepository';
import { Either, right } from '@core/either';

export class FetchRecentQuestionsUseCase {
	constructor(
    private questionRepository: QuestionsRepository
	) {}

	async execute({ 
		page,
	}: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {
		const questions = await this.questionRepository.findManyRecent({ page });

		return right({
			questions
		});
	}
}

interface FetchRecentQuestionsUseCaseRequest {
  page: number;
}

type FetchRecentQuestionsUseCaseResponse = Either<null, { questions: Question[] }>