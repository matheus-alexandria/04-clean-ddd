import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { Question, QuestionProps } from '@domain/forum/enterprise/entities/question';

export function makeQuestion(override: Partial<QuestionProps> = {}) {
	const question = Question.create({
		authorId: new UniqueEntityID(),
		title: 'Any question',
		content: 'Any content for this factory question',
		...override
	});

	return question;
}
