import { QuestionComment } from '@domain/forum/enterprise/entities/questionComment';
import { QuestionCommentsRepository } from '../repositories/questionCommentsRepository';
import { Either, right } from '@core/either';

export class FetchQuestionCommentsUseCase {
	constructor(
    private questionCommentsRepository: QuestionCommentsRepository
	) {}

	async execute({ 
		questionId,
		page,
	}: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
		const questionComments = await this.questionCommentsRepository.findManyByQuestionId(questionId, { page });

		return right({
			questionComments
		});
	}
}

interface FetchQuestionCommentsUseCaseRequest {
  questionId: string;
  page: number;
}

type FetchQuestionCommentsUseCaseResponse = Either<null, { questionComments: QuestionComment[] }>