const {shiftModel} = require("../../../../Model/Website/ShiftSetup/CreateNewShift/shiftModel.js");
const {EmployeeModel} = require("../../../../Model/Website/Employee_Management/Employee.js");

const shiftController = {

  setShift: async (req, res) => {
   try{
    console.log(req.body);
    const { shiftName,assignedEmployee, shiftIn, shiftOut, ShiftOutNextDay } = req.body;
    
    // if(!shiftName || !assignedEmployee || !shiftIn || !shiftOut || !ShiftOutNextDay){
    //     return res.status(400).json({ status: 0, msg: "All required fields must be provided."});
    // }
    
    //data
    
    let savedShift = await shiftModel.create({ shiftName,assignedEmployee, shiftIn, shiftOut, ShiftOutNextDay });

    console.log("Shift details saved successfully:", savedShift);
    return res.status(201).json({ msg: "Shift details saved successfully."});
   }catch(error){
    console.error("Error saving shift details:", error);
    return res.status(500).json({ status: 0, msg: "Error occurred during shift creation." });
   }

  },

  getShift: async (req, res) => {
    try {
      const shifts = await shiftModel.find();
      return res.json({msg: "Shifts retrieved successfully.",shifts});
    }catch (error){
      console.error("Error retrieving shifts:", error);
      return res.status(500).json({msg: "Error occurred during shift retrieval.",error: error.message});

    }
  },
};

module.exports = { shiftController };
