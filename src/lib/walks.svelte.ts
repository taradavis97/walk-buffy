export type Walk = {
	id: string;
	savedAt: string;
	durationSec: number;
};

class WalksStore {
	entries = $state<Walk[]>([]);

	add(durationSec: number) {
		this.entries.unshift({
			id: crypto.randomUUID(),
			savedAt: new Date().toISOString(),
			durationSec
		});
	}
}

export const walks = new WalksStore();
