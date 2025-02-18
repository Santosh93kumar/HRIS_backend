const { leaveEntryModel } = require("../../../Model/Website/Leave/leaveEntryModel");

let leaveEntry = async (req, res) => {
    // Log the request body for debugging
    console.log(req.body);

    // Destructure required fields from the body
    let { leaveType, leavePeriod, leaveFromDate, leaveToDate, remarks } = req.body;

    // Validate if all required fields are provided
    if (!leaveType || !leavePeriod || !leaveFromDate || !leaveToDate) {
        return res.status(400).json({ status: 0, msg: "All required fields must be provided." });
    }

    // Create an object to store the data
    let obj = {
        leaveType,
        leavePeriod,
        leaveFromDate,
        leaveToDate,
        remarks,  // This is now correctly included
    };

    try {
        // Create a new leave entry in the database
        let newLeaveEntry = new leaveEntryModel(obj);
        let leaveRes = await newLeaveEntry.save();

        // Return a success response
        return res.json({
            status: 1,
            msg: "Data saved successfully.",
            leaveRes,
        });
    } catch (error) {
        console.error("Error during registration:", error);

        // Return an error response if the operation fails
        return res.status(500).json({
            status: 0,
            msg: "Error occurred during registration.",
        });
    }
};

module.exports = { leaveEntry };
