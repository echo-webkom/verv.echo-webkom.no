import { selectApplicationsByGroup } from "@/lib/db/queries";
import { Parser } from "@json2csv/plainjs";
import { groupEnum } from "@/lib/db/schema";
import { z } from "zod";
import { studyNames, yearNames } from "@/lib/constants";
import { NextRequest } from "next/server";
import { auth } from "@/lib/auth/lucia";
import { db } from "@/lib/db/drizzle";

const routeContextSchema = z.object({
  params: z.object({
    group: z.enum(groupEnum),
  }),
});

export async function GET(
  _request: NextRequest,
  ctx: z.infer<typeof routeContextSchema>
) {
  try {
    const parsedCtx = routeContextSchema.parse(ctx);

    const { user } = await auth();

    if (!user) {
      return new Response("Unauthorized: You're not logged in.", {
        status: 401,
      });
    }

    const groups = await db.query.userGroupMemberships
      .findMany({
        where: (ugm, { eq }) => eq(ugm.userId, user.id),
      })
      .then((res) => res.map((ugm) => ugm.id));

    if (
      !groups.map((group) => group).includes(parsedCtx.params.group) &&
      !groups.includes("webkom")
    ) {
      return new Response("Unauthorized: You're not in the group.", {
        status: 401,
      });
    }

    const applications = await selectApplicationsByGroup(
      parsedCtx.params.group
    );

    const mappedApplications = applications.map(
      ({ email, fieldOfStudy, name, reason, yearOfStudy }) => ({
        navn: name,
        "e-post": email,
        studieretning: studyNames[fieldOfStudy],
        årstrinn: yearNames[yearOfStudy],
        grunn: reason,
      })
    );

    const parser = new Parser({
      withBOM: true,
    });

    const csv = parser.parse(mappedApplications);

    return new Response(csv, {
      status: 200,
      headers: {
        "Content-Type": "application/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${ctx.params.group}-soknader.csv"`,
      },
    });
  } catch (error) {
    console.log(error);

    return new Response("Something went wrong", { status: 500 });
  }
}
