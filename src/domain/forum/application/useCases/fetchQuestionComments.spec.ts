import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { FetchQuestionCommentsUseCase } from './fetchQuestionComments';
import { InMemoryQuestionCommentsRepository } from '__tests__/repositories/inMemoryQuestionCommentsRepository';

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: FetchQuestionCommentsUseCase;

describe('Fetch Question Comments', () => {
	beforeEach(() => {
		inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository();
		sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentsRepository);
	});

	it('should be able to fetch a question comments', async () => {
		inMemoryQuestionCommentsRepository.factory({ questionId: new UniqueEntityID('question-1') });
		inMemoryQuestionCommentsRepository.factory({ questionId: new UniqueEntityID('question-1') });
		inMemoryQuestionCommentsRepository.factory({ questionId: new UniqueEntityID('no-fetch-question') });

		const { questionComments } = await sut.execute(
			{
				questionId: 'question-1',
				page: 1
			}
		);
		expect(questionComments).toHaveLength(2);
	});

	it('should be able to fetch a question comments with pagination', async () => {
		for (let i = 0; i < 22; i++) {
			inMemoryQuestionCommentsRepository.factory({ questionId: new UniqueEntityID('question-1') });
		}

		const { questionComments } = await sut.execute({
			questionId: 'question-1',
			page: 2
		});
  
		expect(questionComments).toHaveLength(2);
	});
});