import express from "express";
import "dotenv/config";
import connectDB from "./db.js";
import bodyParser from "body-parser";
import cors from "cors";
import RestaurantRoutes from "./routes/RestaurantRoutes.js";
import CartRoutes from "./routes/CartRoutes.js";
import FavRestRoutes from "./routes/FavRestRoutes.js"
import CategoryRoutes from "./routes/CategoryRoutes.js"
import SearchRoutes from "./routes/SearchRoutes.js"
import OrderRoutes from "./routes/OrderRoutes.js"
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swaggerConfig.js";
import http from "http"
import { Server } from 'socket.io';

const app = express();
const port = process.env.PORT || 7000

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }))
app.get("/health", async (req, res) => {
  res.send({ message: "health OK!" });
});

app.use('/api', RestaurantRoutes);
app.use('/api', CartRoutes);
app.use('/api', FavRestRoutes);
app.use('/api', CategoryRoutes);
app.use('/api', SearchRoutes);
app.use('/api', OrderRoutes);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  // // Handle other events
  // socket.on('someEvent', (data) => {
  //   console.log('someEvent received:', data);
  //   // Handle the event
  // });
});

connectDB().then(() => {
  console.log('MongoDB connected');
  server.listen(port, () => {
    console.log(`server started on http://localhost:${port}`);
  });
}).catch(error => {
  console.error("MongoDB connection failed:", error);
});
