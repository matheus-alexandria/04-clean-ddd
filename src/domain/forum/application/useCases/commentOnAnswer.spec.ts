import { CommentOnAnswerUseCase } from './commentOnAnswer';
import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { InMemoryAnswerCommentsRepository } from '@test/repositories/inMemoryAnswerCommentsRepository';
import { InMemoryAnswersRepository } from '__tests__/repositories/inMemoryAnswersRepository';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: CommentOnAnswerUseCase;

describe('Create Answer Comment', () => {
	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository();
		inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
		sut = new CommentOnAnswerUseCase(inMemoryAnswersRepository, inMemoryAnswerCommentsRepository);
	});
	it('should be able to create a comment on a answer', async () => {
		const answer = inMemoryAnswersRepository.factory();
		const { answerComment } = await sut.execute({
			authorId: 'abdce',
			answerId: answer.id.toString(),
			content: 'Comment content'
		});
  
		expect(answerComment.id).toBeInstanceOf(UniqueEntityID);
		expect(inMemoryAnswerCommentsRepository.items[0].answerId).toEqual(answer.id);
	});
});