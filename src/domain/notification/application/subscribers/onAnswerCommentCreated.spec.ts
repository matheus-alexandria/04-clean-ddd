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
import { OnAnswerCommentCreated } from './onAnswerCommentCreated';
import { InMemoryAnswerCommentsRepository } from '@test/repositories/inMemoryAnswerCommentsRepository';

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sendNotificationUseCase: SendNotificationUseCase;

let sendNotificationExecuteSpyOn: SpyInstance<
  [SendNotificationUseCaseRequest],
  Promise<SendNotificationUseCaseResponse>
>;

describe('On Answer Comment Created', () => {
	beforeEach(() => {
		inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository();
		inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository);
		inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
		inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository();
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository);
		inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
		sendNotificationUseCase = new SendNotificationUseCase(inMemoryNotificationsRepository);

		sendNotificationExecuteSpyOn = vi.spyOn(sendNotificationUseCase, 'execute');

		new OnAnswerCommentCreated(inMemoryAnswersRepository, sendNotificationUseCase);
	});

	it('should send a notification when a comment was made in a answer', async () => {
		const question = inMemoryQuestionsRepository.factory();
		const answer = inMemoryAnswersRepository.factory({ questionId: question.id });
		const answerComment = inMemoryAnswerCommentsRepository.factory({ answerId: answer.id });

		await waitFor(() => {
			expect(sendNotificationExecuteSpyOn).toHaveBeenCalled();
		});
	});
});