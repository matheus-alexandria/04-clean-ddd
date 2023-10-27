import { Question } from '@domain/forum/enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questionsRepository';
import { Either, left, right } from '@core/either';
import { NotAllowedError } from '@core/errors/errors/notAllowedError';
import { ResourceNotFoundError } from '@core/errors/errors/resourceNotFoundError';
import { QuestionAttachmentsRepository } from '../repositories/questionAttachmentsRepository';
import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { QuestionAttachment } from '@domain/forum/enterprise/entities/questionAttachment';
import { QuestionAttachmentList } from '@domain/forum/enterprise/entities/questionAttachmentList';

export class EditQuestionUseCase {
	constructor(
    private questionsRepository: QuestionsRepository,
    private questionAttachmentsRepository: QuestionAttachmentsRepository
	) {}

	async execute({ 
		authorId,
		questionId,
		title,
		content,
		attachmentIds
	}: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
		const question = await this.questionsRepository.findById(questionId);

		if (!question) {
			return left(new ResourceNotFoundError());
		}

		if (authorId !== question.authorId.toString()) {
			return left(new NotAllowedError());
		}

		const currentQuestionAttachments = await this.questionAttachmentsRepository.findManyByQuestionId(
			questionId
		);

		const questionAttachmentList = new QuestionAttachmentList(currentQuestionAttachments);

		const questionAttachments = attachmentIds.map((attachmentId) => {
			return QuestionAttachment.create({
				attachmentId: new UniqueEntityID(attachmentId),
				questionId: question.id
			});
		});

		questionAttachmentList.update(questionAttachments);

		question.attachments = questionAttachmentList;
		question.title = title;
		question.content = content;

		await this.questionsRepository.save(question);

		return right({
			question
		});
	}
}

interface EditQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  title: string;
  content: string;
  attachmentIds: string[];
}

type EditQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, { question: Question }>