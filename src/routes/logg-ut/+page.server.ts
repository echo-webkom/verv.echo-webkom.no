import { sessionCookieName } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { sessions } from '$lib/server/db/schemas';
import { eq } from 'drizzle-orm';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ locals, cookies }) => {
		if (!locals.session) {
			return 'OK';
		}

		cookies.delete(sessionCookieName, {
			path: '/'
		});

		await db.delete(sessions).where(eq(sessions.id, locals.session.id)).execute();

		return 'OK';
	}
};
