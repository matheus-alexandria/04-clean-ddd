import { Answer } from '@domain/forum/enterprise/entities/answer';
import { AnswersRepository } from '../repositories/answersRepository';

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
			throw new Error('No answer with this id was found.');
		}

		if (authorId !== answer.authorId.toString()) {
			throw new Error('Not allowed.');
		}

		answer.content = content;

		await this.answersRepository.save(answer);

		return {
			answer
		};
	}
}

interface EditAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string;
}

interface EditAnswerUseCaseResponse {
  answer: Answer;
}