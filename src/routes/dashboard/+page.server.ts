import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/db/drizzle';
import { profiles } from '$lib/db/schema';

export const load = (async ({ locals }) => {
	const { getSession } = locals;

	const session = await getSession();

	if (!session) {
		throw error(401, 'Unauthorized');
	}

	const id = session.user.id;

	const profile = await db.query.profiles.findFirst({
		where: (profiles, { eq }) => eq(profiles.id, id)
	});

	if (!profile?.isWebkom) {
		throw error(403, 'Forbidden');
	}

	const applications = await db.query.applications.findMany();

	return {
		applications,
		session
	};
}) satisfies PageServerLoad;
