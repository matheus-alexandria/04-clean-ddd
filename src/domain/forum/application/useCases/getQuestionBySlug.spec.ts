import { InMemoryQuestionsRepository } from '__tests__/repositories/inMemoryQuestionsRepository';
import { GetQuestionBySlugUseCase } from './getQuestionBySlug';
import { Question } from '@domain/forum/enterprise/entities/question';
import { UniqueEntityID } from '@core/entities/uniqueEntityId';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugUseCase;

describe('Get Question by slug', () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
		sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
	});
	it('should be able to get a question by the slug', async () => {
		const newQuestion = Question.create({
			authorId: new UniqueEntityID('abdce'),
			title: 'Great question',
			content: 'Not what you use for the slug'
		});
		await inMemoryQuestionsRepository.create(newQuestion);

		const { question } = await sut.execute({
			slug: 'great-question'
		});
  
		expect(question.title).toEqual('Great question');
	});
});