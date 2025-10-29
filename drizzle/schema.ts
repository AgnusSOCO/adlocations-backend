import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin", "sales_rep", "maintenance", "viewer"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Ad Locations Management Tables

export const landlords = mysqlTable("landlords", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 50 }),
  company: varchar("company", { length: 255 }),
  rentalSite: text("rentalSite"),
  contractStartDate: timestamp("contractStartDate"),
  contractEndDate: timestamp("contractEndDate"),
  rentAmount: int("rentAmount"),
  paymentStatus: mysqlEnum("paymentStatus", ["paid", "pending", "overdue"]).notNull().default("pending"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const adLocations = mysqlTable("adLocations", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  address: text("address").notNull(),
  latitude: varchar("latitude", { length: 50 }),
  longitude: varchar("longitude", { length: 50 }),
  dimensions: varchar("dimensions", { length: 100 }),
  type: mysqlEnum("type", ["billboard", "poster", "digital", "transit", "street_furniture", "other"]).notNull().default("billboard"),
  material: varchar("material", { length: 100 }),
  hasVinyl: int("hasVinyl").notNull().default(0),
  photos: text("photos"),
  mapLink: text("mapLink"),
  availabilityStatus: mysqlEnum("availabilityStatus", ["available", "occupied", "maintenance", "pending"]).notNull().default("available"),
  priceEstimate: int("priceEstimate"),
  notes: text("notes"),
  landlordId: int("landlordId"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const clients = mysqlTable("clients", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 50 }),
  company: varchar("company", { length: 255 }),
  adRentedId: int("adRentedId"),
  rentalStartDate: timestamp("rentalStartDate"),
  rentalEndDate: timestamp("rentalEndDate"),
  rentAmount: int("rentAmount"),
  paymentStatus: mysqlEnum("paymentStatus", ["paid", "pending", "overdue"]).notNull().default("pending"),
  accountStatus: mysqlEnum("accountStatus", ["active", "inactive", "suspended"]).notNull().default("active"),
  assignedSalesRepId: int("assignedSalesRepId"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const structures = mysqlTable("structures", {
  id: int("id").autoincrement().primaryKey(),
  adLocationId: int("adLocationId").notNull().unique(),
  maintenanceStatus: mysqlEnum("maintenanceStatus", ["good", "needs_attention", "critical"]).notNull().default("good"),
  licenseFileUrl: text("licenseFileUrl"),
  licenseExpiryDate: timestamp("licenseExpiryDate"),
  lastMaintenanceDate: timestamp("lastMaintenanceDate"),
  nextMaintenanceDate: timestamp("nextMaintenanceDate"),
  technicianNotes: text("technicianNotes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// Type exports
export type AdLocation = typeof adLocations.$inferSelect;
export type InsertAdLocation = typeof adLocations.$inferInsert;

export type Landlord = typeof landlords.$inferSelect;
export type InsertLandlord = typeof landlords.$inferInsert;

export type Client = typeof clients.$inferSelect;
export type InsertClient = typeof clients.$inferInsert;

export type Structure = typeof structures.$inferSelect;
export type InsertStructure = typeof structures.$inferInsert;

// Photo Documentation table
export const photoDocumentation = mysqlTable("photoDocumentation", {
  id: int("id").autoincrement().primaryKey(),
  structureId: int("structureId").notNull(),
  photoType: mysqlEnum("photoType", ["before", "after", "inspection", "damage"]).default("inspection").notNull(),
  photoUrl: varchar("photoUrl", { length: 500 }).notNull(),
  caption: text("caption"),
  takenAt: timestamp("takenAt").defaultNow().notNull(),
  uploadedByUserId: int("uploadedByUserId"),
  metadata: text("metadata"), // JSON string
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PhotoDocumentation = typeof photoDocumentation.$inferSelect;
export type InsertPhotoDocumentation = typeof photoDocumentation.$inferInsert;