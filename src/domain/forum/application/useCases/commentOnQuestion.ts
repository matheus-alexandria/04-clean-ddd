import { QuestionsRepository } from '../repositories/questionsRepository';
import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { QuestionComment } from '@domain/forum/enterprise/entities/questionComment';
import { QuestionCommentsRepository } from '../repositories/questionCommentsRepository';

export class CommentOnQuestionUseCase {
	constructor(
    private questionsRepository: QuestionsRepository,
    private questionCommentsRepository: QuestionCommentsRepository
	) {}

	async execute({ 
		authorId,
		questionId,
		content 
	}: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
		const question = await this.questionsRepository.findById(questionId);

		if (!question) {
			throw new Error('Question not found.');
		}

		const questionComment = QuestionComment.create({
			authorId: new UniqueEntityID(authorId),
			questionId: new UniqueEntityID(questionId),
			content,
		});

		await this.questionCommentsRepository.create(questionComment);

		return {
			questionComment,
		};
	}
}

interface CommentOnQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  content: string;
}

interface CommentOnQuestionUseCaseResponse {
  questionComment: QuestionComment; 
}