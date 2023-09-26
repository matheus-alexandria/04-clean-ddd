import { QuestionsRepository } from '../repositories/questionsRepository';

export class CreateQuestionnUseCase {
	constructor(
    private questionsRepository: QuestionsRepository
	) {}

	async execute({ data }: CreateQuestionnUseCaseRequest): Promise<CreateQuestionnUseCaseResponse> {
		return Promise.resolve({ res: data });
	}
}

interface CreateQuestionnUseCaseRequest {
  data: string;
}

interface CreateQuestionnUseCaseResponse {
  res: string;
}