const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");

/* GET user. */
router.get("/", usersController.get);

/* POST user */
router.post("/", usersController.create);

/* PUT user */
router.put("/:netId", usersController.update);

module.exports = router;
