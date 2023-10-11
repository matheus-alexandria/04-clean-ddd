import { CommentOnQuestionUseCase } from './commentOnQuestion';
import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { InMemoryQuestionCommentsRepository } from '@test/repositories/inMemoryQuestionCommentsRepository';
import { InMemoryQuestionsRepository } from '__tests__/repositories/inMemoryQuestionsRepository';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: CommentOnQuestionUseCase;

describe('Create Question Comment', () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
		inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository();
		sut = new CommentOnQuestionUseCase(inMemoryQuestionsRepository, inMemoryQuestionCommentsRepository);
	});
	it('should be able to create a comment on a question', async () => {
		const question = inMemoryQuestionsRepository.factory();
		const { questionComment } = await sut.execute({
			authorId: 'abdce',
			questionId: question.id.toString(),
			content: 'Comment content'
		});
  
		expect(questionComment.id).toBeInstanceOf(UniqueEntityID);
		expect(inMemoryQuestionCommentsRepository.items[0].questionId).toEqual(question.id);
	});
});