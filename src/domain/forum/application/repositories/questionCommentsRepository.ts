import { PaginationParams } from '@core/repositories/PaginationParams';
import { QuestionComment } from '@domain/forum/enterprise/entities/questionComment';

export interface QuestionCommentsRepository {
  findById(questionCommentId: string): Promise<QuestionComment | null>;
  findManyByQuestionId(questionId: string, pagination: PaginationParams): Promise<QuestionComment[]>;
  create(questionComment: QuestionComment): Promise<void>;
  delete(questionComment: QuestionComment): Promise<void>;
}