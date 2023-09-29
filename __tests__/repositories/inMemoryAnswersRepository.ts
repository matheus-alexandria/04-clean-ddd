import { AnswersRepository } from '@domain/forum/application/repositories/answersRepository';
import { Answer } from '@domain/forum/enterprise/entities/answer';

export class InMemoryAnswersRepository implements AnswersRepository {
	public answers: Answer[] = [];
	async create(answer: Answer): Promise<void> {
		this.answers.push(answer);
	}
}