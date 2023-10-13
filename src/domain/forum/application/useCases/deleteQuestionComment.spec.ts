import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { DeleteQuestionCommentUseCase } from './deleteQuestionComment';
import { InMemoryQuestionCommentsRepository } from '__tests__/repositories/inMemoryQuestionCommentsRepository';

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: DeleteQuestionCommentUseCase;

describe('Delete Question Comment', () => {
	beforeEach(() => {
		inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository();
		sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository);
	});
	it('should be able to delete a question comment', async () => {
		const questionComment = inMemoryQuestionCommentsRepository.factory();
		await sut.execute({
			authorId: questionComment.authorId.toString(),
			questionCommentId: questionComment.id.toString(),
		});
  
		expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0);
	});

	it('should not be able to delete question comment from different author', async () => {
		const questionComment = inMemoryQuestionCommentsRepository.factory(
			{ authorId: new UniqueEntityID('author-1')}
		);
  
		await expect(
			sut.execute({
				authorId: 'author-2',
				questionCommentId: questionComment.id.toString(),
			})
		).rejects.toThrowError();
	});
});