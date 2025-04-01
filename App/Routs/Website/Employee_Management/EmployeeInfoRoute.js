let express = require("express");
const {
    EmployeeInfo,
    getEmployees,
    updateEmployee,
    deleteEmployee
} = require("../../../Controller/Website/Employee_Management/EmployeeInfo");
const { uploads } = require("../../../Middleware/Website/employeeFileUpload");

let employeeInfoRoutes = express.Router();

employeeInfoRoutes.post( '/employeeinfo',uploads('uploads/EmployeeInfoImage').single('profileImage'),EmployeeInfo
);

employeeInfoRoutes.get('/employeeinfo', getEmployees);

// ================== Update ==================
employeeInfoRoutes.put(
    '/employeeinfo/:id',
    uploads('uploads/EmployeeInfoImage').single('profileImage'),
    updateEmployee
);
// Get Single Employee by ID
const mongoose = require('mongoose');
const { EmployeeModel } = require("../../../Model/Website/Employee_Management/Employee");

employeeInfoRoutes.get('/employeeinfo/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ObjectId before querying
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ status: 0, msg: "Invalid Employee ID format" });
        }

        const employee = await EmployeeModel.findById(id);

        if (!employee) {
            return res.status(404).json({ status: 0, msg: "Employee not found." });
        }

        return res.status(200).json({ status: 1, employee });

    } catch (error) {
        console.error("Error fetching employee:", error);
        return res.status(500).json({ status: 0, msg: "Internal Server Error" });
    }
});



// ================== Delete ==================
employeeInfoRoutes.delete('/employeeinfo/:id', deleteEmployee);

module.exports = { employeeInfoRoutes };
