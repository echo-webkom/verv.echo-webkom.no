import type { PageServerLoad } from './$types';
import { db } from '$lib/db/drizzle';

export const load = (async ({ depends }) => {
	depends('supabase:auth');

	const applications = await db.query.applications.findMany({
		columns: {
			id: true,
			name: true,
			createdAt: true
		},
		orderBy: (application, { desc }) => desc(application.createdAt)
	});

	return {
		applications
	};
}) satisfies PageServerLoad;
