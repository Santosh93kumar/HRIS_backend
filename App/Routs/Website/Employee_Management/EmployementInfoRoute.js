let express = require("express");
const { EmployementModel } = require("../../../Model/Website/Employee_Management/EmployementInfoSchema")
const { EmployementInfo,getEmployeement } = require("../../../Controller/Website/Employee_Management/EmployementInfo");

let employementInfoRoutes = express.Router();

employementInfoRoutes.post('/employementinfo', EmployementInfo);

employementInfoRoutes.get('/employementinfo', getEmployeement);
employementInfoRoutes.get("/employementinfo/:employeeName", async (req, res) => {
    const { employeeName } = req.params;
    console.log("Request for employee:", employeeName); // Add logging
  
    try {
      const employees = await EmployementModel.findOne({ profileName: employeeName });
      if (employees) {
        res.json({ status: 1, employees: employees });
      } else {
        res.status(404).json({ status: 0, msg: "Employee not found" });
      }
    } catch (error) {
      console.error("Error fetching employee:", error);
      res.status(500).json({ status: 0, msg: "Internal server error" });
    }
  });

module.exports = { employementInfoRoutes };
