import { AnswerComment } from '@domain/forum/enterprise/entities/answerComment';

export interface AnswerCommentsRepository {
  create(answerComment: AnswerComment): Promise<void>;
}