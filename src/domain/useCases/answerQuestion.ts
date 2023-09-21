import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { Answer } from '../entities/answer';
import { AnswersRepository } from '../repositories/answersRepository';

export class AnswerQuestionUseCase {
	constructor(
    private answersRepository: AnswersRepository
	) {}

	async execute({ instructorId, questionId, content }: AnswerQuestionUsecaseParams) {
		const authorId = new UniqueEntityID(instructorId);
		const questionUniqueId = new UniqueEntityID(questionId);
		const answer = Answer.create({authorId, questionId: questionUniqueId, content});

		await this.answersRepository.create(answer);

		return answer;
	}
}

interface AnswerQuestionUsecaseParams {
  instructorId: string;
  questionId: string;
  content: string;
}