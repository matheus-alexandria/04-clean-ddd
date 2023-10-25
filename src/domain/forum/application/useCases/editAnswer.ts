import { Answer } from '@domain/forum/enterprise/entities/answer';
import { AnswersRepository } from '../repositories/answersRepository';
import { Either, left, right } from '@core/either';
import { ResourceNotFoundError } from '@core/errors/errors/resourceNotFoundError';
import { NotAllowedError } from '@core/errors/httpErrors/notAllowedError';
import { AnswerAttachmentsRepository } from '../repositories/answerAttachmentsRepository';
import { AnswerAttachmentList } from '@domain/forum/enterprise/entities/answerAttachmentList';
import { AnswerAttachment } from '@domain/forum/enterprise/entities/answerAttachment';
import { UniqueEntityID } from '@core/entities/uniqueEntityId';

export class EditAnswerUseCase {
	constructor(
    private answersRepository: AnswersRepository,
    private answerAttachmentsRepository: AnswerAttachmentsRepository
	) {}

	async execute({ 
		authorId,
		answerId,
		content,
		attachmentIds
	}: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
		const answer = await this.answersRepository.findById(answerId);

		if (!answer) {
			return left(new ResourceNotFoundError());
		}

		if (authorId !== answer.authorId.toString()) {
			return left(new NotAllowedError());
		}

		const currentAnswerAttachments = await this.answerAttachmentsRepository.findManyByAnswerId(answerId);

		const attachmentList = new AnswerAttachmentList(currentAnswerAttachments);

		const attachments = attachmentIds.map((attachmentId) => {
			return AnswerAttachment.create({
				answerId: answer.id,
				attachmentId: new UniqueEntityID(attachmentId)
			});
		});
    
		attachmentList.update(attachments);

		answer.attachments = attachmentList;
		answer.content = content;

		await this.answersRepository.save(answer);

		return right({ answer });
	}
}

interface EditAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string;
  attachmentIds: string[];
}

type EditAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, { answer: Answer }>