import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

mongoose.set('strictQuery', false)

// express app
const app: Express = express();
const port = process.env.PORT;

// middleware

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.path, req.method);
  next();
});

// routes
// app.use("/api/recipes", recipeRoutes);
// app.use("/api/user", userRoutes)

// connect to db
const MONGO_URI = process.env.MONGO_URI;
if(!MONGO_URI) {
  throw new Error("No env variable available!")
}

// if(app.get("env") === "development") {
//   app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   })
// }

mongoose
  .connect(MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port} & connected to DB`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
