CREATE TABLE `adLocations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`address` text NOT NULL,
	`latitude` varchar(50),
	`longitude` varchar(50),
	`dimensions` varchar(100),
	`type` enum('billboard','poster','digital','transit','street_furniture','other') NOT NULL DEFAULT 'billboard',
	`material` varchar(100),
	`hasVinyl` int NOT NULL DEFAULT 0,
	`photos` text,
	`mapLink` text,
	`availabilityStatus` enum('available','occupied','maintenance','pending') NOT NULL DEFAULT 'available',
	`priceEstimate` int,
	`notes` text,
	`landlordId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `adLocations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `clients` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320),
	`phone` varchar(50),
	`company` varchar(255),
	`adRentedId` int,
	`rentalStartDate` timestamp,
	`rentalEndDate` timestamp,
	`rentAmount` int,
	`paymentStatus` enum('paid','pending','overdue') NOT NULL DEFAULT 'pending',
	`accountStatus` enum('active','inactive','suspended') NOT NULL DEFAULT 'active',
	`assignedSalesRepId` int,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `clients_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `landlords` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320),
	`phone` varchar(50),
	`company` varchar(255),
	`rentalSite` text,
	`contractStartDate` timestamp,
	`contractEndDate` timestamp,
	`rentAmount` int,
	`paymentStatus` enum('paid','pending','overdue') NOT NULL DEFAULT 'pending',
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `landlords_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `structures` (
	`id` int AUTO_INCREMENT NOT NULL,
	`adLocationId` int NOT NULL,
	`maintenanceStatus` enum('good','needs_attention','critical') NOT NULL DEFAULT 'good',
	`licenseFileUrl` text,
	`licenseExpiryDate` timestamp,
	`lastMaintenanceDate` timestamp,
	`nextMaintenanceDate` timestamp,
	`technicianNotes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `structures_id` PRIMARY KEY(`id`),
	CONSTRAINT `structures_adLocationId_unique` UNIQUE(`adLocationId`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('user','admin','sales_rep','maintenance','viewer') NOT NULL DEFAULT 'user';