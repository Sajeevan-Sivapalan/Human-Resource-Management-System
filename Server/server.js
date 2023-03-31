const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });

const port = process.env.PORT || 5000;

const Db = process.env.ATLAS_URI;
mongoose.connect(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once("open", ()=> {
    console.log("Successfully connected to MongoDB.");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cors());
app.use(express.json());

//http://localhost:3000/EmployeeReqLeave
const employeeLeaveRequestData = require("./routes/EmployeeLeaveReq");
app.use('/EmployeeReqLeave', employeeLeaveRequestData);

//http://localhost:3000/AdminReqLeave
const adminEmpLeaveRequestData = require("./routes/EmployeeLeaveReq");
app.use('/AdminReqLeave', adminEmpLeaveRequestData);

//http://localhost:3000/Attendance
const employeeAttendanceData = require("./routes/EmployeeAttendance");
app.use('/Attendance', employeeAttendanceData);

//http://localhost:3000/SuspiciousEmpLeave
const suspiciousEmpLeaveData = require("./routes/SuspiciousEmpLeave");
app.use('/SuspiciousEmpLeave', suspiciousEmpLeaveData);
