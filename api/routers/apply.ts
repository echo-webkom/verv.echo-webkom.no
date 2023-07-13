import { Router } from "https://deno.land/x/oak@v12.5.0/mod.ts";
import { z } from "https://deno.land/x/zod@v3.21.4/mod.ts";
import { fieldOfStudy, yearOfStudy } from "../variables.ts";
import { APPLY_PREFIX, db } from "../db/kv.ts";

export const applyRouter = new Router({
  prefix: "/apply",
});

const applyEntrySchema = z.object({
  name: z.string().min(2),
  email: z.string().min(1).email(),
  yearOfStudy: z.nativeEnum(yearOfStudy),
  fieldOfStudy: z.nativeEnum(fieldOfStudy),
  reason: z.string().min(10),
  createdAt: z.number(),
});
// type ApplyEntry = z.infer<typeof applyEntrySchema>;

const applyEntryPayloadSchema = applyEntrySchema.omit({
  createdAt: true,
});

// applyRouter.get("/", async ({ response }) => {
//   const entries = db.list<ApplyEntry>({ prefix: [APPLY_PREFIX] });

//   const applications = [];

//   for await (const entry of entries) {
//     applications.push({
//       id: entry.key[1],
//       ...entry.value,
//     });
//   }

//   response.status = 200;
//   response.body = applications;
// });

applyRouter.post("/", async ({ request, response }) => {
  try {
    const payload = applyEntryPayloadSchema.parse(
      await request.body({ type: "json" }).value
    );

    const uuid = crypto.randomUUID();

    const resp = await db.set([APPLY_PREFIX, uuid], {
      ...payload,
      createdAt: Date.now(),
    });

    if (!resp.ok) {
      response.status = 500;
      response.body = "Failed to create application";
      return;
    }

    response.status = 201;
    response.body = uuid;
  } catch (e) {
    if (e instanceof z.ZodError) {
      response.status = 400;
      response.body = "Bad request";
      return;
    }
  }
});
