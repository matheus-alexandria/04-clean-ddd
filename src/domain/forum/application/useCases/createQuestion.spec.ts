import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { CreateQuestionUseCase } from './createQuestion';
import { InMemoryQuestionsRepository } from '__tests__/repositories/inMemoryQuestionsRepository';
import { InMemoryQuestionAttachmentsRepository } from '@test/repositories/inMemoryQuestionAttachmentsRepository';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let sut: CreateQuestionUseCase;

describe('Create Question', () => {
	beforeEach(() => {
		inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository();
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository);
		sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
	});
	it('should be able to create a new question', async () => {
		const result = await sut.execute({
			authorId: 'abdce',
			title: 'Nova pergunta',
			content: 'Conteudo da pergunta',
			attachmentsIds: ['1', '2']
		});
  
		expect(result.isRight()).toBe(true);
		expect(inMemoryQuestionsRepository.questions[0]).toEqual(result.value?.question);
		expect(inMemoryQuestionsRepository.questions[0].attachments.getItems()).toHaveLength(2);
		expect(inMemoryQuestionsRepository.questions[0].attachments.getItems()).toEqual([
			expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
			expect.objectContaining({ attachmentId: new UniqueEntityID('2') })
		]);
	});
});