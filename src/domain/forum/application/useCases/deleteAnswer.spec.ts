import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { DeleteAnswerUseCase } from './deleteAnswer';
import { InMemoryAnswersRepository } from '__tests__/repositories/inMemoryAnswersRepository';
import { NotAllowedError } from '@core/errors/errors/notAllowedError';
import { InMemoryAnswerAttachmentsRepository } from '@test/repositories/inMemoryAnswerAttachmentsRepository';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let sut: DeleteAnswerUseCase;

describe('Delete Answer', () => {
	beforeEach(() => {
		inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository();
		inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository);
		sut = new DeleteAnswerUseCase(inMemoryAnswersRepository);
	});
	it('should be able to delete a answer', async () => {
		const answer = inMemoryAnswersRepository.factory(
			{ authorId: new UniqueEntityID('author-1')}, 
			new UniqueEntityID('answer-1')
		);

		inMemoryAnswerAttachmentsRepository.factory({
			answerId: answer.id
		});

		inMemoryAnswerAttachmentsRepository.factory({
			answerId: answer.id
		});
    
		await sut.execute({
			authorId: 'author-1',
			answerId: 'answer-1',
		});
  
		expect(inMemoryAnswersRepository.answers).toHaveLength(0);
		expect(inMemoryAnswerAttachmentsRepository.attachments).toHaveLength(0);
	});

	it('should not be able to delete a answer from different author', async () => {
		inMemoryAnswersRepository.factory(
			{ authorId: new UniqueEntityID('author-1')}, 
			new UniqueEntityID('answer-1')
		);
		const result = await sut.execute({
			authorId: 'author-2',
			answerId: 'answer-1',
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(NotAllowedError);
	});
});