CREATE TABLE `photoDocumentation` (
	`id` int AUTO_INCREMENT NOT NULL,
	`structureId` int NOT NULL,
	`photoType` enum('before','after','inspection','damage') NOT NULL DEFAULT 'inspection',
	`photoUrl` varchar(500) NOT NULL,
	`caption` text,
	`takenAt` timestamp NOT NULL DEFAULT (now()),
	`uploadedByUserId` int,
	`metadata` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `photoDocumentation_id` PRIMARY KEY(`id`)
);
