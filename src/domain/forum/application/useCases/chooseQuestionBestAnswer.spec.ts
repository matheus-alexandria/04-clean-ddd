import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { ChooseQuestionBestAnswerUseCase } from './chooseQuestionBestAnswer';
import { InMemoryAnswersRepository } from '__tests__/repositories/inMemoryAnswersRepository';
import { InMemoryQuestionsRepository } from '@test/repositories/inMemoryQuestionsRepository';

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
		const { question } = await sut.execute({
			authorId: newQuestion.authorId.toString(),
			answerId: answer.id.toString(),
		});
  
		expect(question.bestAnswerId?.toString()).toEqual('answer-1');
		expect(inMemoryQuestionsRepository.questions[0].bestAnswerId).toEqual(answer.id);
	});

	it('should not be able to choose best answer if answer does not exist', async () => {
		await expect(
			sut.execute({
				authorId: 'author-2',
				answerId: 'answer-1',
			})
		).rejects.toBeInstanceOf(Error);
	});

	it('should not be able to choose best answer if question does not exist', async () => {
		inMemoryAnswersRepository.factory(
			{ authorId: new UniqueEntityID('author-1') },
			new UniqueEntityID('answer-1')
		);
		await expect(
			sut.execute({
				authorId: 'author-1',
				answerId: 'answer-1',
			})
		).rejects.toBeInstanceOf(Error);
	});

	it('should not be able to choose best answer if question author is wrong', async () => {
		const newQuestion = inMemoryQuestionsRepository.factory({
			authorId: new UniqueEntityID('author-1')
		});
		const answer = inMemoryAnswersRepository.factory(
			{ questionId: newQuestion.id }
		);
		await expect(
			sut.execute({
				authorId: 'author-2',
				answerId: answer.id.toString(),
			})
		).rejects.toBeInstanceOf(Error);
	});
});