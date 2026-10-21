const express = require('express');
const { getAnswer } = require('../controllers/queryController');



const queryRouter = express.Router();


queryRouter.post("/",getAnswer)

module.exports = queryRouter;