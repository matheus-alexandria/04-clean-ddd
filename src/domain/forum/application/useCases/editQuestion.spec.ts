import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { EditQuestionUseCase } from './editQuestion';
import { InMemoryQuestionsRepository } from '__tests__/repositories/inMemoryQuestionsRepository';
import { NotAllowedError } from './errors/notAllowedError';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: EditQuestionUseCase;

describe('Edit Question', () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
		sut = new EditQuestionUseCase(inMemoryQuestionsRepository);
	});
	it('should be able to edit a question', async () => {
		inMemoryQuestionsRepository.factory(
			{ authorId: new UniqueEntityID('author-1')}, 
			new UniqueEntityID('question-1')
		);
		await sut.execute({
			authorId: 'author-1',
			questionId: 'question-1',
			title: 'New title',
			content: 'New updated content'
		});
  
		expect(inMemoryQuestionsRepository.questions[0].slug.value).toEqual('new-title');
	});

	it('should not be able to edit a question from different author', async () => {
		inMemoryQuestionsRepository.factory(
			{ authorId: new UniqueEntityID('author-1')}, 
			new UniqueEntityID('question-1')
		);
		const result = await sut.execute({
			authorId: 'author-2',
			questionId: 'question-1',
			title: 'New title',
			content: 'New updated content'
		});  

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(NotAllowedError);
	});
});