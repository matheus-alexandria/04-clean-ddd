import { PaginationParams } from '@core/repositories/PaginationParams';
import { Answer } from '@domain/forum/enterprise/entities/answer';

export interface AnswersRepository {
  findById(id: string): Promise<Answer | null>;
  findManyByQuestionId(questionId: string, pagination: PaginationParams): Promise<Answer[]>;
  create(answer: Answer): Promise<void>;
  delete(answer: Answer): Promise<void>;
  save(answer: Answer): Promise<void>;
}