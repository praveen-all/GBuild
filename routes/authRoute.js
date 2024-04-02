<<<<<<< HEAD
const express = require('express');
const { login, register } = require('../controllers/authController.js');
=======
import express from "express";
import { login, register } from "../controllers/authController.js";
>>>>>>> d60080d9540e70fcf774c95abadbe7fe9561dff7

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

<<<<<<< HEAD
module.exports = router;
=======
export default router;
>>>>>>> d60080d9540e70fcf774c95abadbe7fe9561dff7
