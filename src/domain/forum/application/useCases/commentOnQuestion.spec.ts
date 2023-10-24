import { InMemoryQuestionAttachmentsRepository } from '@test/repositories/inMemoryQuestionAttachmentsRepository';
import { CommentOnQuestionUseCase } from './commentOnQuestion';
import { InMemoryQuestionCommentsRepository } from '@test/repositories/inMemoryQuestionCommentsRepository';
import { InMemoryQuestionsRepository } from '__tests__/repositories/inMemoryQuestionsRepository';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let sut: CommentOnQuestionUseCase;

describe('Create Question Comment', () => {
	beforeEach(() => {
		inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository();
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository);
		inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository();
		sut = new CommentOnQuestionUseCase(inMemoryQuestionsRepository, inMemoryQuestionCommentsRepository);
	});
	it('should be able to create a comment on a question', async () => {
		const question = inMemoryQuestionsRepository.factory();
		const result = await sut.execute({
			authorId: 'abdce',
			questionId: question.id.toString(),
			content: 'Comment content'
		});
  
		expect(result.isRight()).toBe(true);
		if (result.isRight()) {
			expect(inMemoryQuestionCommentsRepository.items[0]).toEqual(result.value.questionComment);
		}
	});
});