import { AnswerQuestionUseCase } from './answerQuestion';
import { AnswersRepository } from '../repositories/answersRepository';
import { Answer } from '../entities/answer';
import { UniqueEntityID } from '@core/entities/uniqueEntityId';

const fakeAnswersRepository: AnswersRepository = {
	create: async (answer: Answer): Promise<void> => {
		return;
	}
};

it('should be able to create an answer', async () => {
	const answerQuestionUseCase = new AnswerQuestionUseCase(fakeAnswersRepository);

	const answer = await answerQuestionUseCase.execute({
		instructorId: 'abdce',
		questionId: '12345',
		content: 'Nova resposta'
	});

	expect(answer.content).toEqual('Nova resposta');
	expect(answer.authorId).toBeInstanceOf(UniqueEntityID);
});