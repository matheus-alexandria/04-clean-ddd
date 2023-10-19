import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { Answer } from '@domain/forum/enterprise/entities/answer';
import { AnswersRepository } from '../repositories/answersRepository';
import { Either, right } from '@core/either';

export class AnswerQuestionUseCase {
	constructor(
    private answersRepository: AnswersRepository
	) {}

	async execute({ instructorId, questionId, content }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
		const authorId = new UniqueEntityID(instructorId);
		const questionUniqueId = new UniqueEntityID(questionId);
		const answer = Answer.create({authorId, questionId: questionUniqueId, content});

		await this.answersRepository.create(answer);

		return right({
			answer
		});
	}
}

interface AnswerQuestionUseCaseRequest {
  instructorId: string;
  questionId: string;
  content: string;
}

type AnswerQuestionUseCaseResponse = Either<null, { answer: Answer }>;