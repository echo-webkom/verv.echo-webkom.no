import { db } from "@/server/db/drizzle";
import { workspaces } from "@/server/db/schemas";

export const GroupsPreview = async () => {
  const result = await db.select().from(workspaces);

  return (
    <div className="mx-auto w-1/2">
      <p>Sjekk ut undergruppene våres her!</p>
      <ul>
        {result.length > 0 ? (
          result.map((workspace) => (
            <li key={workspace.id}>{workspace.name}</li>
          ))
        ) : (
          <li>No workspaces found</li>
        )}
      </ul>
    </div>
  );
};
