import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; // Added
import rateLimit from "express-rate-limit";
import { errorHandler } from "./middleware/error.middleware";
import memberRoutes from "./routes/member.routes";
import authRoutes from "./routes/auth.routes";
import dueRoutes from "./routes/due.routes";
import eventRoutes from "./routes/event.routes";
import transactionRoutes from "./routes/transaction.routes";
import reportRoutes from "./routes/report.routes";
import walletRoutes from "./routes/wallet.routes";
import webhookRoutes from "./routes/webhooks.routes";

const app = express();

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from your frontend
    credentials: true, // Allow cookies to be sent
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Allow CRUD operations
  })
);

app.use(express.json()); // Enable JSON body parser
app.use(cookieParser()); // Added

// Apply the rate limiting middleware to all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: "Too many requests from this IP, please try again after 15 minutes",
});

app.use(limiter);

app.use("/api/members", memberRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dues", dueRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/webhooks", webhookRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error handling middleware
app.use(errorHandler);

export default app;
