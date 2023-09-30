import { Question } from '@domain/forum/enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questionsRepository';
import { UniqueEntityID } from '@core/entities/uniqueEntityId';

export class GetQuestionBySlugUseCase {
	constructor(
    private questionsRepository: QuestionsRepository
	) {}

	async execute({ 
		slug,
	}: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
		const question = await this.questionsRepository.findBySlug(slug);

		if (!question) {
			throw new Error('No question was found with the given slug.');
		}

		return {
			question
		};
	}
}

interface GetQuestionBySlugUseCaseRequest {
  slug: string;
}

interface GetQuestionBySlugUseCaseResponse {
  question: Question; 
}