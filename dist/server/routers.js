import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { photoDocumentation } from "../drizzle/schema";
import { eq, desc } from "drizzle-orm";
import { getDb } from "./db";
import { estimateAdPrice, generateQuote, predictRenewalLikelihood } from "./ai";
import * as deepseek from "./deepseek";
// Validation schemas
const adLocationSchema = z.object({
    title: z.string().min(1),
    address: z.string().min(1),
    latitude: z.string().optional(),
    longitude: z.string().optional(),
    dimensions: z.string().optional(),
    type: z.enum(["billboard", "poster", "digital", "transit", "street_furniture", "other"]).default("billboard"),
    material: z.string().optional(),
    hasVinyl: z.number().int().min(0).max(1).default(0),
    photos: z.string().optional(),
    mapLink: z.string().optional(),
    availabilityStatus: z.enum(["available", "occupied", "maintenance", "pending"]).default("available"),
    priceEstimate: z.number().int().optional(),
    notes: z.string().optional(),
    landlordId: z.number().int().optional(),
});
const landlordSchema = z.object({
    name: z.string().min(1),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    company: z.string().optional(),
    rentalSite: z.string().optional(),
    contractStartDate: z.date().optional(),
    contractEndDate: z.date().optional(),
    rentAmount: z.number().int().optional(),
    paymentStatus: z.enum(["paid", "pending", "overdue"]).default("pending"),
    notes: z.string().optional(),
});
const clientSchema = z.object({
    name: z.string().min(1),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    company: z.string().optional(),
    adRentedId: z.number().int().optional(),
    rentalStartDate: z.date().optional(),
    rentalEndDate: z.date().optional(),
    rentAmount: z.number().int().optional(),
    paymentStatus: z.enum(["paid", "pending", "overdue"]).default("pending"),
    accountStatus: z.enum(["active", "inactive", "suspended"]).default("active"),
    assignedSalesRepId: z.number().int().optional(),
    notes: z.string().optional(),
});
const structureSchema = z.object({
    adLocationId: z.number().int(),
    maintenanceStatus: z.enum(["good", "needs_attention", "critical"]).default("good"),
    licenseFileUrl: z.string().optional(),
    licenseExpiryDate: z.date().optional(),
    lastMaintenanceDate: z.date().optional(),
    nextMaintenanceDate: z.date().optional(),
    technicianNotes: z.string().optional(),
});
export const appRouter = router({
    system: systemRouter,
    auth: router({
        me: publicProcedure.query(opts => opts.ctx.user),
        logout: publicProcedure.mutation(() => {
            return {
                success: true,
            };
        }),
    }),
    // Ad Locations router
    adLocations: router({
        list: publicProcedure.query(async () => {
            return await db.getAllAdLocations();
        }),
        getById: publicProcedure
            .input(z.object({ id: z.number() }))
            .query(async ({ input }) => {
            return await db.getAdLocationById(input.id);
        }),
        create: protectedProcedure
            .input(adLocationSchema)
            .mutation(async ({ input }) => {
            return await db.createAdLocation(input);
        }),
        update: protectedProcedure
            .input(z.object({
            id: z.number(),
            data: adLocationSchema.partial(),
        }))
            .mutation(async ({ input }) => {
            return await db.updateAdLocation(input.id, input.data);
        }),
        delete: protectedProcedure
            .input(z.object({ id: z.number() }))
            .mutation(async ({ input }) => {
            return await db.deleteAdLocation(input.id);
        }),
    }),
    // Landlords router
    landlords: router({
        list: publicProcedure.query(async () => {
            return await db.getAllLandlords();
        }),
        getById: publicProcedure
            .input(z.object({ id: z.number() }))
            .query(async ({ input }) => {
            return await db.getLandlordById(input.id);
        }),
        create: protectedProcedure
            .input(landlordSchema)
            .mutation(async ({ input }) => {
            return await db.createLandlord(input);
        }),
        update: protectedProcedure
            .input(z.object({
            id: z.number(),
            data: landlordSchema.partial(),
        }))
            .mutation(async ({ input }) => {
            return await db.updateLandlord(input.id, input.data);
        }),
        delete: protectedProcedure
            .input(z.object({ id: z.number() }))
            .mutation(async ({ input }) => {
            return await db.deleteLandlord(input.id);
        }),
    }),
    // Clients router
    clients: router({
        list: publicProcedure.query(async () => {
            return await db.getAllClients();
        }),
        getById: publicProcedure
            .input(z.object({ id: z.number() }))
            .query(async ({ input }) => {
            return await db.getClientById(input.id);
        }),
        create: protectedProcedure
            .input(clientSchema)
            .mutation(async ({ input }) => {
            return await db.createClient(input);
        }),
        update: protectedProcedure
            .input(z.object({
            id: z.number(),
            data: clientSchema.partial(),
        }))
            .mutation(async ({ input }) => {
            return await db.updateClient(input.id, input.data);
        }),
        delete: protectedProcedure
            .input(z.object({ id: z.number() }))
            .mutation(async ({ input }) => {
            return await db.deleteClient(input.id);
        }),
    }),
    // Structures router
    structures: router({
        list: publicProcedure.query(async () => {
            return await db.getAllStructures();
        }),
        getById: publicProcedure
            .input(z.object({ id: z.number() }))
            .query(async ({ input }) => {
            return await db.getStructureById(input.id);
        }),
        getByAdLocationId: publicProcedure
            .input(z.object({ adLocationId: z.number() }))
            .query(async ({ input }) => {
            return await db.getStructureByAdLocationId(input.adLocationId);
        }),
        create: protectedProcedure
            .input(structureSchema)
            .mutation(async ({ input }) => {
            return await db.createStructure(input);
        }),
        update: protectedProcedure
            .input(z.object({
            id: z.number(),
            data: structureSchema.partial(),
        }))
            .mutation(async ({ input }) => {
            return await db.updateStructure(input.id, input.data);
        }),
        delete: protectedProcedure
            .input(z.object({ id: z.number() }))
            .mutation(async ({ input }) => {
            return await db.deleteStructure(input.id);
        }),
    }),
    // DeepSeek AI Features router
    deepseek: router({
        analyzeLocation: protectedProcedure
            .input(z.object({
            photoUrl: z.string(),
            title: z.string(),
            address: z.string(),
            type: z.string(),
            dimensions: z.string().optional(),
        }))
            .mutation(async ({ input }) => {
            return await deepseek.analyzeLocationPhoto(input.photoUrl, {
                title: input.title,
                address: input.address,
                type: input.type,
                dimensions: input.dimensions,
            });
        }),
        reviewContract: protectedProcedure
            .input(z.object({ contractText: z.string() }))
            .mutation(async ({ input }) => {
            return await deepseek.reviewContract(input.contractText);
        }),
        predictMaintenance: protectedProcedure
            .input(z.object({
            type: z.string().min(1),
            lastInspectionDate: z.date().optional(),
            maintenanceStatus: z.string().min(1),
            technicianNotes: z.string().optional(),
            age: z.number().optional(),
        }))
            .mutation(async ({ input }) => {
            return await deepseek.predictMaintenance(input);
        }),
        generateEmail: protectedProcedure
            .input(z.object({
            purpose: z.enum(["quote", "renewal", "maintenance", "general"]),
            clientName: z.string().min(1),
            locationDetails: z.string().optional(),
            additionalInfo: z.string().optional(),
        }))
            .mutation(async ({ input }) => {
            return await deepseek.generateClientEmail(input);
        }),
        enhancedPricing: protectedProcedure
            .input(z.object({
            address: z.string().min(1),
            type: z.string().min(1),
            dimensions: z.string().optional(),
            visibility: z.string().optional(),
            traffic: z.string().optional(),
            demographics: z.string().optional(),
        }))
            .mutation(async ({ input }) => {
            return await deepseek.enhancedPriceEstimation(input);
        }),
        assistant: protectedProcedure
            .input(z.object({
            query: z.string(),
            context: z.string().optional(),
        }))
            .mutation(async ({ input }) => {
            return await deepseek.aiAssistant(input.query, input.context);
        }),
    }),
    // Photo Documentation router
    photoDocumentation: router({ list: publicProcedure
            .input(z.object({ structureId: z.number() }))
            .query(async ({ input }) => {
            const database = await getDb();
            if (!database)
                return [];
            return database.select().from(photoDocumentation)
                .where(eq(photoDocumentation.structureId, input.structureId))
                .orderBy(desc(photoDocumentation.takenAt));
        }),
        upload: protectedProcedure
            .input(z.object({
            structureId: z.number(),
            photoType: z.enum(["before", "after", "inspection", "damage"]),
            photoUrl: z.string(),
            caption: z.string().optional(),
            takenAt: z.date(),
        }))
            .mutation(async ({ input, ctx }) => {
            const database = await getDb();
            if (!database)
                throw new Error("Database not available");
            await database.insert(photoDocumentation).values({
                structureId: input.structureId,
                photoType: input.photoType,
                photoUrl: input.photoUrl,
                caption: input.caption,
                takenAt: input.takenAt,
                uploadedByUserId: ctx.user.id,
            });
            return { success: true };
        }),
    }),
    // AI Features router
    ai: router({
        estimatePrice: protectedProcedure
            .input(z.object({
            type: z.string().min(1),
            dimensions: z.string().optional(),
            address: z.string().min(1),
            material: z.string().optional(),
            notes: z.string().optional(),
        }))
            .mutation(async ({ input }) => {
            return await estimateAdPrice(input);
        }),
        generateQuote: protectedProcedure
            .input(z.object({
            clientName: z.string().min(1),
            locationTitle: z.string().min(1),
            locationAddress: z.string().min(1),
            dimensions: z.string().optional(),
            type: z.string().min(1),
            priceEstimate: z.number(),
            contractDuration: z.number(),
        }))
            .mutation(async ({ input }) => {
            return await generateQuote(input);
        }),
        predictRenewal: protectedProcedure
            .input(z.object({
            clientName: z.string().min(1),
            paymentStatus: z.string().min(1),
            accountStatus: z.string().min(1),
            contractStartDate: z.date(),
            contractEndDate: z.date(),
            rentAmount: z.number(),
        }))
            .mutation(async ({ input }) => {
            return await predictRenewalLikelihood(input);
        }),
    }),
});
//# sourceMappingURL=routers.js.map