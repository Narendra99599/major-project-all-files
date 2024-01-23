const express = require('express');
const { auth } = require('../middlewares/auth');
const { createPair, removePair, createPrompt, createCustomPrompt } = require('../controllers/chatController');
const chatRoutes = express.Router();

chatRoutes.post('/create-pair',auth, createPair);
chatRoutes.post('/remove-pair',auth,removePair)
chatRoutes.post('/create-prompt',auth,createPrompt);
chatRoutes.post('/create-custom-prompt',auth, createCustomPrompt)

module.exports.chatRoutes = chatRoutes;