const express = require("express");
const router = express.Router();
const tareasController = require("../controllers/tareas.controller");

router.get("/", tareasController.getTareas);
router.post("/", tareasController.createTarea);
router.delete("/:id", tareasController.deleteTarea);
router.put("/:id", tareasController.updateTarea);

module.exports = router;
