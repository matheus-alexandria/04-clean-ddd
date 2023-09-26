import { Question } from '@domain/forum/enterprise/entities/question';
import { CreateQuestionUseCase } from './createQuestion';
import { QuestionsRepository } from '../repositories/questionsRepository';

const fakeQuestionsRepository: QuestionsRepository = {
	create: async (question: Question): Promise<void> => {
		return;
	}
};

it('should be able to create a new question', async () => {
	const createQuestionnUseCase = new CreateQuestionUseCase(fakeQuestionsRepository);

	const { question } = await createQuestionnUseCase.execute({
		authorId: 'abdce',
		title: 'Nova pergunta',
		content: 'Conteudo da pergunta'
	});

	expect(question.title).toEqual('Nova pergunta');
});