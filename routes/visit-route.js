const express = require("express");
const router = express.Router();
const visitsController = require("../controllers/visits-controller");
const auth = require("../middelwares/auth")



//router.get("/:id", reserveController.getDoctor);

router.get("/",   visitsController.getVisits);

// router.use(auth)
router.post("/", visitsController.insertVisit);

 router.put("/:id", visitsController.updateVisit);

router.delete("/:id", visitsController.deleteVisit);

module.exports = router;