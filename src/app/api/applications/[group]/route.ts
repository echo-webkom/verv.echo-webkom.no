import { NextRequest } from "next/server";
import { Parser } from "@json2csv/plainjs";
import { z } from "zod";

import { auth } from "@/lib/auth/lucia";
import { studyNames, yearNames } from "@/lib/constants";
import { selectApplicationsByGroup } from "@/lib/db/queries";
import { groupEnum } from "@/lib/db/schemas";
import { isMemberOf, isWebkom } from "@/lib/is-member-of";

const parser = new Parser({
  withBOM: true,
});

type RouteContext = {
  params: Promise<{
    group: string;
  }>;
};

export async function GET(_request: NextRequest, { params }: RouteContext) {
  try {
    const { group } = await params;
    const groupId = z.enum(groupEnum).parse(group);

    const user = await auth();

    if (!user) {
      return new Response("Unauthorized: You're not logged in.", {
        status: 401,
      });
    }

    if (!isMemberOf(user, [groupId]) && !isWebkom(user)) {
      return new Response("Unauthorized: You're not in the group.", {
        status: 401,
      });
    }

    const applications = await selectApplicationsByGroup(groupId);

    const mappedApplications = applications.map(
      ({ email, fieldOfStudy, name, reason, yearOfStudy }) => ({
        navn: name,
        "e-post": email,
        studieretning: studyNames[fieldOfStudy],
        årstrinn: yearNames[yearOfStudy],
        grunn: reason,
      }),
    );

    const csv = parser.parse(mappedApplications);

    return new Response(csv, {
      status: 200,
      headers: {
        "Content-Type": "application/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${groupId}-soknader.csv"`,
      },
    });
  } catch (error) {
    console.log(error);

    return new Response("Something went wrong", { status: 500 });
  }
}
