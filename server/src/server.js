import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/", router);

app.listen(PORT, () => {
  console.log(`MediaVault API running at http://localhost:${PORT}`);
  console.log(`Health check at http://localhost:${PORT}/api/health`);
});