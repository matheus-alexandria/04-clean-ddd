import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { Answer } from '@domain/forum/enterprise/entities/answer';
import { AnswersRepository } from '../repositories/answersRepository';
import { Either, right } from '@core/either';
import { AnswerAttachment } from '@domain/forum/enterprise/entities/answerAttachment';
import { AnswerAttachmentList } from '@domain/forum/enterprise/entities/answerAttachmentList';

export class AnswerQuestionUseCase {
	constructor(
    private answersRepository: AnswersRepository
	) {}

	async execute({ 
		instructorId, 
		questionId, 
		content, 
		attachmentIds 
	}: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
		const authorId = new UniqueEntityID(instructorId);
		const questionUniqueId = new UniqueEntityID(questionId);
		const answer = Answer.create({
			authorId, 
			questionId: questionUniqueId, 
			content
		});

		const attachments = attachmentIds.map((attachmentId) => {
			return AnswerAttachment.create({
				answerId: answer.id,
				attachmentId: new UniqueEntityID(attachmentId)
			});
		});

		answer.attachments = new AnswerAttachmentList(attachments);

		await this.answersRepository.create(answer);

		return right({
			answer
		});
	}
}

interface AnswerQuestionUseCaseRequest {
  instructorId: string;
  questionId: string;
  content: string;
  attachmentIds: string[];
}

type AnswerQuestionUseCaseResponse = Either<null, { answer: Answer }>;