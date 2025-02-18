let express = require("express");
const { EmployeeInfo } = require("../../../Controller/Website/Employee_Management/EmployeeInfo");
const { uploads } = require("../../../Middleware/Website/employeeFileUpload");

let employeeInfoRoutes = express.Router();

// Route to handle employee info update with file upload
employeeInfoRoutes.post(
    '/employeeinfo', 
    uploads('uploads/EmployeeInfoImage').single('profileImage'), 
    EmployeeInfo
);

module.exports = { employeeInfoRoutes };
