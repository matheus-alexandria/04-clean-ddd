import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { NotificationsRepository } from '@domain/notification/application/repositories/notificationsRepository';
import { Notification, NotificationProps } from '@domain/notification/enterprise/entities/notification';
import { faker } from '@faker-js/faker';

export class InMemoryNotificationsRepository implements NotificationsRepository {
	public notifications: Notification[] = [];

	async create(notification: Notification): Promise<void> {
		this.notifications.push(notification);
	}

	factory(override: Partial<NotificationProps> = {}, id?: UniqueEntityID) {
		const notification = Notification.create({
			recipientId: new UniqueEntityID(),
			title: faker.lorem.sentence(),
			content: faker.lorem.text(),
			...override
		}, id);

		this.notifications.push(notification);
    
		return notification;
	}
}