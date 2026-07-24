import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";

import router from "./routes/index.js";
import pool from "./database/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

const PgSession = connectPgSimple(session);

app.use(cors({
  origin: "http://localhost:5173", // your frontend
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    store: new PgSession({
      pool,
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    name: "sessionId",
    cookie: {
      httpOnly: true,
      secure: false,      // true in production with HTTPS
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

app.use("/", router);

app.listen(PORT, () => {
  console.log(`MediaVault API running at http://localhost:${PORT}`);
  console.log(`Health check at http://localhost:${PORT}/api/health`);
});