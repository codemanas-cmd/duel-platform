import express from "express"
import updateProblems from "../controllers/updateProblemset.js";
// import recommendProblem from "../controllers/recommendProblem.js"

const router = express.Router()
router.get("/updateProblems",updateProblems);
// router.post("/recommend",recommendProblem);

export default router
