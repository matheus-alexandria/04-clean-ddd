import { InMemoryAnswersRepository } from '@test/repositories/inMemoryAnswersRepository';
import { AnswerQuestionUseCase } from './answerQuestion';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe('Answer Question', () => {
	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository();
		sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
	});
	it('should be able to create answer a question', async () => {
		const result = await sut.execute({
			instructorId: '1',
			questionId: '1',
			content: 'Resposta da pergunta'
		});
  
		expect(result.isRight()).toBe(true);
		if (result.isRight()) {
			expect(inMemoryAnswersRepository.answers[0]).toEqual(result.value.answer);
		}
	});
});