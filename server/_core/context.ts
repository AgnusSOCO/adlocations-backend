import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../../drizzle/schema.js";
import { supabaseAdmin } from "./supabase.js";
import * as db from "../db.js";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
};

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  let user: User | null = null;

  try {
    const authHeader = opts.req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      
      const { data: { user: authUser }, error } = await supabaseAdmin.auth.getUser(token);
      
      if (!error && authUser) {
        user = await db.getUserByAuthUserId(authUser.id) ?? null;
        
        if (!user) {
          await db.upsertUserFromAuth({
            authUserId: authUser.id,
            email: authUser.email ?? null,
            name: authUser.user_metadata?.name ?? authUser.email ?? null,
          });
          user = await db.getUserByAuthUserId(authUser.id) ?? null;
        }
      }
    }
  } catch (error) {
    // Authentication is optional for public procedures.
    console.error('[Auth] Error authenticating request:', error);
    user = null;
  }

  return {
    req: opts.req,
    res: opts.res,
    user,
  };
}
