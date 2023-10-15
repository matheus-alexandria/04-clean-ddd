import { AnswerComment } from '@domain/forum/enterprise/entities/answerComment';

export interface AnswerCommentsRepository {
  findById(answerCommentId: string): Promise<AnswerComment | null>;
  create(answerComment: AnswerComment): Promise<void>;
  delete(answerComment: AnswerComment): Promise<void>;
}