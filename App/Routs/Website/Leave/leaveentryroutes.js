let express = require("express")
const { leaveEntry } = require("../../../Controller/Website/Leave/leaveentry")

let leaveEntryRoutes = express.Router()

leaveEntryRoutes.post("/leaveentry",leaveEntry)

module.exports={leaveEntryRoutes}