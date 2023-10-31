import { DomainEvents } from '@core/events/domainEvents';
import { EventHandler } from '@core/events/eventHandler';
import { AnswersRepository } from '@domain/forum/application/repositories/answersRepository';
import { SendNotificationUseCase } from '../useCases/sendNotification';
import { QuestionBestAnswerChosenEvent } from '@domain/forum/enterprise/entities/questionBestAnswerChosenEvent';

export class OnQuestionBestAnswerChosen implements EventHandler {
	constructor(
    private answersRepository: AnswersRepository,
    private sendNotification: SendNotificationUseCase
	) {
		this.setupSubscriptions();
	}

	setupSubscriptions(): void {
		DomainEvents.register(
			this.sendQuestionBestAnswerNotification.bind(this),
			QuestionBestAnswerChosenEvent.name
		);
	}

	private async sendQuestionBestAnswerNotification({ question, bestAnswerId }: QuestionBestAnswerChosenEvent) {
		const answer = await this.answersRepository.findById(bestAnswerId.toString());

		if (answer) {
			this.sendNotification.execute({
				recipientId: answer.authorId.toString(),
				title: 'Sua resposta foi escolhida!',
				content: `Sua resposta na pergunta "${question.title.substring(0,20).concat('...')}" 
        foi escolhida como a melhor pelo autor!`
			});
		}
	}
}