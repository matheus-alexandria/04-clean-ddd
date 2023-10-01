import { InMemoryQuestionsRepository } from '__tests__/repositories/inMemoryQuestionsRepository';
import { GetQuestionBySlugUseCase } from './getQuestionBySlug';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugUseCase;

describe('Get Question by slug', () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
		sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
	});
	it('should be able to get a question by the slug', async () => {
		inMemoryQuestionsRepository.factory({
			title: 'Great question'
		});

		const { question } = await sut.execute({
			slug: 'great-question'
		});
  
		expect(question.title).toEqual('Great question');
	});
});