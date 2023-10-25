import { Either, right } from '@core/either';
import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { Notification } from '@domain/notification/enterprise/entities/notification';
import { NotificationsRepository } from '../repositories/notificationsRepository';

export class SendNotificationUseCase {
	constructor(
    private notificationsRepository: NotificationsRepository
	) {}

	async execute({ 
		recipientId,
		content,
		title
	}: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {
		const notification = Notification.create({
			content,
			title,
			recipientId: new UniqueEntityID(recipientId)
		});

		await this.notificationsRepository.create(notification);

		return right({
			notification
		});
	}
}

interface SendNotificationUseCaseRequest {
  recipientId: string;
  title: string;
  content: string;
}

type SendNotificationUseCaseResponse = Either<null, { notification: Notification }>