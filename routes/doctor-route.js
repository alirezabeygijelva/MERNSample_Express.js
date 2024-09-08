const express = require("express");
const router = express.Router();
const doctorsController = require("../controllers/doctor-controller");
const auth = require("../middelwares/auth")



router.get("/:id", doctorsController.getDoctor);

router.get("/",   doctorsController.getDoctors);

// router.use(auth)
router.post("/", doctorsController.insertDoctor);

router.put("/:id", doctorsController.updateDoctor);

 router.delete("/:id", doctorsController.deleteDoctor);

module.exports = router;