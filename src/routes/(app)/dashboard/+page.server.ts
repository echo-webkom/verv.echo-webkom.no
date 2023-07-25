import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/db/drizzle';

export const load = (async ({ parent }) => {
	const { session } = await parent();

	const id = session?.user?.id;

	if (!id) {
		throw error(401, 'Unauthorized');
	}

	const profile = await db.query.profiles.findFirst({
		where: (profiles, { eq }) => eq(profiles.id, id)
	});

	if (!profile?.isWebkom) {
		throw error(403, 'Forbidden');
	}

	const applications = await db.query.applications.findMany();

	return {
		applications
	};
}) satisfies PageServerLoad;
