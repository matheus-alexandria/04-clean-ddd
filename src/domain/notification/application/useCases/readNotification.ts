import { Either, left, right } from '@core/either';
import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { Notification } from '@domain/notification/enterprise/entities/notification';
import { NotificationsRepository } from '../repositories/notificationsRepository';
import { ResourceNotFoundError } from '@core/errors/errors/resourceNotFoundError';
import { NotAllowedError } from '@core/errors/errors/notAllowedError';

export class ReadNotificationUseCase {
	constructor(
    private notificationsRepository: NotificationsRepository
	) {}

	async execute({ 
		notificationId,
		recipientId
	}: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {
		const notification = await this.notificationsRepository.findById(notificationId);

		if (!notification) {
			return left(new ResourceNotFoundError());
		}

		if (notification.recipientId.toString() !== recipientId) {
			return left(new NotAllowedError());
		}

		notification.read();

		await this.notificationsRepository.save(notification);

		return right({
			notification
		});
	}
}

interface ReadNotificationUseCaseRequest {
  notificationId: string;
  recipientId: string;
}

type ReadNotificationUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, { notification: Notification }>