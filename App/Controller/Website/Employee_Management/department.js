const { departmentModel } = require("../../../Model/Website/Employee_Management/departmentModel");

let department = async (req, res) => {
    console.log("Received Data:", req.body);

    let { departmentName } = req.body;

    if (!departmentName) {
        return res.status(400).json({
            status: 0,
            msg: "All required fields must be provided.",
            enteredData: req.body
        });
    }

    let obj = { departmentName }; // Correct object structure

    try {
        let newDepartmentEntry = new departmentModel(obj);
        let depRes = await newDepartmentEntry.save();

        // Return a success response with entered data
        return res.json({
            status: 1,
            msg: "Data saved successfully.",
            enteredData: req.body, // Sending entered data back to frontend
            savedData: depRes // Sending saved data from DB
        });
    } catch (error) {
        console.error("Error during department creation:", error.message);

        // Return an error response if the operation fails
        return res.status(500).json({
            status: 0,
            msg: "Error occurred during department creation.",
            enteredData: req.body // Sending entered data back to frontend
        });
    }
};

// Function to view all departments
let viewDepartment = async (req, res) => {
    try {
        const departments = await departmentModel.find(); // Retrieve all departments from the DB

        if (!departments || departments.length === 0) {
            return res.status(404).json({
                status: 0,
                msg: "No departments found."
            });
        }

        // Return all departments data
        return res.json({
            status: 1,
            msg: "Departments retrieved successfully.",
            departments
        });

    } catch (error) {
        console.error("Error during fetching departments:", error.message);

        // Return an error response if the operation fails
        return res.status(500).json({
            status: 0,
            msg: "Error occurred during fetching departments."
        });
    }
};

module.exports = { department, viewDepartment };
