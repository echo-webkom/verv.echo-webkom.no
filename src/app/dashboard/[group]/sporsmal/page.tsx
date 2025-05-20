import { notFound, redirect } from "next/navigation";

import { auth } from "@/lib/auth/lucia";
import { Group, groupNames } from "@/lib/constants";
import { db } from "@/lib/db/drizzle";
import { isMemberOf } from "@/lib/is-member-of";
import { AddQuestionModal } from "./_components/add-question-modal";
import { QuestionsDnd } from "./_components/questions-dnd";

type Props = {
  params: Promise<{
    group: Group;
  }>;
};

export default async function ChangeQuestions({ params }: Props) {
  const user = await auth();
  const { group } = await params;

  if (!user || !isMemberOf(user, [group, "webkom"])) {
    return redirect("/logg-inn");
  }

  if (!Object.keys(groupNames).includes(group)) {
    return notFound();
  }

  const questions = await db.query.questions.findMany({
    where: (row, { eq }) => eq(row.groupId, group),
  });

  return (
    <div>
      <h1>Spørsmål</h1>

      <QuestionsDnd groupId={group} questions={questions} />
      <AddQuestionModal group={group} />
    </div>
  );
}
