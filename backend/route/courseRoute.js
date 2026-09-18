
/* Course ke contoller ko fatch krna ka liya hama route ki need hoti hai ... */

import express from "express"
import { createCourse, createLecture, editCourse, editLecture, getCourseById, getCourseLecture, getCratorById, getCreatorContents, getPublished, removeCourse, removeLecture } from "../controller/courseController.js"
import upload from "../middleware/multer.js"
import isAuth from "../middleware/isAuth.js"


const courseRouter = express.Router()

/* Routes for the courses ...  */
courseRouter.post("/create", isAuth, createCourse);
courseRouter.get("/getpublished", getPublished);
courseRouter.get("/getcreator", isAuth, getCreatorContents); /* Yeha isAuth isliya because ham userId chaiye ... */
courseRouter.post("/editcourse/:courseId", isAuth, upload.single("thumbnail"), editCourse);
/* upload.(hama single file upload krni hai)(kya upload krna hai) */
courseRouter.get("/getcourse/:courseId", isAuth, getCourseById);
courseRouter.delete("/remove/:courseId", isAuth, removeCourse);

/* Routes for the lecture are here ...  */
/* yeah isAuth isliye bec we want to check ki jo lecture hamne create kiya wo authentic hai ki n hi  ...  */
courseRouter.post("/createlecture/:courseId" , isAuth  , createLecture)
courseRouter.get("/courselecture/:courseId" , isAuth , getCourseLecture)
courseRouter.post("/editlecture/:lectureId" , isAuth , upload.single("videoUrl") , editLecture)
courseRouter.delete("/removelecture/:lectureId" , isAuth ,removeLecture)


/* Get Creator  */
courseRouter.post("/creator" , isAuth , getCratorById)


export default courseRouter
