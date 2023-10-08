import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { PaginationParams } from '@core/repositories/PaginationParams';
import { QuestionsRepository } from '@domain/forum/application/repositories/questionsRepository';
import { Question, QuestionProps } from '@domain/forum/enterprise/entities/question';
import { faker } from '@faker-js/faker';

export class InMemoryQuestionsRepository implements QuestionsRepository {
	public questions: Question[] = [];
  
	async findById(id: string): Promise<Question | null> {
		const question = this.questions.find((question) => question.id.toString() === id);

		if (!question) {
			return null;
		}

		return question;
	}
  
	async findBySlug(slug: string): Promise<Question | null> {
		const question = this.questions.find((data) => data.slug.value === slug);
    
		if (!question) {
			return null;
		}
    
		return question;
	}

	async findManyRecent({ page }: PaginationParams): Promise<Question[]> {
		const questions = this.questions
			.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
			.slice((page - 1) * 20, page * 20);
    
		return questions;
	}

	async create(question: Question): Promise<void> {
		this.questions.push(question);
	}

	factory(override: Partial<QuestionProps> = {}, id?: UniqueEntityID) {
		const question = Question.create({
			authorId: new UniqueEntityID(),
			title: faker.lorem.sentence(),
			content: faker.lorem.text(),
			...override
		}, id);

		this.questions.push(question);
    
		return question;
	}
  
	async save(question: Question): Promise<void> {
		const questionIndex = this.questions.findIndex((data) => data.id === question.id);

		this.questions[questionIndex] = question;
	}

	async delete(question: Question): Promise<void> {
		const questionIndex = this.questions.findIndex((value) => value.id === question.id);

		this.questions.splice(questionIndex, 1);
	}
}