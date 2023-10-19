import { Question } from '@domain/forum/enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questionsRepository';
import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { Either, right } from '@core/either';

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

		return right({
			question
		});
	}
}

interface CreateQuestionUseCaseRequest {
  authorId: string;
  title: string;
  content: string;
}

type CreateQuestionUseCaseResponse = Either<null, { question: Question }>;