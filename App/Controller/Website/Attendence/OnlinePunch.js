const PunchInModel = require('../../../Model/Website/Attendence/OnlinePunch');

exports.punchIn = async (req, res) => {
  try {
    const { text } = req.body;
    console.log(text);

    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Fields are required"
      });
    }

    const punchInEntry = await PunchInModel.create({ text });

    return res.status(201).json({ 
      success: true,
      message: "Entry Created in Database",
      data: punchInEntry
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
