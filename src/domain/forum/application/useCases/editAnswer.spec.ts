import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { EditAnswerUseCase } from './editAnswer';
import { InMemoryAnswersRepository } from '__tests__/repositories/inMemoryAnswersRepository';
import { NotAllowedError } from '@core/errors/errors/notAllowedError';
import { InMemoryAnswerAttachmentsRepository } from '@test/repositories/inMemoryAnswerAttachmentsRepository';
import { AnswerAttachmentList } from '@domain/forum/enterprise/entities/answerAttachmentList';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let sut: EditAnswerUseCase;

describe('Edit Answer', () => {
	beforeEach(() => {
		inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository();
		inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository);
		sut = new EditAnswerUseCase(inMemoryAnswersRepository, inMemoryAnswerAttachmentsRepository);
	});
	it('should be able to edit a answer', async () => {
		const attachment = inMemoryAnswerAttachmentsRepository.factory();
		inMemoryAnswersRepository.factory(
			{ 
				authorId: new UniqueEntityID('author-1'),
				attachments: new AnswerAttachmentList([attachment])
			}, 
			new UniqueEntityID('answer-1')
		);
		const result = await sut.execute({
			authorId: 'author-1',
			answerId: 'answer-1',
			content: 'New updated content',
			attachmentIds: ['2', '3']
		});
    
		expect(result.isRight()).toBe(true);
		if (result.isRight()) {
			expect(result.value.answer.attachments.getItems()).toHaveLength(2);
			expect(inMemoryAnswersRepository.answers[0].attachments.getItems()).toEqual([
				expect.objectContaining({ attachmentId: new UniqueEntityID('2') }),
				expect.objectContaining({ attachmentId: new UniqueEntityID('3') })
			]);
		}
	});

	it('should not be able to edit a answer from different author', async () => {
		inMemoryAnswersRepository.factory(
			{ authorId: new UniqueEntityID('author-1')}, 
			new UniqueEntityID('answer-1')
		);
		const result = await sut.execute({
			authorId: 'author-2',
			answerId: 'answer-1',
			content: 'New updated content',
			attachmentIds: ['1']
		});  

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(NotAllowedError);
	});
});