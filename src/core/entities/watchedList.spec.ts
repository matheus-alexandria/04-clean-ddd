import { WatchedList } from './watchedList';

class NumberWatchedList extends WatchedList<number> {
	compareItems(a: number, b: number): boolean {
		return a === b;
	}
}

describe('watched list functions', () => {
	it('should be able to create a watched list with initial items', () => {
		const watchedList = new NumberWatchedList([1, 2, 3]);

		expect(watchedList.getItems()).toHaveLength(3);
	});

	it('should be able add new items to the list', () => {
		const watchedList = new NumberWatchedList([1, 2, 3]);

		watchedList.add(4);

		expect(watchedList.getItems()).toHaveLength(4);
		expect(watchedList.getNewItems()).toEqual([4]);
	});

	it('should be able remove an item, from the list', () => {
		const watchedList = new NumberWatchedList([1, 2, 3]);

		watchedList.remove(2);

		expect(watchedList.getItems()).toHaveLength(2);
		expect(watchedList.getRemovedItems()).toEqual([2]);
	});

	it('should be able add an item even if it was removed before', () => {
		const watchedList = new NumberWatchedList([1, 2, 3]);

		watchedList.remove(2);
		watchedList.add(2);

		expect(watchedList.getItems()).toHaveLength(3);
		expect(watchedList.getRemovedItems()).toEqual([]);
		expect(watchedList.getNewItems()).toEqual([]);
	});

	it('should be able remove an item even if it was added before', () => {
		const watchedList = new NumberWatchedList([1, 2, 3]);

		watchedList.add(4);
		watchedList.remove(4);

		expect(watchedList.getItems()).toHaveLength(3);
		expect(watchedList.getRemovedItems()).toEqual([]);
		expect(watchedList.getNewItems()).toEqual([]);
	});

	it('should be update watched list items', () => {
		const watchedList = new NumberWatchedList([1, 2, 3]);

		watchedList.update([2, 4, 6]);

		expect(watchedList.getItems()).toHaveLength(3);
		expect(watchedList.getRemovedItems()).toEqual([1, 3]);
		expect(watchedList.getNewItems()).toEqual([4, 6]);
	});
});