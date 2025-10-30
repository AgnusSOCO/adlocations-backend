import { integer, pgEnum, pgTable, text, timestamp, varchar, uuid } from "drizzle-orm/pg-core";
export const roleEnum = pgEnum("role", ["user", "admin", "sales_rep", "maintenance", "viewer"]);
export const users = pgTable("users", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    authUserId: uuid("auth_user_id").notNull().unique(),
    name: text("name"),
    email: varchar("email", { length: 320 }),
    loginMethod: varchar("loginMethod", { length: 64 }),
    role: roleEnum("role").default("user").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
    lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});
export const paymentStatusEnum = pgEnum("paymentStatus", ["paid", "pending", "overdue"]);
export const accountStatusEnum = pgEnum("accountStatus", ["active", "inactive", "suspended"]);
export const adTypeEnum = pgEnum("type", ["billboard", "poster", "digital", "transit", "street_furniture", "other"]);
export const availabilityStatusEnum = pgEnum("availabilityStatus", ["available", "occupied", "maintenance", "pending"]);
export const maintenanceStatusEnum = pgEnum("maintenanceStatus", ["good", "needs_attention", "critical"]);
export const photoTypeEnum = pgEnum("photoType", ["before", "after", "inspection", "damage"]);
export const landlords = pgTable("landlords", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 320 }),
    phone: varchar("phone", { length: 50 }),
    company: varchar("company", { length: 255 }),
    rentalSite: text("rentalSite"),
    contractStartDate: timestamp("contractStartDate"),
    contractEndDate: timestamp("contractEndDate"),
    rentAmount: integer("rentAmount"),
    paymentStatus: paymentStatusEnum("paymentStatus").notNull().default("pending"),
    notes: text("notes"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export const adLocations = pgTable("adLocations", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    title: varchar("title", { length: 255 }).notNull(),
    address: text("address").notNull(),
    latitude: varchar("latitude", { length: 50 }),
    longitude: varchar("longitude", { length: 50 }),
    dimensions: varchar("dimensions", { length: 100 }),
    type: adTypeEnum("type").notNull().default("billboard"),
    material: varchar("material", { length: 100 }),
    hasVinyl: integer("hasVinyl").notNull().default(0),
    photos: text("photos"),
    mapLink: text("mapLink"),
    availabilityStatus: availabilityStatusEnum("availabilityStatus").notNull().default("available"),
    priceEstimate: integer("priceEstimate"),
    notes: text("notes"),
    landlordId: integer("landlordId"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export const clients = pgTable("clients", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 320 }),
    phone: varchar("phone", { length: 50 }),
    company: varchar("company", { length: 255 }),
    adRentedId: integer("adRentedId"),
    rentalStartDate: timestamp("rentalStartDate"),
    rentalEndDate: timestamp("rentalEndDate"),
    rentAmount: integer("rentAmount"),
    paymentStatus: paymentStatusEnum("paymentStatus").notNull().default("pending"),
    accountStatus: accountStatusEnum("accountStatus").notNull().default("active"),
    assignedSalesRepId: integer("assignedSalesRepId"),
    notes: text("notes"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export const structures = pgTable("structures", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    adLocationId: integer("adLocationId").notNull().unique(),
    maintenanceStatus: maintenanceStatusEnum("maintenanceStatus").notNull().default("good"),
    licenseFileUrl: text("licenseFileUrl"),
    licenseExpiryDate: timestamp("licenseExpiryDate"),
    lastMaintenanceDate: timestamp("lastMaintenanceDate"),
    nextMaintenanceDate: timestamp("nextMaintenanceDate"),
    technicianNotes: text("technicianNotes"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export const photoDocumentation = pgTable("photoDocumentation", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    structureId: integer("structureId").notNull(),
    photoType: photoTypeEnum("photoType").default("inspection").notNull(),
    photoUrl: varchar("photoUrl", { length: 500 }).notNull(),
    caption: text("caption"),
    takenAt: timestamp("takenAt").defaultNow().notNull(),
    uploadedByUserId: integer("uploadedByUserId"),
    metadata: text("metadata"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
//# sourceMappingURL=schema.js.map