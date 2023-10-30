import { AggregateRoot } from '@core/entities/aggregateRoot';
import { DomainEvent } from './domainEvent';
import { UniqueEntityID } from '@core/entities/uniqueEntityId';
import { DomainEvents } from './domainEvents';
import { vi } from 'vitest';

class CustomAggregateCreated implements DomainEvent {
	public ocurredAt: Date;
	private aggregate: CustomAggregate;

	constructor(aggregate: CustomAggregate) {
		this.aggregate = aggregate;
		this.ocurredAt = new Date();
	}

	public getAggregateId(): UniqueEntityID {
		return this.aggregate.id;
	}

}

class CustomAggregate extends AggregateRoot<null> {
	public static create() {
		const aggregate = new CustomAggregate(null);

		aggregate.addDomainEvent(new CustomAggregateCreated(aggregate));

		return aggregate;
	}
}

describe('domain events', () => {
	it('should be able to dispatch and listen to events', () => {
		const eventCallbackSpy = vi.fn();

		// Subscriber cadastrado
		DomainEvents.register(eventCallbackSpy, CustomAggregateCreated.name);

		// Criando uma resposta SEM salvar no banco
		const aggregate = CustomAggregate.create();

		// Evento criado mas não disparado
		expect(aggregate.domainEvents).toHaveLength(1);

		// Salvando a resposta no banco de dados e então disparando o evento
		DomainEvents.dispatchEventsForAggregate(aggregate.id);

		// Subscriber ouve o evento e faz o que precisa ser feito enviado no callback e remove o evento
		expect(eventCallbackSpy).toHaveBeenCalled();
		expect(aggregate.domainEvents).toHaveLength(0);
	});
});