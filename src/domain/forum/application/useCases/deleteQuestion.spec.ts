import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { DeleteQuestionUseCase } from './deleteQuestion';
import { InMemoryQuestionsRepository } from '__tests__/repositories/inMemoryQuestionsRepository';
import { NotAllowedError } from '@core/errors/errors/notAllowedError';
import { InMemoryQuestionAttachmentsRepository } from '@test/repositories/inMemoryQuestionAttachmentsRepository';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let sut: DeleteQuestionUseCase;

describe('Delete Question', () => {
	beforeEach(() => {
		inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository();
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository);
		sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository);
	});
	it('should be able to delete a question', async () => {
		const question = inMemoryQuestionsRepository.factory(
			{ authorId: new UniqueEntityID('author-1')}, 
			new UniqueEntityID('question-1')
		);

		inMemoryQuestionAttachmentsRepository.factory({
			questionId: question.id
		});

		inMemoryQuestionAttachmentsRepository.factory({
			questionId: question.id
		});

		await sut.execute({
			authorId: 'author-1',
			questionId: 'question-1',
		});
  
		expect(inMemoryQuestionsRepository.questions).toHaveLength(0);
		expect(inMemoryQuestionAttachmentsRepository.attachments).toHaveLength(0);
	});

	it('should not be able to delete a question from different author', async () => {
		inMemoryQuestionsRepository.factory(
			{ authorId: new UniqueEntityID('author-1')}, 
			new UniqueEntityID('question-1')
		);
		const result = await sut.execute({
			authorId: 'author-2',
			questionId: 'question-1',
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(NotAllowedError);
	});
});