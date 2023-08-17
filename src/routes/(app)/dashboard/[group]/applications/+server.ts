import { db } from '$lib/db/drizzle';
import { Parser } from '@json2csv/plainjs';
import { desc, eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';
import type { Group } from '$lib/db/schema';
import { studyNames, yearNames } from '$lib/constants';

export const GET = (async ({ locals, params }) => {
	const { getSession } = locals;
	const { group } = params;

	const session = await getSession();
	const id = session?.user.id;

	if (!id) {
		return new Response('Du er ikke logget inn', {
			status: 401
		});
	}

	const profile = await db.query.profiles.findFirst({
		where: (profile) => eq(profile.id, id)
	});

	const isAdmin = profile?.role === 'admin';
	const isMemberOfGroup = profile?.group === group;

	if (!isAdmin && !isMemberOfGroup) {
		return new Response('Du har ikke tilgang til denne siden.', {
			status: 401
		});
	}

	const applications = await db.query.applications.findMany({
		where: (application) => eq(application.group, group as Group),
		orderBy: (application) => desc(application.createdAt)
	});

	const mappedApplications = applications.map(
		({ email, fieldOfStudy, name, reason, yearOfStudy }) => ({
			studieretning: studyNames[fieldOfStudy],
			navn: name,
			epost: email,
			arstrinn: yearNames[yearOfStudy],
			grunn: reason
		})
	);

	const parser = new Parser();
	const csv = parser.parse(mappedApplications);

	const response = new Response(csv, {
		status: 200,
		headers: {
			'Content-Type': 'application/csv',
			'Content-Disposition': `attachment; filename="${group}-soknader.csv"`
		}
	});

	return response;
}) satisfies RequestHandler;
