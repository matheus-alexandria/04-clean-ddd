import { InMemoryQuestionsRepository } from '__tests__/repositories/inMemoryQuestionsRepository';
import { GetQuestionBySlugUseCase } from './getQuestionBySlug';
import { ResourceNotFoundError } from '@core/errors/errors/resourceNotFoundError';
import { InMemoryQuestionAttachmentsRepository } from '@test/repositories/inMemoryQuestionAttachmentsRepository';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let sut: GetQuestionBySlugUseCase;

describe('Get Question by slug', () => {
	beforeEach(() => {
		inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository();
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository);
		sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
	});
	it('should be able to get a question by the slug', async () => {
		inMemoryQuestionsRepository.factory({
			title: 'Great question'
		});

		const result = await sut.execute({
			slug: 'great-question'
		});
  
		expect(result.isRight()).toBe(true);
		if (result.isRight()) {
			expect(result.value.question.title).toEqual('Great question');
		}
		
	});

	it('should throw an error if there is no question with the given slug', async () => {
		const result = await sut.execute({
			slug: 'unexistent-question'
		});
		await expect(result.isLeft()).toBe(true);
		await expect(result.value).toBeInstanceOf(ResourceNotFoundError);
	});
});