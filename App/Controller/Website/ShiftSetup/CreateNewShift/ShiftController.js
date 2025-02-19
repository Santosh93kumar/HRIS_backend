const {shiftModel} = require("../../../../Model/Website/ShiftSetup/CreateNewShift/shiftModel.js");

const shiftController = {
  setShift: async (req, res) => {
   try{
    console.log(req.body);
    const { shiftName,shiftIN, shiftOUT, ShiftOutNextDay } = req.body;
    

    if (!shiftName || !ShiftOutNextDay){
         return res.status(400).json({ status: 0, msg: "All fields are required."});
      }
      if(!shiftIN.hours || !shiftIN.minutes || !shiftIN.seconds || !shiftOUT.hours || !shiftOUT.minutes || !shiftOUT.seconds){
        return res.status(400).json({ status: 0, msg: "All fields are required."});
      }
      const timeIn = shiftIN.hours + shiftIN.minutes  + shiftIN.seconds;
      const timeout = shiftOUT.hours+ shiftOUT.minutes  + shiftOUT.seconds;
      if(timeIn>timeout){ return res.status(400).json({ status: 0, msg: "Shift Out Time should be greater than Shift In Time."}); 
    }
    

    //data
    
    let savedShift = await shiftModel.create({ shiftName, shiftIN, shiftOUT, ShiftOutNextDay });

    console.log("Shift details saved successfully:", savedShift);
    return res.status(201).json({ msg: "Shift details saved successfully."});
   }catch(error){
    console.error("Error saving shift details:", error);
    return res
      .status(500)
      .json({ status: 0, msg: "Error occurred during shift creation." });
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
