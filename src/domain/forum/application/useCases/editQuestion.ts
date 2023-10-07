import { Question } from '@domain/forum/enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questionsRepository';

export class EditQuestionUseCase {
	constructor(
    private questionsRepository: QuestionsRepository
	) {}

	async execute({ 
		authorId,
		questionId,
		title,
		content
	}: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
		const question = await this.questionsRepository.findById(questionId);

		if (!question) {
			throw new Error('No question with this id was found.');
		}

		if (authorId !== question.authorId.toString()) {
			throw new Error('Not allowed.');
		}

		question.title = title;
		question.content = content;

		await this.questionsRepository.save(question);

		return {
			question
		};
	}
}

interface EditQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  title: string;
  content: string;
}

interface EditQuestionUseCaseResponse {
  question: Question;
}