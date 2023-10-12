import { QuestionComment } from '@domain/forum/enterprise/entities/questionComment';

export interface QuestionCommentsRepository {
  findById(questionCommentId: string): Promise<QuestionComment | null>;
  create(questionComment: QuestionComment): Promise<void>;
  delete(questionComment: QuestionComment): Promise<void>;
}