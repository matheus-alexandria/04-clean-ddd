import { InMemoryAnswerAttachmentsRepository } from '@test/repositories/inMemoryAnswerAttachmentsRepository';
import { CommentOnAnswerUseCase } from './commentOnAnswer';
import { InMemoryAnswerCommentsRepository } from '@test/repositories/inMemoryAnswerCommentsRepository';
import { InMemoryAnswersRepository } from '__tests__/repositories/inMemoryAnswersRepository';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let sut: CommentOnAnswerUseCase;

describe('Create Answer Comment', () => {
	beforeEach(() => {
		inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository();
		inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository);
		inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
		sut = new CommentOnAnswerUseCase(inMemoryAnswersRepository, inMemoryAnswerCommentsRepository);
	});
	it('should be able to create a comment on a answer', async () => {
		const answer = inMemoryAnswersRepository.factory();
		const result = await sut.execute({
			authorId: 'abdce',
			answerId: answer.id.toString(),
			content: 'Comment content'
		});
  
		expect(result.isRight()).toBe(true);
		if (result.isRight()) {
			expect(inMemoryAnswerCommentsRepository.items[0]).toEqual(result.value.answerComment);
		}
	});
});