import { QuestionCommentsRepository } from '../repositories/questionCommentsRepository';

export class DeleteQuestionCommentUseCase {
	constructor(
    private questionCommentsRepository: QuestionCommentsRepository
	) {}

	async execute({ 
		authorId,
		questionCommentId
	}: DeleteQuestionCommentUseCaseRequest): Promise<void> {
		const questionComment = await this.questionCommentsRepository.findById(questionCommentId);

		if (!questionComment) {
			throw new Error('No question with this id was found.');
		}

		if (authorId !== questionComment.authorId.toString()) {
			throw new Error('Not allowed.');
		}

		await this.questionCommentsRepository.delete(questionComment);
	}
}

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string;
  questionCommentId: string;
}