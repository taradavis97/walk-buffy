import { fail } from '@sveltejs/kit';
import { ensureSchema, turso } from '$lib/server/turso';
import type { Walk } from '$lib/types';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	await ensureSchema();
	const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
	const result = await turso.execute({
		sql: 'SELECT id, saved_at, duration_sec, name FROM walks WHERE saved_at >= ? ORDER BY saved_at DESC',
		args: [since]
	});
	const walks: Walk[] = result.rows.map((row) => ({
		id: String(row.id),
		savedAt: String(row.saved_at),
		durationSec: Number(row.duration_sec),
		name: String(row.name ?? '')
	}));
	return { walks };
};

export const actions: Actions = {
	create: async ({ request }) => {
		const formData = await request.formData();
		const duration = Number(formData.get('duration'));
		const name = String(formData.get('walkerName') ?? '').trim();
		if (!Number.isFinite(duration) || duration <= 0) {
			return fail(400, { message: 'Invalid duration' });
		}
		if (!name) {
			return fail(400, { message: 'Name required' });
		}
		await ensureSchema();
		await turso.execute({
			sql: 'INSERT INTO walks (id, saved_at, duration_sec, name) VALUES (?, ?, ?, ?)',
			args: [crypto.randomUUID(), new Date().toISOString(), Math.round(duration), name]
		});
		return { success: true };
	},

	update: async ({ request }) => {
		const formData = await request.formData();
		const id = String(formData.get('id') ?? '').trim();
		const duration = Number(formData.get('duration'));
		const name = String(formData.get('walkerName') ?? '').trim();
		const savedAt = String(formData.get('savedAt') ?? '').trim();
		if (!id) {
			return fail(400, { message: 'Missing id' });
		}
		if (!Number.isFinite(duration) || duration <= 0) {
			return fail(400, { message: 'Invalid duration' });
		}
		if (!name) {
			return fail(400, { message: 'Name required' });
		}
		const savedAtDate = new Date(savedAt);
		if (Number.isNaN(savedAtDate.getTime())) {
			return fail(400, { message: 'Invalid saved-at timestamp' });
		}
		await ensureSchema();
		await turso.execute({
			sql: 'UPDATE walks SET duration_sec = ?, name = ?, saved_at = ? WHERE id = ?',
			args: [Math.round(duration), name, savedAtDate.toISOString(), id]
		});
		return { success: true };
	},

	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = String(formData.get('id') ?? '').trim();
		if (!id) {
			return fail(400, { message: 'Missing id' });
		}
		await ensureSchema();
		await turso.execute({
			sql: 'DELETE FROM walks WHERE id = ?',
			args: [id]
		});
		return { success: true };
	}
};
