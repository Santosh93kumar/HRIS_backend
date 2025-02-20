let fs = require("fs");
const { EmployeeModel } = require("../../../Model/Website/Employee_Management/Employee");

let EmployeeInfo = async (req, res) => {
    console.log(req.body);
    console.log(req.file);

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

    if (req.file && req.file.filename) {
        employeeData.profileImage = req.file.filename;
    }

    let resObj;

    try {
        let newEmployee = new EmployeeModel(employeeData);
        let savedEmployee = await newEmployee.save();
        console.log("Employee details saved successfully:", savedEmployee);

        resObj = {
            status: 1,
            msg: "Employee details saved successfully.",
            employee: savedEmployee,
        };
        res.send(resObj);
    } catch (error) {
        console.error("Error saving employee details:", error);
        resObj = {
            status: 0,
            msg: "Error occurred while saving employee details.",
        };
        res.send(resObj);
    }
};

let getEmployeeInfo = async (req, res) => {
    try {
        const employees = await EmployeeModel.find();
        res.send(employees);
    } catch (error) {
        console.error("Error retrieving employees:", error);
        res.status(500).send("Error retrieving employees");
    }
}


module.exports = { EmployeeInfo, getEmployeeInfo };
