const express = require("express");
const router = express.Router();
const reserveController = require("../controllers/reserve-controller");
const auth = require("../middelwares/auth")



//router.get("/:id", reserveController.getDoctor);

router.get("/",   reserveController.getReserves);

// router.use(auth)
router.post("/", reserveController.insertReserve);

 router.put("/:id", reserveController.updateReserve);

router.delete("/:id", reserveController.deleteReserve);

module.exports = router;