const express = require("express");
const { shiftController } = require("../../../../Controller/Website/ShiftSetup/CreateNewShift/ShiftController.js");
const shiftRoutes = express.Router();

shiftRoutes.post("/createshift", shiftController.setShift);
shiftRoutes.get("/getshift", shiftController.getShift);

module.exports = {shiftRoutes};