import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { QuestionsRepository } from '@domain/forum/application/repositories/questionsRepository';
import { Question, QuestionProps } from '@domain/forum/enterprise/entities/question';

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

	factory(override: Partial<QuestionProps> = {}) {
		const question = Question.create({
			authorId: new UniqueEntityID(),
			title: 'Any question',
			content: 'Any content for this factory question',
			...override
		});

		this.questions.push(question);
  
		return question;
	}
}