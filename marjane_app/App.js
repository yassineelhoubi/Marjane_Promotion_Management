import express from "express";
import {adminRouter , subAdminRouter, managerRouter} from "./src/routes";
require("dotenv").config();
const app = express();
const host = process.env.host;
const port = process.env.port;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/admin" , adminRouter)
app.use("/api/subAdmin" , subAdminRouter)
app.use("/api/manager" , managerRouter)


app.listen(port, () => {
  console.log(`Running on http://${host}:${port}`);
});
