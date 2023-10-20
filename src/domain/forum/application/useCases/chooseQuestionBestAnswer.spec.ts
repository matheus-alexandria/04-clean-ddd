import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { ChooseQuestionBestAnswerUseCase } from './chooseQuestionBestAnswer';
import { InMemoryAnswersRepository } from '__tests__/repositories/inMemoryAnswersRepository';
import { InMemoryQuestionsRepository } from '@test/repositories/inMemoryQuestionsRepository';
import { ResourceNotFoundError } from './errors/resourceNotFoundError';
import { NotAllowedError } from './errors/notAllowedError';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: ChooseQuestionBestAnswerUseCase;

describe('Choose Question best Answer', () => {
	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository();
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
		sut = new ChooseQuestionBestAnswerUseCase(inMemoryQuestionsRepository, inMemoryAnswersRepository);
	});

	it('should be able to choose a question best answer', async () => {
		const newQuestion = inMemoryQuestionsRepository.factory();
		const answer = inMemoryAnswersRepository.factory(
			{ questionId: newQuestion.id },
			new UniqueEntityID('answer-1')
		);
		await sut.execute({
			authorId: newQuestion.authorId.toString(),
			answerId: answer.id.toString(),
		});
  
		expect(inMemoryQuestionsRepository.questions[0].bestAnswerId).toEqual(answer.id);
	});

	it('should not be able to choose best answer if answer does not exist', async () => {
		const result = await sut.execute({
			authorId: 'author-2',
			answerId: 'answer-1',
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able to choose best answer if question does not exist', async () => {
		inMemoryAnswersRepository.factory(
			{ authorId: new UniqueEntityID('author-1') },
			new UniqueEntityID('answer-1')
		);
		const result = await sut.execute({
			authorId: 'author-2',
			answerId: 'answer-1',
		});
		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able to choose best answer if question author is wrong', async () => {
		const newQuestion = inMemoryQuestionsRepository.factory({
			authorId: new UniqueEntityID('author-1')
		});
		const answer = inMemoryAnswersRepository.factory(
			{ questionId: newQuestion.id }
		);
		const result = await sut.execute({
			authorId: 'author-2',
			answerId: answer.id.toString(),
		});
		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(NotAllowedError);
	});
});