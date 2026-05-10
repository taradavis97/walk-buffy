import { createClient } from '@libsql/client/web';
import { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN } from '$env/static/private';

export const turso = createClient({
	url: TURSO_DATABASE_URL,
	authToken: TURSO_AUTH_TOKEN
});

let ensured: Promise<void> | undefined;

export function ensureSchema() {
	ensured ??= turso
		.execute(
			`CREATE TABLE IF NOT EXISTS walks (
				id TEXT PRIMARY KEY,
				saved_at TEXT NOT NULL,
				duration_sec INTEGER NOT NULL,
				name TEXT NOT NULL
			)`
		)
		.then(() => undefined);
	return ensured;
}
