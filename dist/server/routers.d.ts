export declare const appRouter: import("@trpc/server").TRPCBuiltRouter<{
    ctx: import("./_core/context.js").TrpcContext;
    meta: object;
    errorShape: import("@trpc/server").TRPCDefaultErrorShape;
    transformer: false;
}, import("@trpc/server").TRPCDecorateCreateRouterOptions<{
    system: import("@trpc/server").TRPCBuiltRouter<{
        ctx: import("./_core/context.js").TrpcContext;
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
    auth: import("@trpc/server").TRPCBuiltRouter<{
        ctx: import("./_core/context.js").TrpcContext;
        meta: object;
        errorShape: import("@trpc/server").TRPCDefaultErrorShape;
        transformer: false;
    }, import("@trpc/server").TRPCDecorateCreateRouterOptions<{
        me: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
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
            meta: object;
        }>;
        logout: import("@trpc/server").TRPCMutationProcedure<{
            input: void;
            output: {
                readonly success: true;
            };
            meta: object;
        }>;
    }>>;
    adLocations: import("@trpc/server").TRPCBuiltRouter<{
        ctx: import("./_core/context.js").TrpcContext;
        meta: object;
        errorShape: import("@trpc/server").TRPCDefaultErrorShape;
        transformer: false;
    }, import("@trpc/server").TRPCDecorateCreateRouterOptions<{
        list: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                id: number;
                title: string;
                address: string;
                latitude: string;
                longitude: string;
                dimensions: string;
                type: "billboard" | "poster" | "digital" | "transit" | "street_furniture" | "other";
                material: string;
                hasVinyl: number;
                photos: string;
                mapLink: string;
                availabilityStatus: "maintenance" | "pending" | "available" | "occupied";
                priceEstimate: number;
                notes: string;
                landlordId: number;
                createdAt: Date;
                updatedAt: Date;
            }[];
            meta: object;
        }>;
        getById: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                id?: number;
            };
            output: {
                id: number;
                title: string;
                address: string;
                latitude: string;
                longitude: string;
                dimensions: string;
                type: "billboard" | "poster" | "digital" | "transit" | "street_furniture" | "other";
                material: string;
                hasVinyl: number;
                photos: string;
                mapLink: string;
                availabilityStatus: "maintenance" | "pending" | "available" | "occupied";
                priceEstimate: number;
                notes: string;
                landlordId: number;
                createdAt: Date;
                updatedAt: Date;
            };
            meta: object;
        }>;
        create: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                type?: "billboard" | "poster" | "digital" | "transit" | "street_furniture" | "other";
                priceEstimate?: number;
                availabilityStatus?: "maintenance" | "pending" | "available" | "occupied";
                notes?: string;
                title?: string;
                address?: string;
                latitude?: string;
                longitude?: string;
                dimensions?: string;
                material?: string;
                hasVinyl?: number;
                photos?: string;
                mapLink?: string;
                landlordId?: number;
            };
            output: import("postgres").RowList<never[]>;
            meta: object;
        }>;
        update: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id?: number;
                data?: {
                    type?: "billboard" | "poster" | "digital" | "transit" | "street_furniture" | "other";
                    priceEstimate?: number;
                    availabilityStatus?: "maintenance" | "pending" | "available" | "occupied";
                    notes?: string;
                    title?: string;
                    address?: string;
                    latitude?: string;
                    longitude?: string;
                    dimensions?: string;
                    material?: string;
                    hasVinyl?: number;
                    photos?: string;
                    mapLink?: string;
                    landlordId?: number;
                };
            };
            output: {
                id: number;
                title: string;
                address: string;
                latitude: string;
                longitude: string;
                dimensions: string;
                type: "billboard" | "poster" | "digital" | "transit" | "street_furniture" | "other";
                material: string;
                hasVinyl: number;
                photos: string;
                mapLink: string;
                availabilityStatus: "maintenance" | "pending" | "available" | "occupied";
                priceEstimate: number;
                notes: string;
                landlordId: number;
                createdAt: Date;
                updatedAt: Date;
            };
            meta: object;
        }>;
        delete: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id?: number;
            };
            output: {
                success: boolean;
            };
            meta: object;
        }>;
    }>>;
    landlords: import("@trpc/server").TRPCBuiltRouter<{
        ctx: import("./_core/context.js").TrpcContext;
        meta: object;
        errorShape: import("@trpc/server").TRPCDefaultErrorShape;
        transformer: false;
    }, import("@trpc/server").TRPCDecorateCreateRouterOptions<{
        list: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                id: number;
                name: string;
                email: string;
                phone: string;
                company: string;
                rentalSite: string;
                contractStartDate: Date;
                contractEndDate: Date;
                rentAmount: number;
                paymentStatus: "paid" | "pending" | "overdue";
                notes: string;
                createdAt: Date;
                updatedAt: Date;
            }[];
            meta: object;
        }>;
        getById: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                id?: number;
            };
            output: {
                id: number;
                name: string;
                email: string;
                phone: string;
                company: string;
                rentalSite: string;
                contractStartDate: Date;
                contractEndDate: Date;
                rentAmount: number;
                paymentStatus: "paid" | "pending" | "overdue";
                notes: string;
                createdAt: Date;
                updatedAt: Date;
            };
            meta: object;
        }>;
        create: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                name?: string;
                email?: string;
                paymentStatus?: "paid" | "pending" | "overdue";
                phone?: string;
                company?: string;
                rentalSite?: string;
                contractStartDate?: Date;
                contractEndDate?: Date;
                rentAmount?: number;
                notes?: string;
            };
            output: import("postgres").RowList<never[]>;
            meta: object;
        }>;
        update: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id?: number;
                data?: {
                    name?: string;
                    email?: string;
                    paymentStatus?: "paid" | "pending" | "overdue";
                    phone?: string;
                    company?: string;
                    rentalSite?: string;
                    contractStartDate?: Date;
                    contractEndDate?: Date;
                    rentAmount?: number;
                    notes?: string;
                };
            };
            output: {
                id: number;
                name: string;
                email: string;
                phone: string;
                company: string;
                rentalSite: string;
                contractStartDate: Date;
                contractEndDate: Date;
                rentAmount: number;
                paymentStatus: "paid" | "pending" | "overdue";
                notes: string;
                createdAt: Date;
                updatedAt: Date;
            };
            meta: object;
        }>;
        delete: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id?: number;
            };
            output: {
                success: boolean;
            };
            meta: object;
        }>;
    }>>;
    clients: import("@trpc/server").TRPCBuiltRouter<{
        ctx: import("./_core/context.js").TrpcContext;
        meta: object;
        errorShape: import("@trpc/server").TRPCDefaultErrorShape;
        transformer: false;
    }, import("@trpc/server").TRPCDecorateCreateRouterOptions<{
        list: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                id: number;
                name: string;
                email: string;
                phone: string;
                company: string;
                adRentedId: number;
                rentalStartDate: Date;
                rentalEndDate: Date;
                rentAmount: number;
                paymentStatus: "paid" | "pending" | "overdue";
                accountStatus: "active" | "inactive" | "suspended";
                assignedSalesRepId: number;
                notes: string;
                createdAt: Date;
                updatedAt: Date;
            }[];
            meta: object;
        }>;
        getById: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                id?: number;
            };
            output: {
                id: number;
                name: string;
                email: string;
                phone: string;
                company: string;
                adRentedId: number;
                rentalStartDate: Date;
                rentalEndDate: Date;
                rentAmount: number;
                paymentStatus: "paid" | "pending" | "overdue";
                accountStatus: "active" | "inactive" | "suspended";
                assignedSalesRepId: number;
                notes: string;
                createdAt: Date;
                updatedAt: Date;
            };
            meta: object;
        }>;
        create: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                name?: string;
                email?: string;
                paymentStatus?: "paid" | "pending" | "overdue";
                accountStatus?: "active" | "inactive" | "suspended";
                phone?: string;
                company?: string;
                rentAmount?: number;
                notes?: string;
                adRentedId?: number;
                rentalStartDate?: Date;
                rentalEndDate?: Date;
                assignedSalesRepId?: number;
            };
            output: import("postgres").RowList<never[]>;
            meta: object;
        }>;
        update: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id?: number;
                data?: {
                    name?: string;
                    email?: string;
                    paymentStatus?: "paid" | "pending" | "overdue";
                    accountStatus?: "active" | "inactive" | "suspended";
                    phone?: string;
                    company?: string;
                    rentAmount?: number;
                    notes?: string;
                    adRentedId?: number;
                    rentalStartDate?: Date;
                    rentalEndDate?: Date;
                    assignedSalesRepId?: number;
                };
            };
            output: {
                id: number;
                name: string;
                email: string;
                phone: string;
                company: string;
                adRentedId: number;
                rentalStartDate: Date;
                rentalEndDate: Date;
                rentAmount: number;
                paymentStatus: "paid" | "pending" | "overdue";
                accountStatus: "active" | "inactive" | "suspended";
                assignedSalesRepId: number;
                notes: string;
                createdAt: Date;
                updatedAt: Date;
            };
            meta: object;
        }>;
        delete: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id?: number;
            };
            output: {
                success: boolean;
            };
            meta: object;
        }>;
    }>>;
    structures: import("@trpc/server").TRPCBuiltRouter<{
        ctx: import("./_core/context.js").TrpcContext;
        meta: object;
        errorShape: import("@trpc/server").TRPCDefaultErrorShape;
        transformer: false;
    }, import("@trpc/server").TRPCDecorateCreateRouterOptions<{
        list: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                id: number;
                adLocationId: number;
                maintenanceStatus: "good" | "needs_attention" | "critical";
                licenseFileUrl: string;
                licenseExpiryDate: Date;
                lastMaintenanceDate: Date;
                nextMaintenanceDate: Date;
                technicianNotes: string;
                createdAt: Date;
                updatedAt: Date;
            }[];
            meta: object;
        }>;
        getById: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                id?: number;
            };
            output: {
                id: number;
                adLocationId: number;
                maintenanceStatus: "good" | "needs_attention" | "critical";
                licenseFileUrl: string;
                licenseExpiryDate: Date;
                lastMaintenanceDate: Date;
                nextMaintenanceDate: Date;
                technicianNotes: string;
                createdAt: Date;
                updatedAt: Date;
            };
            meta: object;
        }>;
        getByAdLocationId: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                adLocationId?: number;
            };
            output: {
                id: number;
                adLocationId: number;
                maintenanceStatus: "good" | "needs_attention" | "critical";
                licenseFileUrl: string;
                licenseExpiryDate: Date;
                lastMaintenanceDate: Date;
                nextMaintenanceDate: Date;
                technicianNotes: string;
                createdAt: Date;
                updatedAt: Date;
            };
            meta: object;
        }>;
        create: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                maintenanceStatus?: "good" | "needs_attention" | "critical";
                adLocationId?: number;
                licenseFileUrl?: string;
                licenseExpiryDate?: Date;
                lastMaintenanceDate?: Date;
                nextMaintenanceDate?: Date;
                technicianNotes?: string;
            };
            output: import("postgres").RowList<never[]>;
            meta: object;
        }>;
        update: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id?: number;
                data?: {
                    maintenanceStatus?: "good" | "needs_attention" | "critical";
                    adLocationId?: number;
                    licenseFileUrl?: string;
                    licenseExpiryDate?: Date;
                    lastMaintenanceDate?: Date;
                    nextMaintenanceDate?: Date;
                    technicianNotes?: string;
                };
            };
            output: {
                id: number;
                adLocationId: number;
                maintenanceStatus: "good" | "needs_attention" | "critical";
                licenseFileUrl: string;
                licenseExpiryDate: Date;
                lastMaintenanceDate: Date;
                nextMaintenanceDate: Date;
                technicianNotes: string;
                createdAt: Date;
                updatedAt: Date;
            };
            meta: object;
        }>;
        delete: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id?: number;
            };
            output: {
                success: boolean;
            };
            meta: object;
        }>;
    }>>;
    deepseek: import("@trpc/server").TRPCBuiltRouter<{
        ctx: import("./_core/context.js").TrpcContext;
        meta: object;
        errorShape: import("@trpc/server").TRPCDefaultErrorShape;
        transformer: false;
    }, import("@trpc/server").TRPCDecorateCreateRouterOptions<{
        analyzeLocation: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                type?: string;
                title?: string;
                address?: string;
                dimensions?: string;
                photoUrl?: string;
            };
            output: {
                visibility: string;
                condition: string;
                recommendations: string[];
                estimatedValue: string;
            };
            meta: object;
        }>;
        reviewContract: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                contractText?: string;
            };
            output: {
                summary: string;
                keyTerms: string[];
                risks: string[];
                recommendations: string[];
            };
            meta: object;
        }>;
        predictMaintenance: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                type?: string;
                maintenanceStatus?: string;
                technicianNotes?: string;
                lastInspectionDate?: Date;
                age?: number;
            };
            output: {
                urgency: "Low" | "Medium" | "High" | "Critical";
                predictedIssues: string[];
                recommendedActions: string[];
                estimatedCost: string;
                timeline: string;
            };
            meta: object;
        }>;
        generateEmail: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                purpose?: "maintenance" | "quote" | "renewal" | "general";
                clientName?: string;
                locationDetails?: string;
                additionalInfo?: string;
            };
            output: {
                subject: string;
                body: string;
            };
            meta: object;
        }>;
        enhancedPricing: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                type?: string;
                address?: string;
                dimensions?: string;
                visibility?: string;
                traffic?: string;
                demographics?: string;
            };
            output: {
                estimatedPrice: number;
                priceRange: {
                    min: number;
                    max: number;
                };
                factors: string[];
                confidence: "Low" | "Medium" | "High";
                marketInsights: string;
            };
            meta: object;
        }>;
        assistant: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                query?: string;
                context?: string;
            };
            output: string;
            meta: object;
        }>;
    }>>;
    photoDocumentation: import("@trpc/server").TRPCBuiltRouter<{
        ctx: import("./_core/context.js").TrpcContext;
        meta: object;
        errorShape: import("@trpc/server").TRPCDefaultErrorShape;
        transformer: false;
    }, import("@trpc/server").TRPCDecorateCreateRouterOptions<{
        list: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                structureId?: number;
            };
            output: {
                id: number;
                structureId: number;
                photoType: "before" | "after" | "inspection" | "damage";
                photoUrl: string;
                caption: string;
                takenAt: Date;
                uploadedByUserId: number;
                metadata: string;
                createdAt: Date;
                updatedAt: Date;
            }[];
            meta: object;
        }>;
        upload: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                photoType?: "before" | "after" | "inspection" | "damage";
                structureId?: number;
                photoUrl?: string;
                caption?: string;
                takenAt?: Date;
            };
            output: {
                success: boolean;
            };
            meta: object;
        }>;
    }>>;
    ai: import("@trpc/server").TRPCBuiltRouter<{
        ctx: import("./_core/context.js").TrpcContext;
        meta: object;
        errorShape: import("@trpc/server").TRPCDefaultErrorShape;
        transformer: false;
    }, import("@trpc/server").TRPCDecorateCreateRouterOptions<{
        estimatePrice: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                type?: string;
                notes?: string;
                address?: string;
                dimensions?: string;
                material?: string;
            };
            output: {
                priceEstimate: number;
                reasoning: string;
            };
            meta: object;
        }>;
        generateQuote: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                type?: string;
                priceEstimate?: number;
                dimensions?: string;
                clientName?: string;
                locationTitle?: string;
                locationAddress?: string;
                contractDuration?: number;
            };
            output: string;
            meta: object;
        }>;
        predictRenewal: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                paymentStatus?: string;
                accountStatus?: string;
                contractStartDate?: Date;
                contractEndDate?: Date;
                rentAmount?: number;
                clientName?: string;
            };
            output: {
                likelihood: number;
                reasoning: string;
                recommendations: string[];
            };
            meta: object;
        }>;
    }>>;
}>>;
export type AppRouter = typeof appRouter;
//# sourceMappingURL=routers.d.ts.map