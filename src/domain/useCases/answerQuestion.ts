import { Answer } from "../entities/answer";
import { AnswersRepository } from "../repositories/answersRepository";

export class AnswerQuestionUseCase {
  constructor(
    private answersRepository: AnswersRepository
  ) {}

  async execute({ instructorId, questionId, content }: AnswerQuestionUsecase.Params) {
    const answer = new Answer({ content, authorId: instructorId, questionId });

    await this.answersRepository.create(answer);

    return answer;
  }
}

export namespace AnswerQuestionUsecase {
  export type Params = {
    instructorId: string;
    questionId: string;
    content: string;
  }
}