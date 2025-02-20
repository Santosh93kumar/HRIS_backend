const fs = require("fs");
const { EmployeeModel } = require("../../../Model/Website/Employee_Management/Employee");
const { default: mongoose } = require("mongoose");

// Employee Info - Create Employee Entry
const EmployeeInfo = async (req, res) => {
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    const { name, gender, machineCode, dateOfBirth, streetAddress, city, postalCode, country } = req.body;

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

// Fetch only the Employee Name by ID
const getAllEmployeeNames = async (req, res) => {
    try {
        // Fetch all employees and return only the 'name' field
        const employees = await EmployeeModel.find().select("name");

        if (!employees || employees.length === 0) {
            return res.status(404).json({ status: 0, msg: "No employees found" });
        }

        // Extract names from employee objects
        const employeeNames = employees.map(emp => emp.name);

        return res.json({ status: 1, names: employeeNames });
    } catch (error) {
        console.error("Error fetching employee names:", error);
        return res.status(500).json({ status: 0, msg: "Error fetching employee names" });
    }
};


// Fetch All Employee Data
const getAllEmployeesDetails = async (req, res) => {
    try {
        const employees = await EmployeeModel.find(); // Fetch all employee records

        if (!employees || employees.length === 0) {
            return res.status(404).json({ status: 0, msg: "No employees found" });
        }

        return res.json({ status: 1, employees });
    } catch (error) {
        console.error("Error fetching employees:", error);
        return res.status(500).json({ status: 0, msg: "Error fetching employees" });
    }
};



module.exports = { EmployeeInfo,getAllEmployeeNames, getAllEmployeesDetails };
