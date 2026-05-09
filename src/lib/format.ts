export function formatDuration(totalMinutes: number) {
	const safe = Math.max(0, Math.floor(totalMinutes));
	const minutes = Math.floor(safe / 60)
		.toString()
		.padStart(2, '0');
	const seconds = (safe % 60).toString().padStart(2, '0');
	
	return `${minutes}:${seconds}`;
}

export function formatSavedAt(iso: string) {
	return new Date(iso).toLocaleString(undefined, {
		dateStyle: 'medium',
		timeStyle: 'short'
	});
}
