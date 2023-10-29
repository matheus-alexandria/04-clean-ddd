import { AggregateRoot } from '@core/entities/aggregateRoot';
import { DomainEvent } from './domainEvent';
import { UniqueEntityID } from '@core/entities/uniqueEntityId';

class CustomAggregateDomainEvent implements DomainEvent {
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

		aggregate.addDomainEvent(new CustomAggregateDomainEvent(aggregate));

		return aggregate;
	}
}