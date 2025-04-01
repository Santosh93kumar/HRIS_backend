const fs = require("fs");
const { EmployeeModel } = require("../../../Model/Website/Employee_Management/Employee");
const { default: mongoose } = require("mongoose");

// Employee Info - Create Employee Entry
const EmployeeInfo = async (req, res) => {
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    let { name, gender, departmentName, dateOfBirth, streetAddress, city, postalCode, country } = req.body;

    let employeeData = {
        name,
        gender,
        departmentName,
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
            departmentName,
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

let getAllEmployeDetails = async (req, res) => {
    try {
        const data = await EmployeeModel.find();
        console.log("data", data);

        return res.status(200).json({
            success: true,
            message: 'EmployeDetails Fetch Successfully',
            data: data // Include the fetched data in the response
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


// ================== Update Employee ===================
const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedData = {
            name: req.body.name,
            gender: req.body.gender,
            departmentName: req.body.departmentName,
            dateOfBirth: req.body.dateOfBirth,
            streetAddress: req.body.streetAddress,
            city: req.body.city,
            postalCode: req.body.postalCode,
            country: req.body.country,
        };

        if (req.file) {
            updatedData.profileImage = req.file.filename;
        }

        const updatedEmployee = await EmployeeModel.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedEmployee) {
            return res.status(404).json({ status: 0, msg: "Employee not found." });
        }

        return res.status(200).json({ status: 1, msg: "Employee updated successfully.", employee: updatedEmployee });
    } catch (error) {
        console.error("Error updating employee:", error);
        return res.status(500).json({ status: 0, msg: "Error updating employee." });
    }
};

// ================== Delete Employee ===================
const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedEmployee = await EmployeeModel.findByIdAndDelete(id);

        if (!deletedEmployee) {
            return res.status(404).json({ status: 0, msg: "Employee not found." });
        }

        // Remove employee image if exists
        if (deletedEmployee.profileImage) {
            const filePath = `uploads/${deletedEmployee.profileImage}`;
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                console.log("Profile image deleted successfully.");
            }
        }

        return res.status(200).json({ status: 1, msg: "Employee deleted successfully." });
    } catch (error) {
        console.error("Error deleting employee:", error);
        return res.status(500).json({ status: 0, msg: "Error deleting employee." });
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


// onlye send Employee Name 
const getAllEmployeeNames = async (req, res) => {
    try {
        // Fetch all employees and return only the 'name' field
        const employees = await EmployeeModel.find({},"");

        if (!employees || employees.length === 0) {
            return res.status(404).json({ status: 0, msg: "No employees found" });
        }

        // Extract names from employee objects
        // const employeeNames = employees.map(emp => emp.name);

        return res.json({ status: 1, employees });
    } catch (error) {
        console.error("Error fetching employee names:", error);
        return res.status(500).json({ status: 0, msg: "Error fetching employee names" });
    }
};


module.exports = { EmployeeInfo, getEmployees, getAllEmployeeNames, getAllEmployeDetails, updateEmployee, deleteEmployee };
