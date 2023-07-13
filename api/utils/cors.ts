import { Middleware } from "https://deno.land/x/oak@v12.5.0/mod.ts";

const ALLOWED_ORIGINS = ["http://localhost:5173", "http://localhost:3000"];
const ALLOWED_METHODS = ["GET", "POST", "PUT", "DELETE", "OPTION"];

export const cors: Middleware = (ctx, next) => {
  const origin = ctx.request.headers.get("Origin");
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    ctx.response.headers.set("Access-Control-Allow-Origin", origin);
  }

  const method = ctx.request.headers.get("Access-Control-Request-Method");
  if (method && ALLOWED_METHODS.includes(method)) {
    ctx.response.headers.set("Access-Control-Allow-Methods", method);
  }

  ctx.response.headers.set("Access-Control-Allow-Headers", "Content-Type");

  return next();
};
