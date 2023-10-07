import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { AnswersRepository } from '@domain/forum/application/repositories/answersRepository';
import { Answer, AnswerProps } from '@domain/forum/enterprise/entities/answer';
import { faker } from '@faker-js/faker';

export class InMemoryAnswersRepository implements AnswersRepository {
	public answers: Answer[] = [];
	async findById(id: string): Promise<Answer | null> {
		const answer = this.answers.find((answer) => answer.id.toString() === id);

		if (!answer) {
			return null;
		}

		return answer;
	}

	async create(answer: Answer): Promise<void> {
		this.answers.push(answer);
	}

	async delete(answer: Answer): Promise<void> {
		const answerIndex = this.answers.findIndex((value) => value.id === answer.id);

		this.answers.splice(answerIndex, 1);
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