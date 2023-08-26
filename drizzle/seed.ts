import "dotenv/config";
import { db } from "@/lib/db/drizzle";
import { applications } from "@/lib/db/schema";

async function main() {
  await db.insert(applications).values([
    {
      email: "person1@example.com",
      name: "Person 1",
      yearOfStudy: "1",
      fieldOfStudy: "DSC",
      group: "webkom",
      ip: "noip",
      reason:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      email: "person2@exampke.com",
      name: "Person 2",
      yearOfStudy: "2",
      fieldOfStudy: "DSC",
      group: "webkom",
      ip: "noip",
      reason:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
  ]);
}

console.log("🚀 Starting seed...");

main()
  .then(() => {
    console.log("✅ Seed complete!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("🚨 Seed failed! Error:", err);
    process.exit(1);
  });
