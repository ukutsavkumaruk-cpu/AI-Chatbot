const express = require('express');
const { postChat , getChat} = require('../controllers/queryController');



const queryRouter = express.Router();

queryRouter.get("/",getChat)
queryRouter.post("/",postChat)

module.exports = queryRouter;