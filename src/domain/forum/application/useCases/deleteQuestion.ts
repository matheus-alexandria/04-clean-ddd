import { Either, left, right } from '@core/either';
import { QuestionsRepository } from '../repositories/questionsRepository';
import { NotAllowedError } from '@core/errors/errors/notAllowedError';
import { ResourceNotFoundError } from '@core/errors/errors/resourceNotFoundError';

export class DeleteQuestionUseCase {
	constructor(
    private questionsRepository: QuestionsRepository
	) {}

	async execute({ 
		authorId,
		questionId
	}: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
		const question = await this.questionsRepository.findById(questionId);

		if (!question) {
			return left(new ResourceNotFoundError());
		}

		if (authorId !== question.authorId.toString()) {
			return left(new NotAllowedError());
		}

		await this.questionsRepository.delete(question);

		return right({});
	}
}

interface DeleteQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
}

type DeleteQuestionUseCaseResponse = Either<NotAllowedError | ResourceNotFoundError, Record<string, never>>