import { DomainEvents } from '@core/events/domainEvents';
import { EventHandler } from '@core/events/eventHandler';
import { AnswersRepository } from '@domain/forum/application/repositories/answersRepository';
import { SendNotificationUseCase } from '../useCases/sendNotification';
import { CommentOnAnswerEvent } from '@domain/forum/enterprise/entities/commentOnAnswerEvent';

export class OnAnswerCommentCreated implements EventHandler {
	constructor(
    private answersRepository: AnswersRepository,
    private sendNotification: SendNotificationUseCase
	) {
		this.setupSubscriptions();
	}

	setupSubscriptions(): void {
		DomainEvents.register(
			this.sendCommentOnAnswerNotification.bind(this),
			CommentOnAnswerEvent.name
		);
	}

	private async sendCommentOnAnswerNotification({ answerComment }: CommentOnAnswerEvent) {
		const answer = await this.answersRepository.findById(answerComment.answerId.toString());

		if (answer) {
			this.sendNotification.execute({
				recipientId: answer.authorId.toString(),
				title: `Novo comentário na resposta ${answer.content.substring(0,20).concat('...')}`,
				content: answerComment.excerpt
			});
		}
	}
}