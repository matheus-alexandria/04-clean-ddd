import { QuestionComment } from '@domain/forum/enterprise/entities/questionComment';
import { QuestionCommentsRepository } from '../repositories/questionCommentsRepository';

export class FetchQuestionCommentsUseCase {
	constructor(
    private questionCommentsRepository: QuestionCommentsRepository
	) {}

	async execute({ 
		questionId,
		page,
	}: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
		const questionComments = await this.questionCommentsRepository.findManyByQuestionId(questionId, { page });

		return {
			questionComments
		};
	}
}

interface FetchQuestionCommentsUseCaseRequest {
  questionId: string;
  page: number;
}

interface FetchQuestionCommentsUseCaseResponse {
  questionComments: QuestionComment[];
}