const express = require("express");
const router = express.Router();
const tareasController = require("../controllers/tareas.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", authMiddleware, tareasController.obtenerTareas);
router.get("/:id", tareasController.obtenerTareaPorId);
router.post("/", authMiddleware, tareasController.crearTarea);
router.patch("/:id/completar", tareasController.completarTarea);
router.patch("/:id/toggle", tareasController.toggleTarea);

module.exports = router;
