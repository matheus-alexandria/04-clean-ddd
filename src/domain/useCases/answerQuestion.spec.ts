import { expect, it } from 'vitest';
import { AnswerQuestionUseCase } from './answerQuestion';
import { AnswersRepository } from '../repositories/answersRepository';
import { Answer } from '../entities/answer';

const fakeAnswersRepository: AnswersRepository = {
  create: async (answer: Answer): Promise<void> => {
    return;
  }
}

it('should be able to create an answer', async () => {
  const answerQuestionUseCase = new AnswerQuestionUseCase(fakeAnswersRepository);

  const answer = await answerQuestionUseCase.execute({
    instructorId: '1',
    questionId: '1',
    content: 'Nova resposta'
  });

  expect(answer.content).toEqual('Nova resposta');
});