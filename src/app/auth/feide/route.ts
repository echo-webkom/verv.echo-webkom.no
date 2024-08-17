import { cookies } from "next/headers";
import { generateState } from "arctic";

import { feide } from "@/lib/auth/feide";

export const GET = async () => {
  const state = generateState();
  const url = await feide.createAuthorizationURL(state);

  cookies().set("feide_oauth_state", state, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  return Response.redirect(url);
};
