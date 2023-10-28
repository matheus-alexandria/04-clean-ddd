import { DomainEvent } from '@core/events/domainEvent';
import { Entity } from './entity';
import { DomainEvents } from '@core/events/domainEvents';

export abstract class AggregateRoot<Props> extends Entity<Props> {
	private _domainEvents: DomainEvent[] = [];

	get domainEvents(): DomainEvent[] {
		return this._domainEvents;
	}

	protected addDomainEvent(domainEvent: DomainEvent): void {
		this._domainEvents.push(domainEvent);
		DomainEvents.markAggregateForDispatch(this);
	}

	public clearEvents() {
		this._domainEvents = [];
	}
}