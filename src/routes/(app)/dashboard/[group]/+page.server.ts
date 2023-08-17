import { db } from '$lib/db/drizzle';
import { desc, eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import type { Group } from '$lib/db/schema';
import { groupNames } from '$lib/constants';
import { error } from '@sveltejs/kit';

export const load = (async ({ parent, params }) => {
	const { profile } = await parent();

	const { group } = params;

	if (profile.group !== group && profile.role !== 'admin') {
		throw error(401, 'Du har ikke tilgang til denne siden.');
	}

	const applications = await db.query.applications.findMany({
		where: (application) => eq(application.group, group as Group),
		orderBy: (application) => desc(application.createdAt)
	});

	const groupName = groupNames[group as Group];

	return {
		groupName,
		applications
	};
}) satisfies PageServerLoad;
