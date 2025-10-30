import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../../drizzle/schema";
export type TrpcContext = {
    req: CreateExpressContextOptions["req"];
    res: CreateExpressContextOptions["res"];
    user: User | null;
};
export declare function createContext(opts: CreateExpressContextOptions): Promise<TrpcContext>;
//# sourceMappingURL=context.d.ts.map