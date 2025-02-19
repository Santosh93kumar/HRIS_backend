const { EmployementModel } = require("../../../Model/Website/Employee_Management/EmployementInfoSchema");

let EmployementInfo = async (req, res) => {
  console.log(req.body);

  let { 
    hireDate, joiningDate, basicSalary, paymentMethod, employeeType, 
    bankName, accountTitle, location, designation, department, employeeCode, 
    separationDate, status, branch, branchCode, accountNo, swiftCode, cnic 
  } = req.body;

  let employeeData = {
    hireDate, joiningDate, basicSalary, paymentMethod, employeeType, 
    bankName, accountTitle, location, designation, department, employeeCode, 
    separationDate, status, branch, branchCode, accountNo, swiftCode, cnic 
  };


  let resObj;

  try {
    let newEmployement = new EmployementModel(employeeData);
    let savedEmployement = await newEmployement.save();
    console.log("Employee details saved successfully:", savedEmployement);

    resObj = {
      status: 1,
      msg: "Employee details saved successfully.",
      employee: savedEmployement,
    };
    res.send(resObj);
  } catch (error) {
    console.error("Error saving employee details:", error);
    resObj = {
      status: 0,
      msg: "Error occurred while saving employee details.",
      error: error.message // Include the error message for debugging
    };
    res.send(resObj);
  }
};

module.exports = { EmployementInfo };
