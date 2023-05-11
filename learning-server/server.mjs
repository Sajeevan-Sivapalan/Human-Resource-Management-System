import express from "express";
import { connectDB } from "./config/db.config.mjs";
import cors from "cors";
import { protect } from "./config/auth.mjs";
import morgan from "morgan";

import adminRouter from "./routes/admin.router.mjs";
import courseRouter from "./routes/course.router.mjs";
import moduleRouter from "./routes/module.router.mjs";
import departmenetRouter from "./routes/department.router.mjs";
import employeeRouter from "./routes/employee.router.mjs";

const app = express();

app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/learn/admin", adminRouter);
app.use("/api/learn/course", courseRouter);
app.use("/api/learn/module", moduleRouter);
app.use("/api/learn/dept", departmenetRouter);
app.use("/api/learn/employee", employeeRouter);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(8080, () => {
      console.log("Server started on port http://localhost:8080");
    });
  } catch (err) {
    console.log(err);
  }
};

export { startServer };
