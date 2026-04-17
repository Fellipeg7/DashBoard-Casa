const express = require("express");
const router = express.Router();
const contasController = require("../controllers/contasController");
const authMiddleware = require("../middleware/authMiddleware");

router.put("/:id", authMiddleware, contasController.togglePago);
router.get("/", contasController.getContas);
router.post("/", contasController.addConta);
router.delete("/:id", contasController.deleteConta);
router.put("/:id", contasController.togglePago);

module.exports = router;