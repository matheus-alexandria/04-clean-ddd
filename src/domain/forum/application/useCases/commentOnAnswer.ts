import { AnswersRepository } from '../repositories/answersRepository';
import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { AnswerComment } from '@domain/forum/enterprise/entities/answerComment';
import { AnswerCommentsRepository } from '../repositories/answerCommentsRepository';

export class CommentOnAnswerUseCase {
	constructor(
    private answersRepository: AnswersRepository,
    private answerCommentsRepository: AnswerCommentsRepository
	) {}

	async execute({ 
		authorId,
		answerId,
		content 
	}: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
		const answer = await this.answersRepository.findById(answerId);

		if (!answer) {
			throw new Error('Answer not found.');
		}

		const answerComment = AnswerComment.create({
			authorId: new UniqueEntityID(authorId),
			answerId: new UniqueEntityID(answerId),
			content,
		});

		await this.answerCommentsRepository.create(answerComment);

		return {
			answerComment,
		};
	}
}

interface CommentOnAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string;
}

interface CommentOnAnswerUseCaseResponse {
  answerComment: AnswerComment; 
}