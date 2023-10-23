import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { EditQuestionUseCase } from './editQuestion';
import { InMemoryQuestionsRepository } from '__tests__/repositories/inMemoryQuestionsRepository';
import { NotAllowedError } from './errors/notAllowedError';
import { InMemoryQuestionAttachmentsRepository } from '@test/repositories/inMemoryQuestionAttachmentsRepository';
import { QuestionAttachmentList } from '@domain/forum/enterprise/entities/questionAttachmentList';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let sut: EditQuestionUseCase;

describe('Edit Question', () => {
	beforeEach(() => {
		inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository();
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository);
		sut = new EditQuestionUseCase(inMemoryQuestionsRepository, inMemoryQuestionAttachmentsRepository);
	});
	it('should be able to edit a question', async () => {
		const attachment = inMemoryQuestionAttachmentsRepository.factory();
		inMemoryQuestionsRepository.factory(
			{ 
				authorId: new UniqueEntityID('author-1'),
				attachments: new QuestionAttachmentList([attachment])
			}, 
			new UniqueEntityID('question-1')
		);
		const result = await sut.execute({
			authorId: 'author-1',
			questionId: 'question-1',
			title: 'New title',
			content: 'New updated content',
			attachmentIds: ['2', '3']
		});
    
		expect(result.isRight()).toBe(true);
		expect(inMemoryQuestionsRepository.questions[0].slug.value).toEqual('new-title');
		if (result.isRight()) {
			expect(result.value.question.attachments.getItems()).toHaveLength(2);
			expect(inMemoryQuestionsRepository.questions[0].attachments.getItems()).toEqual([
				expect.objectContaining({ attachmentId: new UniqueEntityID('2') }),
				expect.objectContaining({ attachmentId: new UniqueEntityID('3') })
			]);
		}
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
			content: 'New updated content',
			attachmentIds: ['1']
		});  

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(NotAllowedError);
	});
});