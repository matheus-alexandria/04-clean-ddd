import { InMemoryAnswersRepository } from '@test/repositories/inMemoryAnswersRepository';
import { AnswerQuestionUseCase } from './answerQuestion';
import { UniqueEntityID } from '@core/entities/uniqueEntityId';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe('Answer Question', () => {
	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository();
		sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
	});
	it('should be able to answer a question', async () => {
		const result = await sut.execute({
			instructorId: '1',
			questionId: '1',
			content: 'Resposta da pergunta',
			attachmentIds: ['1', '2']
		});
  
		expect(result.isRight()).toBe(true);
		expect(inMemoryAnswersRepository.answers[0].attachments.getItems()).toHaveLength(2);
		expect(inMemoryAnswersRepository.answers[0].attachments.getItems()).toEqual([
			expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
			expect.objectContaining({ attachmentId: new UniqueEntityID('2') })
		]);
		if (result.isRight()) {
			expect(inMemoryAnswersRepository.answers[0]).toEqual(result.value.answer);
		}
	});
});