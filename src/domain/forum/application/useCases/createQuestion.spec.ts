import { CreateQuestionUseCase } from './createQuestion';
import { InMemoryQuestionsRepository } from '__tests__/repositories/inMemoryQuestionsRepository';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CreateQuestionUseCase;

describe('Create Question', () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
		sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
	});
	it('should be able to create a new question', async () => {
		const result = await sut.execute({
			authorId: 'abdce',
			title: 'Nova pergunta',
			content: 'Conteudo da pergunta'
		});
  
		expect(result.isRight()).toBe(true);
		expect(inMemoryQuestionsRepository.questions[0]).toEqual(result.value?.question);
	});
});