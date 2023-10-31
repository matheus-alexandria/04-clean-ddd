import { InMemoryAnswerAttachmentsRepository } from '@test/repositories/inMemoryAnswerAttachmentsRepository';
import { InMemoryAnswersRepository } from '@test/repositories/inMemoryAnswersRepository';
import { InMemoryQuestionsRepository } from '@test/repositories/inMemoryQuestionsRepository';
import { 
	SendNotificationUseCase,
	SendNotificationUseCaseRequest,
	SendNotificationUseCaseResponse 
} from '../useCases/sendNotification';
import { InMemoryQuestionAttachmentsRepository } from '@test/repositories/inMemoryQuestionAttachmentsRepository';
import { InMemoryNotificationsRepository } from '@test/repositories/inMemoryNotificationsRepository';
import { SpyInstance } from 'vitest';
import { waitFor } from '@test/utils/waitFor';
import { OnQuestionBestAnswerChosen } from './onQuestionBestAnswerChosen';

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sendNotificationUseCase: SendNotificationUseCase;

let sendNotificationExecuteSpyOn: SpyInstance<
  [SendNotificationUseCaseRequest],
  Promise<SendNotificationUseCaseResponse>
>;

describe('On Question Best Answer Chosen', () => {
	beforeEach(() => {
		inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository();
		inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository);
		inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository();
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository);
		inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
		sendNotificationUseCase = new SendNotificationUseCase(inMemoryNotificationsRepository);

		sendNotificationExecuteSpyOn = vi.spyOn(sendNotificationUseCase, 'execute');

		new OnQuestionBestAnswerChosen(inMemoryAnswersRepository, sendNotificationUseCase);
	});

	it('should send a notification when question has new best answer chosen', async () => {
		const question = inMemoryQuestionsRepository.factory();
		const answer = inMemoryAnswersRepository.factory({ questionId: question.id });

		question.bestAnswerId = answer.id;

		inMemoryQuestionsRepository.save(question);

		await waitFor(() => {
			expect(sendNotificationExecuteSpyOn).toHaveBeenCalled();
		});
	});
});