import type { TrpcContext } from "./context";
export declare const router: import("@trpc/server").TRPCRouterBuilder<{
    ctx: TrpcContext;
    meta: object;
    errorShape: import("@trpc/server").TRPCDefaultErrorShape;
    transformer: false;
}>;
export declare const publicProcedure: import("@trpc/server").TRPCProcedureBuilder<TrpcContext, object, object, import("@trpc/server").TRPCUnsetMarker, import("@trpc/server").TRPCUnsetMarker, import("@trpc/server").TRPCUnsetMarker, import("@trpc/server").TRPCUnsetMarker, false>;
export declare const protectedProcedure: import("@trpc/server").TRPCProcedureBuilder<TrpcContext, object, {
    user: {
        role: "user" | "admin" | "sales_rep" | "maintenance" | "viewer";
        name: string;
        id: number;
        authUserId: string;
        email: string;
        loginMethod: string;
        createdAt: Date;
        updatedAt: Date;
        lastSignedIn: Date;
    };
    req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    res: import("express").Response<any, Record<string, any>>;
}, import("@trpc/server").TRPCUnsetMarker, import("@trpc/server").TRPCUnsetMarker, import("@trpc/server").TRPCUnsetMarker, import("@trpc/server").TRPCUnsetMarker, false>;
export declare const adminProcedure: import("@trpc/server").TRPCProcedureBuilder<TrpcContext, object, {
    user: {
        role: "user" | "admin" | "sales_rep" | "maintenance" | "viewer";
        name: string;
        id: number;
        authUserId: string;
        email: string;
        loginMethod: string;
        createdAt: Date;
        updatedAt: Date;
        lastSignedIn: Date;
    };
    req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    res: import("express").Response<any, Record<string, any>>;
}, import("@trpc/server").TRPCUnsetMarker, import("@trpc/server").TRPCUnsetMarker, import("@trpc/server").TRPCUnsetMarker, import("@trpc/server").TRPCUnsetMarker, false>;
//# sourceMappingURL=trpc.d.ts.map