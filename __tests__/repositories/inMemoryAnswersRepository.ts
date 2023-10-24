import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { PaginationParams } from '@core/repositories/PaginationParams';
import { AnswersRepository } from '@domain/forum/application/repositories/answersRepository';
import { Answer, AnswerProps } from '@domain/forum/enterprise/entities/answer';
import { faker } from '@faker-js/faker';
import { InMemoryAnswerAttachmentsRepository } from './inMemoryAnswerAttachmentsRepository';

export class InMemoryAnswersRepository implements AnswersRepository {
	public answers: Answer[] = [];

	constructor(
    private inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentsRepository
	) {}

	async findById(id: string): Promise<Answer | null> {
		const answer = this.answers.find((answer) => answer.id.toString() === id);

		if (!answer) {
			return null;
		}

		return answer;
	}

	async findManyByQuestionId(questionId: string, { page }: PaginationParams): Promise<Answer[]> {
		const answers = this.answers
			.filter((item) => item.questionId.toString() === questionId)
			.slice((page -1) * 20, page * 20);
    
		return answers;
	}

	async create(answer: Answer): Promise<void> {
		this.answers.push(answer);
	}

	async delete(answer: Answer): Promise<void> {
		const answerIndex = this.answers.findIndex((value) => value.id === answer.id);

		this.answers.splice(answerIndex, 1);

		this.inMemoryAnswerAttachmentRepository.deleteManyByAnswerId(answer.id.toString());
	}

	async save(answer: Answer): Promise<void> {
		const answerIndex = this.answers.findIndex((value) => value.id === answer.id);

		this.answers[answerIndex] = answer;
	}

	factory(override: Partial<AnswerProps> = {}, id?: UniqueEntityID) {
		const answer = Answer.create({
			authorId: new UniqueEntityID(),
			questionId: new UniqueEntityID(),
			content: faker.lorem.text(),
			...override
		}, id);

		this.answers.push(answer);
    
		return answer;
	}
}