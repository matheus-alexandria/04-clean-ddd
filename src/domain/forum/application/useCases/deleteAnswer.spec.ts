import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { DeleteAnswerUseCase } from './deleteAnswer';
import { InMemoryAnswersRepository } from '__tests__/repositories/inMemoryAnswersRepository';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: DeleteAnswerUseCase;

describe('Delete Answer', () => {
	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository();
		sut = new DeleteAnswerUseCase(inMemoryAnswersRepository);
	});
	it('should be able to delete a answer', async () => {
		inMemoryAnswersRepository.factory(
			{ authorId: new UniqueEntityID('author-1')}, 
			new UniqueEntityID('answer-1')
		);
		await sut.execute({
			authorId: 'author-1',
			answerId: 'answer-1',
		});
  
		expect(inMemoryAnswersRepository.answers).toHaveLength(0);
	});

	it('should not be able to delete a answer from different author', async () => {
		inMemoryAnswersRepository.factory(
			{ authorId: new UniqueEntityID('author-1')}, 
			new UniqueEntityID('answer-1')
		);
  
		await expect(
			sut.execute({
				authorId: 'author-2',
				answerId: 'answer-1',
			})
		).rejects.toThrowError();
	});
});