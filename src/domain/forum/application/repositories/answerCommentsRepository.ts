import { PaginationParams } from '@core/repositories/PaginationParams';
import { AnswerComment } from '@domain/forum/enterprise/entities/answerComment';

export interface AnswerCommentsRepository {
  findById(answerCommentId: string): Promise<AnswerComment | null>;
  findManyByAnswerId(answerId: string, pagination: PaginationParams): Promise<AnswerComment[]>;
  create(answerComment: AnswerComment): Promise<void>;
  delete(answerComment: AnswerComment): Promise<void>;
}