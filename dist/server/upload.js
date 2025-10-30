import { Router } from "express";
import multer from "multer";
import { storagePut } from "./storage.js";
import crypto from "crypto";
const router = Router();
// Configure multer for memory storage
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        }
        else {
            cb(new Error("Only image files are allowed"));
        }
    },
});
router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        // Generate unique filename
        const randomSuffix = crypto.randomBytes(8).toString("hex");
        const ext = req.file.originalname.split(".").pop();
        const fileKey = `uploads/${Date.now()}-${randomSuffix}.${ext}`;
        // Upload to S3
        const result = await storagePut(fileKey, req.file.buffer, req.file.mimetype);
        res.json({
            success: true,
            url: result.url,
            key: result.key,
        });
    }
    catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({
            error: error instanceof Error ? error.message : "Upload failed",
        });
    }
});
export default router;
//# sourceMappingURL=upload.js.map