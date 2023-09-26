import { Question } from '@domain/forum/enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questionsRepository';
import { UniqueEntityID } from '@core/entities/uniqueEntityId';

export class CreateQuestionUseCase {
	constructor(
    private questionsRepository: QuestionsRepository
	) {}

	async execute({ 
		authorId,
		title,
		content 
	}: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
		const question = Question.create({
			authorId: new UniqueEntityID(authorId),
			title,
			content
		});

		await this.questionsRepository.create(question);

		return {
			question
		};
	}
}

interface CreateQuestionUseCaseRequest {
  authorId: string;
  title: string;
  content: string;
}

interface CreateQuestionUseCaseResponse {
  question: Question; 
}