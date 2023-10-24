import { AnswerAttachment } from '@domain/forum/enterprise/entities/answerAttachment';

export interface AnswerAttachmentsRepository {
  findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]>;
  deleteManyByAnswerId(answerId: string): Promise<void>;
}