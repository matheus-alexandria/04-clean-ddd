import { Question } from '@domain/forum/enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questionsRepository';
import { UniqueEntityID } from '@core/entities/uniqueEntityId';

export class CreateQuestionnUseCase {
	constructor(
    private questionsRepository: QuestionsRepository
	) {}

	async execute({ 
		authorId,
		title,
		content 
	}: CreateQuestionnUseCaseRequest): Promise<CreateQuestionnUseCaseResponse> {
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

interface CreateQuestionnUseCaseRequest {
  authorId: string;
  title: string;
  content: string;
}

interface CreateQuestionnUseCaseResponse {
  question: Question; 
}