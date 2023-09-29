import { CreateQuestionUseCase } from './createQuestion';
import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { InMemoryQuestionsRepository } from '__tests__/repositories/inMemoryQuestionsRepository';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CreateQuestionUseCase;

describe('Create Question', () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
		sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
	});
	it('should be able to create a new question', async () => {
		const { question } = await sut.execute({
			authorId: 'abdce',
			title: 'Nova pergunta',
			content: 'Conteudo da pergunta'
		});
  
		expect(question.title).toEqual('Nova pergunta');
		expect(question.id).toBeInstanceOf(UniqueEntityID);
		expect(inMemoryQuestionsRepository.questions[0].id).toEqual(question.id);
	});
});