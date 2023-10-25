import { InMemoryNotificationsRepository } from '@test/repositories/inMemoryNotificationsRepository';
import { SendNotificationUseCase } from './sendNotification';

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sut: SendNotificationUseCase;

describe('Create Notification', () => {
	beforeEach(() => {
		inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
		sut = new SendNotificationUseCase(inMemoryNotificationsRepository);
	});

	it('should be able to send a notification', async () => {
		const result = await sut.execute({
			content: 'Notification for recipient',
			title: 'New notification',
			recipientId: '1'
		});

		expect(result.isRight()).toBe(true);
		expect(inMemoryNotificationsRepository.notifications[0]).toHaveProperty('title', 'New notification');
	});
});