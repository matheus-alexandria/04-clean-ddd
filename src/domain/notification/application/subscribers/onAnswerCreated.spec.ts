import { InMemoryAnswerAttachmentsRepository } from '@test/repositories/inMemoryAnswerAttachmentsRepository';
import { InMemoryAnswersRepository } from '@test/repositories/inMemoryAnswersRepository';
import { OnAnswerCreated } from './onAnswerCreated';
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

describe('On Answer Created', () => {
	beforeEach(() => {
		inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository();
		inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository);
		inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository();
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository);
		inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
		sendNotificationUseCase = new SendNotificationUseCase(inMemoryNotificationsRepository);

		sendNotificationExecuteSpyOn = vi.spyOn(sendNotificationUseCase, 'execute');

		new OnAnswerCreated(inMemoryQuestionsRepository, sendNotificationUseCase);
	});

	it('should send a notification when an answer is created', async () => {
		const question = inMemoryQuestionsRepository.factory();
		inMemoryAnswersRepository.factory({ questionId: question.id });

		await waitFor(() => {
			expect(sendNotificationExecuteSpyOn).toHaveBeenCalled();
		});
	});
});