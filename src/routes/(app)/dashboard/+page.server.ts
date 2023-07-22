import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/db/drizzle';

export const load = (async ({ parent }) => {
	const { session } = await parent();

	if (!session) {
		throw error(403, 'Du har ikke tilgang til denne siden.');
	}

	const { id } = session.user;

	const profile = await db.query.profiles.findFirst({
		where: (profiles, { eq }) => eq(profiles.id, id)
	});

	if (!profile?.isWebkom) {
		throw error(403, 'Du har ikke tilgang til denne siden.');
	}

	const applications = await db.query.applications.findMany();

	return {
		applications
	};
}) satisfies PageServerLoad;
