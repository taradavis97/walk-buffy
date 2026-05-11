export function formatDuration(totalMinutes: number) {
	const safe = Math.max(0, Math.floor(totalMinutes));
	const minutes = Math.floor(safe / 60)
		.toString()
		.padStart(2, '0');
	const seconds = (safe % 60).toString().padStart(2, '0');
	
	return `${minutes}:${seconds}`;
}

export function formatSavedOn(iso: string) {
	return new Date(iso).toLocaleDateString(undefined, {
		day: 'numeric',
		month: 'long'
	})
}

export function formatSavedAt(iso: string) {
	const d = new Date(iso);
	const hours = d.getHours().toString().padStart(2, '0');
	const minutes = d.getMinutes().toString().padStart(2, '0');
	return `${hours}:${minutes}`;
}