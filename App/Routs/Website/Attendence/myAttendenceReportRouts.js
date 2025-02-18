let express = require("express");
let myAttendenceReportRouts = express.Router();



const { myattendencereport } = require("../../../Controller/Website/Attendence/myattendencereport");
// const { punchIn } = require('../../../Controller/Website/Attendence/punchinpunchout');



myAttendenceReportRouts.get('/myattendencereport', myattendencereport);
// myAttendenceReportRouts.post('/punchIn', punchIn);

module.exports = { myAttendenceReportRouts }