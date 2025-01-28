import {Router} from "express";
import studentController from "../controllers/studentController.js";
import loginRequiredMiddleware from "../middlewares/loginRequired.js";

const router = new Router();
router.post("/create-student/",loginRequiredMiddleware, studentController.createNewStudent);
router.get("/get-all-students/", loginRequiredMiddleware, studentController.getAllStudents);
router.put("/update-student/:id/", loginRequiredMiddleware, studentController.updateStudents);
router.delete("/delete-student/:id/", loginRequiredMiddleware, studentController.deleteStudent);


export default router;