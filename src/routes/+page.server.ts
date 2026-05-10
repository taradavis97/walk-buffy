import { fail } from '@sveltejs/kit';
import { ensureSchema, turso } from '$lib/server/turso';
import type { Walk } from '$lib/types';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	await ensureSchema();
	const result = await turso.execute(
		'SELECT id, saved_at, duration_sec FROM walks ORDER BY saved_at DESC'
	);
	const walks: Walk[] = result.rows.map((row) => ({
		id: String(row.id),
		savedAt: String(row.saved_at),
		durationSec: Number(row.duration_sec)
	}));
	return { walks };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const duration = Number(formData.get('duration'));
		if (!Number.isFinite(duration) || duration <= 0) {
			return fail(400, { message: 'Invalid duration' });
		}
		await ensureSchema();
		await turso.execute({
			sql: 'INSERT INTO walks (id, saved_at, duration_sec) VALUES (?, ?, ?)',
			args: [crypto.randomUUID(), new Date().toISOString(), Math.round(duration)]
		});
		return { success: true };
	}
};
