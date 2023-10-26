import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { NotificationsRepository } from '@domain/notification/application/repositories/notificationsRepository';
import { Notification, NotificationProps } from '@domain/notification/enterprise/entities/notification';
import { faker } from '@faker-js/faker';

export class InMemoryNotificationsRepository implements NotificationsRepository {
	public notifications: Notification[] = [];
	
	async findById(notificationId: string): Promise<Notification | null> {
		const notification = this.notifications.find((item) => item.id.toString() === notificationId);

		if (!notification) {
			return null;
		}

		return notification;
	}

	async create(notification: Notification): Promise<void> {
		this.notifications.push(notification);
	}

	async save(notification: Notification): Promise<void> {
		const notificationIndex = this.notifications.findIndex((item) => notification.id === item.id);

		this.notifications[notificationIndex] = notification;
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