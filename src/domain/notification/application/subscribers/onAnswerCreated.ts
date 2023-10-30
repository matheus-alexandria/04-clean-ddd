import { DomainEvents } from '@core/events/domainEvents';
import { EventHandler } from '@core/events/eventHandler';
import { QuestionsRepository } from '@domain/forum/application/repositories/questionsRepository';
import { AnswerCreatedEvent } from '@domain/forum/enterprise/entities/answerCreatedEvent';
import { SendNotificationUseCase } from '../useCases/sendNotification';

export class OnAnswerCreated implements EventHandler {
	constructor(
    private questionsRepository: QuestionsRepository,
    private sendNotification: SendNotificationUseCase
	) {
		this.setupSubscriptions();
	}

	setupSubscriptions(): void {
		DomainEvents.register(
			this.sendNewAnswerNotification.bind(this),
			AnswerCreatedEvent.name
		);
	}

	private async sendNewAnswerNotification({ answer }: AnswerCreatedEvent) {
		const question = await this.questionsRepository.findById(answer.questionId.toString());

		if (question) {
			this.sendNotification.execute({
				recipientId: answer.questionId.toString(),
				title: `Nova resposta em ${answer.content.substring(0, 40).concat('...')}`,
				content: answer.excerpt
			});
		}
	}
}