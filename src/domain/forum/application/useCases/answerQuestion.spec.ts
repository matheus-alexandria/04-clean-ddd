import { UniqueEntityID } from '@core/entities/uniqueEntityId';
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
		const answer = await sut.execute({
			instructorId: '1',
			questionId: '1',
			content: 'Resposta da pergunta'
		});
  
		expect(answer.content).toEqual('Resposta da pergunta');
		expect(answer.authorId).toBeInstanceOf(UniqueEntityID);
		expect(inMemoryAnswersRepository.answers[0].id).toEqual(answer.id);
	});
});