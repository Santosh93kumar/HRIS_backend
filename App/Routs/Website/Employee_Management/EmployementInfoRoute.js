let express = require("express");
const { EmployementInfo } = require("../../../Controller/Website/Employee_Management/EmployementInfo");

let employementInfoRoutes = express.Router();

employementInfoRoutes.post('/employementinfo', EmployementInfo); // No file upload in this example

module.exports = { employementInfoRoutes };