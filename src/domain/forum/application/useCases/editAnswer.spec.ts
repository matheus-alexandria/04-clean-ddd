import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { EditAnswerUseCase } from './editAnswer';
import { InMemoryAnswersRepository } from '__tests__/repositories/inMemoryAnswersRepository';
import { NotAllowedError } from './errors/notAllowedError';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe('Edit Answer', () => {
	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository();
		sut = new EditAnswerUseCase(inMemoryAnswersRepository);
	});
	it('should be able to edit a answer', async () => {
		inMemoryAnswersRepository.factory(
			{ authorId: new UniqueEntityID('author-1')}, 
			new UniqueEntityID('answer-1')
		);
		await sut.execute({
			authorId: 'author-1',
			answerId: 'answer-1',
			content: 'New updated content'
		});
  
		expect(inMemoryAnswersRepository.answers[0]).toMatchObject({
			content: 'New updated content'
		});
	});

	it('should not be able to edit a answer from different author', async () => {
		inMemoryAnswersRepository.factory(
			{ authorId: new UniqueEntityID('author-1')}, 
			new UniqueEntityID('answer-1')
		);
  
		const result = await sut.execute({
			authorId: 'author-2',
			answerId: 'answer-1',
			content: 'New updated content'
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(NotAllowedError);
	});
});