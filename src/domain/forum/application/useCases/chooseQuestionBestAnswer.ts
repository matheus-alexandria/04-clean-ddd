import { AnswersRepository } from '../repositories/answersRepository';
import { Question } from '@domain/forum/enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questionsRepository';
import { Either, left, right } from '@core/either';
import { NotAllowedError } from '@core/errors/errors/notAllowedError';
import { ResourceNotFoundError } from '@core/errors/errors/resourceNotFoundError';

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
			return left(new ResourceNotFoundError());
		}

		const question = await this.questionRepository.findById(
			answer.questionId.toString()
		);

		if (!question) {
			return left(new ResourceNotFoundError());
		}

		if (question.authorId.toString() !== authorId) {
			return left(new NotAllowedError());
		}

		question.bestAnswerId = answer.id;

		await this.questionRepository.save(question);

		return right({
			question
		});
	}
}

interface ChooseQuestionBestAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
}

type ChooseQuestionBestAnswerUseCaseResponse = Either<
  NotAllowedError | ResourceNotFoundError, 
  {
    question: Question;
  }
>