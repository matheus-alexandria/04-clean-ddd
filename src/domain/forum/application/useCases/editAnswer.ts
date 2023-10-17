import { Answer } from '@domain/forum/enterprise/entities/answer';
import { AnswersRepository } from '../repositories/answersRepository';
import { Either, left, right } from '@core/either';

export class EditAnswerUseCase {
	constructor(
    private answersRepository: AnswersRepository
	) {}

	async execute({ 
		authorId,
		answerId,
		content
	}: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
		const answer = await this.answersRepository.findById(answerId);

		if (!answer) {
			return left('No answer with this id was found.');
		}

		if (authorId !== answer.authorId.toString()) {
			return left('Not allowed.');
		}

		answer.content = content;

		await this.answersRepository.save(answer);

		return right({ answer });
	}
}

interface EditAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string;
}

type EditAnswerUseCaseResponse = Either<string, { answer: Answer }>