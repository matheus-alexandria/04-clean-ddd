import { AnswerCommentsRepository } from '../repositories/answerCommentsRepository';

export class DeleteAnswerCommentUseCase {
	constructor(
    private answerCommentsRepository: AnswerCommentsRepository
	) {}

	async execute({ 
		authorId,
		answerCommentId
	}: DeleteAnswerCommentUseCaseRequest): Promise<void> {
		const answerComment = await this.answerCommentsRepository.findById(answerCommentId);

		if (!answerComment) {
			throw new Error('No answer with this id was found.');
		}

		if (authorId !== answerComment.authorId.toString()) {
			throw new Error('Not allowed.');
		}

		await this.answerCommentsRepository.delete(answerComment);
	}
}

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string;
  answerCommentId: string;
}