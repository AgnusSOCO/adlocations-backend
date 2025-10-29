import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, adLocations, InsertAdLocation, landlords, InsertLandlord, clients, InsertClient, structures, InsertStructure } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Ad Locations queries
export async function getAllAdLocations() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(adLocations);
}

export async function getAdLocationById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(adLocations).where(eq(adLocations.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createAdLocation(data: InsertAdLocation) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(adLocations).values(data);
  return result;
}

export async function updateAdLocation(id: number, data: Partial<InsertAdLocation>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(adLocations).set(data).where(eq(adLocations.id, id));
  return await getAdLocationById(id);
}

export async function deleteAdLocation(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(adLocations).where(eq(adLocations.id, id));
  return { success: true };
}

// Landlords queries
export async function getAllLandlords() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(landlords);
}

export async function getLandlordById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(landlords).where(eq(landlords.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createLandlord(data: InsertLandlord) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(landlords).values(data);
  return result;
}

export async function updateLandlord(id: number, data: Partial<InsertLandlord>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(landlords).set(data).where(eq(landlords.id, id));
  return await getLandlordById(id);
}

export async function deleteLandlord(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(landlords).where(eq(landlords.id, id));
  return { success: true };
}

// Clients queries
export async function getAllClients() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(clients);
}

export async function getClientById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(clients).where(eq(clients.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createClient(data: InsertClient) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(clients).values(data);
  return result;
}

export async function updateClient(id: number, data: Partial<InsertClient>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(clients).set(data).where(eq(clients.id, id));
  return await getClientById(id);
}

export async function deleteClient(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(clients).where(eq(clients.id, id));
  return { success: true };
}

// Structures queries
export async function getAllStructures() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(structures);
}

export async function getStructureById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(structures).where(eq(structures.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getStructureByAdLocationId(adLocationId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(structures).where(eq(structures.adLocationId, adLocationId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createStructure(data: InsertStructure) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(structures).values(data);
  return result;
}

export async function updateStructure(id: number, data: Partial<InsertStructure>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(structures).set(data).where(eq(structures.id, id));
  return await getStructureById(id);
}

export async function deleteStructure(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(structures).where(eq(structures.id, id));
  return { success: true };
}
