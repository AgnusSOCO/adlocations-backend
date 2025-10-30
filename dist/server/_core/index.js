import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "../routers.js";
import { createContext } from "./context.js";
import uploadRouter from "../upload.js";
function isPortAvailable(port) {
    return new Promise(resolve => {
        const server = net.createServer();
        server.listen(port, () => {
            server.close(() => resolve(true));
        });
        server.on("error", () => resolve(false));
    });
}
async function findAvailablePort(startPort = 3000) {
    for (let port = startPort; port < startPort + 20; port++) {
        if (await isPortAvailable(port)) {
            return port;
        }
    }
    throw new Error(`No available port found starting from ${startPort}`);
}
async function startServer() {
    const app = express();
    const server = createServer(app);
    app.use(express.json({ limit: "50mb" }));
    app.use(express.urlencoded({ limit: "50mb", extended: true }));
    app.use("/api", uploadRouter);
    app.use("/api/trpc", createExpressMiddleware({
        router: appRouter,
        createContext,
    }));
    const preferredPort = parseInt(process.env.PORT || "3000");
    const port = await findAvailablePort(preferredPort);
    if (port !== preferredPort) {
        console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
    }
    server.listen(port, () => {
        console.log(`Server running on http://localhost:${port}/`);
    });
}
startServer().catch(console.error);
//# sourceMappingURL=index.js.map