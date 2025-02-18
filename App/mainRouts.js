let express = require("express");
const { employeeRoutes } = require("./Routs/Website/employeeRouts");
const { leaveentitlementroute } = require("./Routs/Website/leaveentitlementroute");
const { leaveBalanceRoute } = require("./Routs/Website/leaveBalanceRoute");
const { myAttendenceReportRouts } = require("./Routs/Website/Attendence/myAttendenceReportRouts");
const { leaveEntryRoutes } = require("./Routs/Website/Leave/leaveentryroutes");
const { allowDeductionRoutes } = require("./Routs/Website/Payroll/allowDeductionTypeRoutes");



let mainRouts = express.Router();
mainRouts.use("/website/homepage",employeeRoutes)


// Attendence
mainRouts.use("/website/myattendence",myAttendenceReportRouts)

// Leave
mainRouts.use("/website/leave",leaveEntryRoutes)


// PAYROLL
mainRouts.use("/website/payroll",allowDeductionRoutes)

mainRouts.use("/website/leaveentitlementroute",leaveentitlementroute)
mainRouts.use("/website/leaveBalanceRoute",leaveBalanceRoute)



module.exports={mainRouts} 