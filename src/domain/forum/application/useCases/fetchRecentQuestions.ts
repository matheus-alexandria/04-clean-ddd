import { Question } from '@domain/forum/enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questionsRepository';

export class FetchRecentQuestionsUseCase {
	constructor(
    private questionRepository: QuestionsRepository
	) {}

	async execute({ 
		page,
	}: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {
		const questions = await this.questionRepository.findManyRecent({ page });

		return {
			questions
		};
	}
}

interface FetchRecentQuestionsUseCaseRequest {
  page: number;
}

interface FetchRecentQuestionsUseCaseResponse {
  questions: Question[];
}