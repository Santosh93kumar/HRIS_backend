const fs = require("fs");
const { EmployeeModel } = require("../../../Model/Website/Employee_Management/Employee");
const { default: mongoose } = require("mongoose");

// Employee Info - Create Employee Entry
const EmployeeInfo = async (req, res) => {
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    let { name, gender, machineCode, dateOfBirth, streetAddress, city, postalCode, country } = req.body;

    let employeeData = {
        name,
        gender,
        machineCode,
        dateOfBirth,
        streetAddress,
        city,
        postalCode,
        country,
    };

    if (!name || !gender) {
        return res.status(400).json({ status: 0, msg: "Name and gender are required fields." });
    }

    try {
        const employeeData = {
            name,
            gender,
            machineCode,
            dateOfBirth,
            streetAddress,
            city,
            postalCode,
            country,
            profileImage: req.file?.filename || null, // Handle profile image
        };

        const newEmployee = new EmployeeModel(employeeData);
        const savedEmployee = await newEmployee.save();

        console.log("Employee details saved successfully:", savedEmployee);

        return res.json({
            status: 1,
            msg: "Employee details saved successfully.",
            employee: savedEmployee,
        });
    } catch (error) {
        console.error("Error saving employee details:", error);
        return res.status(500).json({
            status: 0,
            msg: "Error occurred while saving employee details.",
        });
    }
};

let getEmployees = async (req, res) => {
    try {
        const employees = await EmployeeModel.find();
        res.json({ status: 1, employees: employees });
    } catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).json({ status: 0, msg: "Internal server error" });
    }
};

module.exports = { EmployeeInfo, getEmployees };
