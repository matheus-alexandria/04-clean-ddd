import { expect, it } from 'vitest';
import { AnswerQuestionUseCase } from './answerQuestion';

it('should be able to create an answer', () => {
  const answerQuestionUseCase = new AnswerQuestionUseCase();

  const answer = answerQuestionUseCase.execute({
    instructorId: '1',
    questionId: '1',
    content: 'Nova resposta'
  });

  expect(answer.content).toEqual('Nova resposta');
});