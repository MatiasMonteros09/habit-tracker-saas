const express = require("express");
const router = express.Router();
const tareasController = require("../controllers/tareas.controller");

router.get("/", tareasController.obtenerTareas);
router.get("/:id", tareasController.obtenerTareaPorId);
router.post("/", tareasController.crearTarea);

module.exports = router;
