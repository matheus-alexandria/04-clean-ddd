import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { DeleteQuestionUseCase } from './deleteQuestion';
import { InMemoryQuestionsRepository } from '__tests__/repositories/inMemoryQuestionsRepository';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: DeleteQuestionUseCase;

describe('Delete Question', () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
		sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository);
	});
	it('should be able to delete a question', async () => {
		inMemoryQuestionsRepository.factory(
			{ authorId: new UniqueEntityID('author-1')}, 
			new UniqueEntityID('question-1')
		);
		await sut.execute({
			authorId: 'author-1',
			questionId: 'question-1',
		});
  
		expect(inMemoryQuestionsRepository.questions).toHaveLength(0);
	});

	it('should not be able to delete a question from different author', async () => {
		inMemoryQuestionsRepository.factory(
			{ authorId: new UniqueEntityID('author-1')}, 
			new UniqueEntityID('question-1')
		);
  
		await expect(
			sut.execute({
				authorId: 'author-2',
				questionId: 'question-1',
			})
		).rejects.toThrowError();
	});
});