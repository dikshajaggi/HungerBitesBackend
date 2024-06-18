import express, { Request, Response } from "express";
import "dotenv/config";
import connectDB from "./db";
import bodyParser from "body-parser";
import cors from "cors";
import RestaurantRoutes from "./routes/RestaurantRoutes";
import CartRoutes from "./routes/CartRoutes";
import FavRestRoutes from "./routes/FavRestRoutes"
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swaggerConfig";

const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }))
app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "health OK!" });
});

app.use('/api', RestaurantRoutes);
app.use('/api', CartRoutes);
app.use('/api', FavRestRoutes);

connectDB().then(() => {
  console.log('MongoDB connected');
  app.listen(7000, () => {
    console.log("server started on http://localhost:7000");
  });
}).catch(error => {
  console.error("MongoDB connection failed:", error);
});
