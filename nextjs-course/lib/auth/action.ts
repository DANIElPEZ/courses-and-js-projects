"use server";

import { headers } from "next/headers";
import { auth } from "./../auth";

export async function signIn(email: string, password: string) {
     const result=await auth.api.signInEmail({
          body: { email, password, callbackURL: '/dashboard' },
          headers: await headers()
     });
     return result;
}

export async function signOut() {
     await auth.api.signOut({ headers: await headers() });
}