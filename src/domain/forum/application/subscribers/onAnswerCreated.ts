import { DomainEvents } from '@core/events/domainEvents';
import { EventHandler } from '@core/events/eventHandler';
import { AnswerCreatedEvent } from '@domain/forum/enterprise/entities/answerCreatedEvent';

export class OnAnswerCreated implements EventHandler {
	constructor() {
		this.setupSubscriptions();
	}

	setupSubscriptions(): void {
		DomainEvents.register(
			this.sendNewAnswerNotification.bind(this),
			AnswerCreatedEvent.name
		);
	}

	private sendNewAnswerNotification({ answer }: AnswerCreatedEvent) {
		console.log(answer);
	}
}