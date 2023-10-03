import { Question } from '@domain/forum/enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questionsRepository';

export class DeleteQuestionUseCase {
	constructor(
    private questionsRepository: QuestionsRepository
	) {}

	async execute({ 
		authorId,
		questionId
	}: DeleteQuestionUseCaseRequest): Promise<void> {
		const question = await this.questionsRepository.findById(questionId);

		if (!question) {
			throw new Error('No question with this id was found.');
		}

		if (authorId !== question.authorId.toString()) {
			throw new Error('Not allowed.');
		}

		await this.questionsRepository.delete(question);
	}
}

interface DeleteQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
}