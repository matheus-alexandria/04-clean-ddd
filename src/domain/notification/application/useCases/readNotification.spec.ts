import { InMemoryNotificationsRepository } from '@test/repositories/inMemoryNotificationsRepository';
import { ReadNotificationUseCase } from './readNotification';
import { NotAllowedError } from '@core/errors/errors/notAllowedError';

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sut: ReadNotificationUseCase;

describe('Read Notification', () => {
	beforeEach(() => {
		inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
		sut = new ReadNotificationUseCase(inMemoryNotificationsRepository);
	});

	it('should be able to read notification', async () => {
		const notification = inMemoryNotificationsRepository.factory();
		const result = await sut.execute({
			notificationId: notification.id.toString(),
			recipientId: notification.recipientId.toString()
		});

		expect(result.isRight()).toBe(true);
		expect(result.value).toEqual({ notification });
		expect(inMemoryNotificationsRepository.notifications[0].readAt).toEqual(expect.any(Date));
	});

	it('should not be able to read notification from different recipient', async () => {
		const notification = inMemoryNotificationsRepository.factory();
		const result = await sut.execute({
			notificationId: notification.id.toString(),
			recipientId: '1'
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(NotAllowedError);
	});
});