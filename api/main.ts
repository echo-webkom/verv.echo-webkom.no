import { Application } from "https://deno.land/x/oak@v12.5.0/mod.ts";
import { cors } from "./utils/cors.ts";
import { applyRouter } from "./routers/apply.ts";

const PORT = 8080;

const app = new Application();

app.use(cors);

app.use(applyRouter.routes());
app.use(applyRouter.allowedMethods());

console.info(`🚀 Server is running on port: ${PORT}`);

await app.listen({ port: PORT });
