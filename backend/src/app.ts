import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; // Added
import { errorHandler } from "./middleware/error.middleware";
import memberRoutes from "./routes/member.routes";
import authRoutes from "./routes/auth.routes";
import duesRoutes from "./routes/dues.routes";
import eventRoutes from "./routes/event.routes";
import transactionRoutes from "./routes/transaction.routes";
import reportRoutes from "./routes/report.routes";

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

app.use("/api/members", memberRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dues", duesRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/reports", reportRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error handling middleware
app.use(errorHandler);

export default app;
