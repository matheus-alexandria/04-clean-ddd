import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { AnswerAttachmentsRepository } from '@domain/forum/application/repositories/answerAttachmentsRepository';
import { AnswerAttachment, AnswerAttachmentProps } from '@domain/forum/enterprise/entities/answerAttachment';

export class InMemoryAnswerAttachmentsRepository implements AnswerAttachmentsRepository {
	public attachments: AnswerAttachment[] = [];
	async findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
		return this.attachments.filter((item) => item.answerId.toString() === answerId);
	}

	async deleteManyByAnswerId(answerId: string): Promise<void> {
		this.attachments = this.attachments.filter((item) => item.answerId.toString() !== answerId);
	}

	factory(override: Partial<AnswerAttachmentProps> = {}, id?: UniqueEntityID) {
		const answer = AnswerAttachment.create({
			attachmentId: new UniqueEntityID(),
			answerId: new UniqueEntityID(),
			...override
		}, id);

		this.attachments.push(answer);
    
		return answer;
	}
}