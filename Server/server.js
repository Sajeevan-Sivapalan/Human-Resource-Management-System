const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { spawn,execSync } = require('child_process');
const app = express();
const cors = require("cors");
const corsOptions = require ('./config/corsOptions')
require("dotenv").config({ path: "./.env" });
const port = process.env.PORT || 5000;
const resourceRoutes = require('./routes/resourceRoutes')

//transport management

const VehicleRoutes = require("./routes/Vehicle.routes"); 
const RouteRoutes = require("./routes/Route.routes");
const TransportPaymentRoutes = require("./routes/TransportPayment.routes");
const ApplyTransportRoutes = require("./routes/ApplyTransport.routes");

//payroll

const {errorHandlerAbdul } = require('./middleware/errorMiddleware.js')

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

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

//user management
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const { logger, logEvents } = require('./middleware/logger')
app.use(cors(corsOptions))
// app.use(logger)
app.use(cookieParser())
//end user management

app.use(cors());



// Set up CORS middleware to allow requests from localhost:3000 with credentials
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

//user management routes
app.use('/auth', require('./routes/authRoutes'))
app.use('/users', require('./routes/userRoutes'))

//payroll management
app.use('/api/payrolls', require('./routes/payrollRoutes'))

//resource management
app.use("/api/resources",resourceRoutes)

//transport management
app.use("/api/Vehicle", VehicleRoutes);
app.use("/api/Route",RouteRoutes);
app.use("/api/TransportPayment",TransportPaymentRoutes);
app.use("/api/ApplyTransport",ApplyTransportRoutes);

//job and vacancy management

app.use('/resume', require('./routes/resumeRoutes'))
app.use('/jobopenings', require('./routes/vacancyRoutes'))
app.post('/run-python-script', (req, res) => {
  const { resume, requirements } = req.body;
  resume_path = "D:\\AYU\\tutorialexcercises\\django\\mern_stack_course-main\\lesson_13-backend\\resumepython\\RESUMESPDF\\AdamLechockiResume.pdf";
  //requirements2 = ["P,Healthcare Business Analyst,Healthcare Business Analyst,FL Lessard,Junior Healthcare Business Analyst,TX Bolt,TX,Assisted,Business Analysis,Data Science,Healthcare Industry,eCornell,Coursera,SQL Power BI,EDUCATION,M.S. Business Analytics University of Houston,Dallas,TX,B.S. Business Administration University at Buffalo Buﬀalo,NY,Data Visualization Able,eHealthcare Business Analyst,linkedin.com/in/carolinemadden,Miami,MADDEN"];
  //const python = spawn('python', ['script.py', resume_path, requirements]);
  let requirements2=requirements.join(" ").replace(/ /g, "_");
  const output = execSync(`python script.py "${resume}" "${requirements2}"`).toString();
  last_line = output.split('\n');
  res.send(last_line[last_line.length - 2]);
  console.log(last_line[last_line.length - 2]);

  /*python.stdout.on('data', (data) => {
    const output = data.toString();
    res.send(output);
  });

  python.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  python.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });*/
});

//Leave and attendance management system

//http://localhost:5000/EmployeeReqLeave
const employeeLeaveRequestData = require("./routes/EmployeeLeaveReq");
app.use('/EmployeeReqLeave', employeeLeaveRequestData);

//http://localhost:5000/AdminReqLeave
const adminEmpLeaveRequestData = require("./routes/EmployeeLeaveReq");
app.use('/AdminReqLeave', adminEmpLeaveRequestData);

//http://localhost:5000/Attendance
const employeeAttendanceData = require("./routes/EmployeeAttendance");
app.use('/Attendance', employeeAttendanceData);

//http://localhost:5000/SuspiciousEmpLeave
const suspiciousEmpLeaveData = require("./routes/SuspiciousEmpLeave");
app.use('/SuspiciousEmpLeave', suspiciousEmpLeaveData);




app.use(errorHandler)