let express = require("express");
const { employeeRoutes } = require("./Routs/Website/employeeRouts");
const { leaveentitlementroute } = require("./Routs/Website/Leave/leaveentitlementroute");
const { leaveBalanceRoute } = require("./Routs/Website/Leave/leaveBalanceRoute");
const { myAttendenceReportRouts } = require("./Routs/Website/Attendence/myAttendenceReportRouts");
const { leaveEntryRoutes } = require("./Routs/Website/Leave/leaveentryroutes");
const { allowDeductionRoutes } = require("./Routs/Website/Payroll/allowDeductionTypeRoutes");
const { employeeInfoRoutes } = require("./Routs/Website/Employee_Management/EmployeeInfoRoute")
const { contactInfoRoutes } = require("./Routs/Website/Employee_Management/ContactInfoRoute");
const { departmentRoutes } = require("./Routs/Website/Employee_Management/DepartmentRoutes");
const { designationRoutes } = require("./Routs/Website/Employee_Management/designationRoutes");
const { dashboarDataRoutes } = require("./Routs/Website/dashboardDataRoutes");




let mainRouts = express.Router();

// Dashboard Management & Home pge
mainRouts.use("/website/homepage",employeeRoutes)
mainRouts.use("/website/dashboardroute",dashboarDataRoutes)


// Attendence
mainRouts.use("/website/myattendence",myAttendenceReportRouts)

// Leave
mainRouts.use("/website/leave",leaveEntryRoutes)
mainRouts.use("/website/leaveentitlementroute",leaveentitlementroute)
mainRouts.use("/website/leaveBalanceRoute",leaveBalanceRoute)





// PAYROLL
mainRouts.use("/website/payroll",allowDeductionRoutes)


// Employee Management
mainRouts.use("/website/employeeInfoRoute",employeeInfoRoutes)
mainRouts.use("/website/contactInfoRoute",contactInfoRoutes)
mainRouts.use("/website/departmentroutes",departmentRoutes)
mainRouts.use("/website/designationroutes",designationRoutes)





module.exports={mainRouts} 