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

	it('should throw an error if there is no question with the given slug', async () => {
		await expect(
			sut.execute({
				slug: 'unexistent-question'
			})
		).rejects.toBeInstanceOf(Error);
	});
});