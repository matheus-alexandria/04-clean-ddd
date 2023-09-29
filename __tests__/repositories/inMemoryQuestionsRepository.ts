import { QuestionsRepository } from '@domain/forum/application/repositories/questionsRepository';
import { Question } from '@domain/forum/enterprise/entities/question';

export class InMemoryQuestionsRepository implements QuestionsRepository {
	public questions: Question[] = [];
	async create(question: Question): Promise<void> {
		this.questions.push(question);
	}

}