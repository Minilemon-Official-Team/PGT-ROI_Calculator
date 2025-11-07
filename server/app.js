import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import express from "express";
import cors from "cors";
import router from "../server/routes/route.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router);

app.get("/", (req, res) => {
  res.status(200).json({
    statusCode: 200,
    message: "ROI Calculator App",
  });
});

// app.listen(port, () => {
//   console.log(`Server is running at: http://localhost:${port}`);
// });

export default app;
