import { QuestionsRepository } from '@domain/forum/application/repositories/questionsRepository';
import { Question } from '@domain/forum/enterprise/entities/question';

export class InMemoryQuestionsRepository implements QuestionsRepository {
	public questions: Question[] = [];

	async findBySlug(slug: string): Promise<Question | null> {
		const question = this.questions.find((data) => data.slug.value === slug);

		if (!question) {
			return null;
		}

		return question;
	}

	async create(question: Question): Promise<void> {
		this.questions.push(question);
	}
}