import { feide } from "@/server/auth/feide";
import { generateState } from "arctic";
import { cookies } from "next/headers";

export const GET = async () => {
  const state = generateState();
  const url = await feide.createAuthorizationURL(state);

  cookies().set("oauth_state", state, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  return Response.redirect(url);
};
