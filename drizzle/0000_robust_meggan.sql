CREATE TYPE "public"."accountStatus" AS ENUM('active', 'inactive', 'suspended');--> statement-breakpoint
CREATE TYPE "public"."type" AS ENUM('billboard', 'poster', 'digital', 'transit', 'street_furniture', 'other');--> statement-breakpoint
CREATE TYPE "public"."availabilityStatus" AS ENUM('available', 'occupied', 'maintenance', 'pending');--> statement-breakpoint
CREATE TYPE "public"."maintenanceStatus" AS ENUM('good', 'needs_attention', 'critical');--> statement-breakpoint
CREATE TYPE "public"."paymentStatus" AS ENUM('paid', 'pending', 'overdue');--> statement-breakpoint
CREATE TYPE "public"."photoType" AS ENUM('before', 'after', 'inspection', 'damage');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('user', 'admin', 'sales_rep', 'maintenance', 'viewer');--> statement-breakpoint
CREATE TABLE "adLocations" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "adLocations_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar(255) NOT NULL,
	"address" text NOT NULL,
	"latitude" varchar(50),
	"longitude" varchar(50),
	"dimensions" varchar(100),
	"type" "type" DEFAULT 'billboard' NOT NULL,
	"material" varchar(100),
	"hasVinyl" integer DEFAULT 0 NOT NULL,
	"photos" text,
	"mapLink" text,
	"availabilityStatus" "availabilityStatus" DEFAULT 'available' NOT NULL,
	"priceEstimate" integer,
	"notes" text,
	"landlordId" integer,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "clients" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "clients_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"email" varchar(320),
	"phone" varchar(50),
	"company" varchar(255),
	"adRentedId" integer,
	"rentalStartDate" timestamp,
	"rentalEndDate" timestamp,
	"rentAmount" integer,
	"paymentStatus" "paymentStatus" DEFAULT 'pending' NOT NULL,
	"accountStatus" "accountStatus" DEFAULT 'active' NOT NULL,
	"assignedSalesRepId" integer,
	"notes" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "landlords" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "landlords_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"email" varchar(320),
	"phone" varchar(50),
	"company" varchar(255),
	"rentalSite" text,
	"contractStartDate" timestamp,
	"contractEndDate" timestamp,
	"rentAmount" integer,
	"paymentStatus" "paymentStatus" DEFAULT 'pending' NOT NULL,
	"notes" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "photoDocumentation" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "photoDocumentation_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"structureId" integer NOT NULL,
	"photoType" "photoType" DEFAULT 'inspection' NOT NULL,
	"photoUrl" varchar(500) NOT NULL,
	"caption" text,
	"takenAt" timestamp DEFAULT now() NOT NULL,
	"uploadedByUserId" integer,
	"metadata" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "structures" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "structures_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"adLocationId" integer NOT NULL,
	"maintenanceStatus" "maintenanceStatus" DEFAULT 'good' NOT NULL,
	"licenseFileUrl" text,
	"licenseExpiryDate" timestamp,
	"lastMaintenanceDate" timestamp,
	"nextMaintenanceDate" timestamp,
	"technicianNotes" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "structures_adLocationId_unique" UNIQUE("adLocationId")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"auth_user_id" uuid NOT NULL,
	"name" text,
	"email" varchar(320),
	"loginMethod" varchar(64),
	"role" "role" DEFAULT 'user' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"lastSignedIn" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_auth_user_id_unique" UNIQUE("auth_user_id")
);
