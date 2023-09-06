import { Answer } from "../entities/answer";

export class AnswerQuestionUseCase {
  execute({ instructorId, questionId, content }: AnswerQuestionUsecase.Params) {
    const answer = new Answer({ content, authorId: instructorId, questionId });
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