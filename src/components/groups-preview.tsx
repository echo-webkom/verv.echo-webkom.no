import { db } from "@/server/db/drizzle";
import { workspaces } from "@/server/db/schemas";

export const GroupsPreview = async () => {
  const result = await (await db.select().from(workspaces));

  return (
    <div className="mx-auto w-1/2">
      <p>Sjekk ut undergruppene våres her!</p>
      <table className=" border-2 bg-blue-200">
        <tbody>
          {result.map((workspace) => (
            <tr key={workspace.id}>
              <td className=" border-2">{workspace.name}</td>
              <td className=" border-2">{workspace.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul>
        {result.length > 0 ? (
          result.map((workspace) => (
            <div key={workspace.id}>
              <li key={workspace.id}>{workspace.name} {workspace.description}</li>
            </div>
          ))
        ) : (
          <li>No workspaces found</li>
        )}
      </ul>
    </div>
  );
};
