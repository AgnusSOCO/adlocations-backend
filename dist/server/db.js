import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { users, adLocations, landlords, clients, structures } from "../drizzle/schema.js";
import { ENV } from './_core/env.js';
let _db = null;
export async function getDb() {
    if (!_db && ENV.databaseUrl) {
        try {
            const client = postgres(ENV.databaseUrl);
            _db = drizzle(client);
        }
        catch (error) {
            console.warn("[Database] Failed to connect:", error);
            _db = null;
        }
    }
    return _db;
}
export async function getUserByAuthUserId(authUserId) {
    const db = await getDb();
    if (!db) {
        console.warn("[Database] Cannot get user: database not available");
        return undefined;
    }
    const result = await db.select().from(users).where(eq(users.authUserId, authUserId)).limit(1);
    return result.length > 0 ? result[0] : undefined;
}
export async function upsertUserFromAuth(data) {
    const db = await getDb();
    if (!db) {
        console.warn("[Database] Cannot upsert user: database not available");
        return;
    }
    try {
        const now = new Date();
        const values = {
            authUserId: data.authUserId,
            email: data.email,
            name: data.name,
            role: (data.role || 'user'),
            createdAt: now,
            updatedAt: now,
            lastSignedIn: now,
        };
        await db.insert(users).values(values).onConflictDoUpdate({
            target: users.authUserId,
            set: {
                email: data.email,
                name: data.name,
                updatedAt: now,
                lastSignedIn: now,
            },
        });
    }
    catch (error) {
        console.error("[Database] Failed to upsert user:", error);
        throw error;
    }
}
// Ad Locations queries
export async function getAllAdLocations() {
    const db = await getDb();
    if (!db)
        return [];
    return await db.select().from(adLocations);
}
export async function getAdLocationById(id) {
    const db = await getDb();
    if (!db)
        return undefined;
    const result = await db.select().from(adLocations).where(eq(adLocations.id, id)).limit(1);
    return result.length > 0 ? result[0] : undefined;
}
export async function createAdLocation(data) {
    const db = await getDb();
    if (!db)
        throw new Error("Database not available");
    const result = await db.insert(adLocations).values(data);
    return result;
}
export async function updateAdLocation(id, data) {
    const db = await getDb();
    if (!db)
        throw new Error("Database not available");
    await db.update(adLocations).set(data).where(eq(adLocations.id, id));
    return await getAdLocationById(id);
}
export async function deleteAdLocation(id) {
    const db = await getDb();
    if (!db)
        throw new Error("Database not available");
    await db.delete(adLocations).where(eq(adLocations.id, id));
    return { success: true };
}
// Landlords queries
export async function getAllLandlords() {
    const db = await getDb();
    if (!db)
        return [];
    return await db.select().from(landlords);
}
export async function getLandlordById(id) {
    const db = await getDb();
    if (!db)
        return undefined;
    const result = await db.select().from(landlords).where(eq(landlords.id, id)).limit(1);
    return result.length > 0 ? result[0] : undefined;
}
export async function createLandlord(data) {
    const db = await getDb();
    if (!db)
        throw new Error("Database not available");
    const result = await db.insert(landlords).values(data);
    return result;
}
export async function updateLandlord(id, data) {
    const db = await getDb();
    if (!db)
        throw new Error("Database not available");
    await db.update(landlords).set(data).where(eq(landlords.id, id));
    return await getLandlordById(id);
}
export async function deleteLandlord(id) {
    const db = await getDb();
    if (!db)
        throw new Error("Database not available");
    await db.delete(landlords).where(eq(landlords.id, id));
    return { success: true };
}
// Clients queries
export async function getAllClients() {
    const db = await getDb();
    if (!db)
        return [];
    return await db.select().from(clients);
}
export async function getClientById(id) {
    const db = await getDb();
    if (!db)
        return undefined;
    const result = await db.select().from(clients).where(eq(clients.id, id)).limit(1);
    return result.length > 0 ? result[0] : undefined;
}
export async function createClient(data) {
    const db = await getDb();
    if (!db)
        throw new Error("Database not available");
    const result = await db.insert(clients).values(data);
    return result;
}
export async function updateClient(id, data) {
    const db = await getDb();
    if (!db)
        throw new Error("Database not available");
    await db.update(clients).set(data).where(eq(clients.id, id));
    return await getClientById(id);
}
export async function deleteClient(id) {
    const db = await getDb();
    if (!db)
        throw new Error("Database not available");
    await db.delete(clients).where(eq(clients.id, id));
    return { success: true };
}
// Structures queries
export async function getAllStructures() {
    const db = await getDb();
    if (!db)
        return [];
    return await db.select().from(structures);
}
export async function getStructureById(id) {
    const db = await getDb();
    if (!db)
        return undefined;
    const result = await db.select().from(structures).where(eq(structures.id, id)).limit(1);
    return result.length > 0 ? result[0] : undefined;
}
export async function getStructureByAdLocationId(adLocationId) {
    const db = await getDb();
    if (!db)
        return undefined;
    const result = await db.select().from(structures).where(eq(structures.adLocationId, adLocationId)).limit(1);
    return result.length > 0 ? result[0] : undefined;
}
export async function createStructure(data) {
    const db = await getDb();
    if (!db)
        throw new Error("Database not available");
    const result = await db.insert(structures).values(data);
    return result;
}
export async function updateStructure(id, data) {
    const db = await getDb();
    if (!db)
        throw new Error("Database not available");
    await db.update(structures).set(data).where(eq(structures.id, id));
    return await getStructureById(id);
}
export async function deleteStructure(id) {
    const db = await getDb();
    if (!db)
        throw new Error("Database not available");
    await db.delete(structures).where(eq(structures.id, id));
    return { success: true };
}
//# sourceMappingURL=db.js.map