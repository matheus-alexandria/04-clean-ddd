import { QuestionComment } from '@domain/forum/enterprise/entities/questionComment';

export interface QuestionCommentsRepository {
  create(questionComment: QuestionComment): Promise<void>;
}