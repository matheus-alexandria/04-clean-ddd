import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { FetchQuestionAnswersUseCase } from './fetchQuestionAnswers';
import { InMemoryAnswersRepository } from '@test/repositories/inMemoryAnswersRepository';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: FetchQuestionAnswersUseCase;

describe('Fetch Question Answers', () => {
	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository();
		sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository);
	});
	it('should be able to fetch answers from a question', async () => {
		inMemoryAnswersRepository.factory(
			{ questionId: new UniqueEntityID('question-1'), content: 'answer first' }
		);
		inMemoryAnswersRepository.factory(
			{ questionId: new UniqueEntityID('question-1'), content: 'answer second...' }
		);

		const result = await sut.execute({
			questionId: 'question-1',
			page: 1
		});

		expect(result.value?.answers).toHaveLength(2);
		expect(result.value?.answers).toEqual([
			expect.objectContaining({ content: 'answer first'}),
			expect.objectContaining({ content: 'answer second...'})
		]);
	});

	it('should be able to fetch answers with pagination', async () => {
		for (let i = 0; i < 22; i++) {
			inMemoryAnswersRepository.factory(
				{ questionId: new UniqueEntityID('question-1') }
			);
		}

		const result = await sut.execute({
			questionId: 'question-1',
			page: 2
		});
  
		expect(result.value?.answers).toHaveLength(2);
	});
});