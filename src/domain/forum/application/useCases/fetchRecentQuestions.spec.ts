import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { FetchRecentQuestionsUseCase } from './fetchRecentQuestions';
import { InMemoryQuestionsRepository } from '__tests__/repositories/inMemoryQuestionsRepository';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: FetchRecentQuestionsUseCase;

describe('Fetch recent Questions', () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
		sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository);
	});
	it('should be able to fetch created questions', async () => {
		inMemoryQuestionsRepository.factory(
			{
				createdAt: new Date(2023, 5, 10),
				content: 'Old question'
			}, 
			new UniqueEntityID('question-1')
		);
		inMemoryQuestionsRepository.factory(
			{
				createdAt: new Date(2023, 8, 10),
				content: 'Recent question'
			}
			, new UniqueEntityID('question-2')
		);

		const result = await sut.execute({
			page: 1
		});
		expect(result.value?.questions).toHaveLength(2);
		expect(result.value?.questions).toEqual([
			expect.objectContaining({ content: 'Recent question'}),
			expect.objectContaining({ content: 'Old question'})
		]);
	});

	it('should be able to fetch questions with pagination', async () => {
		for (let i = 0; i < 22; i++) {
			inMemoryQuestionsRepository.factory();
		}

		const result = await sut.execute({
			page: 2
		});
  
		expect(result.value?.questions).toHaveLength(2);
	});
});