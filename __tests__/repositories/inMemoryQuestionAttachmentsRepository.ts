import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { QuestionAttachmentsRepository } from '@domain/forum/application/repositories/questionAttachmentsRepository';
import { QuestionAttachment, QuestionAttachmentProps } from '@domain/forum/enterprise/entities/questionAttachment';

export class InMemoryQuestionAttachmentsRepository implements QuestionAttachmentsRepository {
	public attachments: QuestionAttachment[] = [];
	async findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]> {
		return this.attachments.filter((item) => item.questionId.toString() === questionId);
	}

	async deleteManyByQuestionId(questionId: string): Promise<void> {
		this.attachments = this.attachments.filter((item) => item.questionId.toString() !== questionId);
	}

	factory(override: Partial<QuestionAttachmentProps> = {}, id?: UniqueEntityID) {
		const question = QuestionAttachment.create({
			attachmentId: new UniqueEntityID(),
			questionId: new UniqueEntityID(),
			...override
		}, id);

		this.attachments.push(question);
    
		return question;
	}
}