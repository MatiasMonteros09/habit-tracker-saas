const express = require("express");
const router = express.Router();
const tareasController = require("../controllers/tareas.controller");

router.get("/", tareasController.obtenerTareas);
router.get("/:id", tareasController.obtenerTareaPorId);
router.post("/", tareasController.crearTarea);
router.patch("/:id/completar", tareasController.completarTarea);

module.exports = router;
