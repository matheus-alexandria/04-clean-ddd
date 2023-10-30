import { InMemoryAnswerAttachmentsRepository } from '@test/repositories/inMemoryAnswerAttachmentsRepository';
import { InMemoryAnswersRepository } from '@test/repositories/inMemoryAnswersRepository';
import { OnAnswerCreated } from './onAnswerCreated';

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;

describe('On Answer Created', () => {
	beforeEach(() => {
		inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository();
		inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository);
	});

	it('should send a notification when an answer is created', () => {
		const onAnswerCreated = new OnAnswerCreated();
		inMemoryAnswersRepository.factory();
	});
});