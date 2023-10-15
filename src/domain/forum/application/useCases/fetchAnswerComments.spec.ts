import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { FetchAnswerCommentsUseCase } from './fetchAnswerComments';
import { InMemoryAnswerCommentsRepository } from '__tests__/repositories/inMemoryAnswerCommentsRepository';

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: FetchAnswerCommentsUseCase;

describe('Fetch Answer Comments', () => {
	beforeEach(() => {
		inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
		sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository);
	});

	it('should be able to fetch a answer comments', async () => {
		inMemoryAnswerCommentsRepository.factory({ answerId: new UniqueEntityID('answer-1') });
		inMemoryAnswerCommentsRepository.factory({ answerId: new UniqueEntityID('answer-1') });
		inMemoryAnswerCommentsRepository.factory({ answerId: new UniqueEntityID('no-fetch-answer') });

		const { answerComments } = await sut.execute(
			{
				answerId: 'answer-1',
				page: 1
			}
		);
		expect(answerComments).toHaveLength(2);
	});

	it('should be able to fetch a answer comments with pagination', async () => {
		for (let i = 0; i < 22; i++) {
			inMemoryAnswerCommentsRepository.factory({ answerId: new UniqueEntityID('answer-1') });
		}

		const { answerComments } = await sut.execute({
			answerId: 'answer-1',
			page: 2
		});
  
		expect(answerComments).toHaveLength(2);
	});
});