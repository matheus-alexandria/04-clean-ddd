import { AnswersRepository } from '../repositories/answersRepository';
import { Question } from '@domain/forum/enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questionsRepository';

export class ChooseQuestionBestAnswerUseCase {
	constructor(
    private questionRepository: QuestionsRepository,
    private answersRepository: AnswersRepository
	) {}

	async execute({ 
		authorId,
		answerId,
	}: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
		const answer = await this.answersRepository.findById(answerId);

		if (!answer) {
			throw new Error('No answer found');
		}

		const question = await this.questionRepository.findById(
			answer.questionId.toString()
		);

		if (!question) {
			throw new Error('No question found');
		}

		if (question.authorId.toString() !== authorId) {
			throw new Error('Not authorized.');
		}

		question.bestAnswerId = answer.id;

		await this.questionRepository.save(question);

		return {
			question
		};
	}
}

interface ChooseQuestionBestAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
}

interface ChooseQuestionBestAnswerUseCaseResponse {
  question: Question;
}