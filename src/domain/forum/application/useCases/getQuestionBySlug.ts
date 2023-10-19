import { Question } from '@domain/forum/enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questionsRepository';
import { Either, left, right } from '@core/either';
import { ResourceNotFoundError } from './errors/resourceNotFoundError';

export class GetQuestionBySlugUseCase {
	constructor(
    private questionsRepository: QuestionsRepository
	) {}

	async execute({ 
		slug,
	}: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
		const question = await this.questionsRepository.findBySlug(slug);

		if (!question) {
			return left(new ResourceNotFoundError());
		}

		return right({
			question
		});
	}
}

interface GetQuestionBySlugUseCaseRequest {
  slug: string;
}

type GetQuestionBySlugUseCaseResponse = Either<ResourceNotFoundError, { question: Question }>