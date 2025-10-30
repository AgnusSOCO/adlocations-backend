export declare const systemRouter: import("@trpc/server").TRPCBuiltRouter<{
    ctx: import("./context").TrpcContext;
    meta: object;
    errorShape: import("@trpc/server").TRPCDefaultErrorShape;
    transformer: false;
}, import("@trpc/server").TRPCDecorateCreateRouterOptions<{
    health: import("@trpc/server").TRPCQueryProcedure<{
        input: {
            timestamp?: number;
        };
        output: {
            ok: boolean;
        };
        meta: object;
    }>;
    notifyOwner: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            title?: string;
            content?: string;
        };
        output: {
            readonly success: boolean;
        };
        meta: object;
    }>;
}>>;
//# sourceMappingURL=systemRouter.d.ts.map