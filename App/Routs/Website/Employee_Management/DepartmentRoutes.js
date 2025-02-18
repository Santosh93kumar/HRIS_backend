let express = require("express")
const { department, viewDepartment } = require("../../../Controller/Website/Employee_Management/department")

let departmentRoutes =express.Router()

departmentRoutes.post("/department",department)
departmentRoutes.get("/viewdepartment",viewDepartment)

module.exports={departmentRoutes}