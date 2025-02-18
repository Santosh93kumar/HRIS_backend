let express = require("express");

const { leaveentitlement } = require("../../Controller/Website/leaveentitlement");

let leaveentitlementroute =express.Router();
leaveentitlementroute.post('/leaveentitlement',leaveentitlement)

module.exports={leaveentitlementroute}