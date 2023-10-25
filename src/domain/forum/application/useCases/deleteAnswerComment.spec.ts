import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { DeleteAnswerCommentUseCase } from './deleteAnswerComment';
import { InMemoryAnswerCommentsRepository } from '__tests__/repositories/inMemoryAnswerCommentsRepository';
import { NotAllowedError } from '@core/errors/httpErrors/notAllowedError';

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: DeleteAnswerCommentUseCase;

describe('Delete Answer Comment', () => {
	beforeEach(() => {
		inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
		sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository);
	});
	it('should be able to delete a answer comment', async () => {
		const answerComment = inMemoryAnswerCommentsRepository.factory();
		await sut.execute({
			authorId: answerComment.authorId.toString(),
			answerCommentId: answerComment.id.toString(),
		});
  
		expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0);
	});

	it('should not be able to delete answer comment from different author', async () => {
		const answerComment = inMemoryAnswerCommentsRepository.factory(
			{ authorId: new UniqueEntityID('author-1')}
		);
		const result = await sut.execute({
			authorId: 'author-2',
			answerCommentId: answerComment.id.toString(),
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(NotAllowedError);
	});
});