import { Router } from "express";
import {
    deleteVideo,
    getAllVideos,
    getVideoById,
    publishAVideo,
    togglePublishStatus,
    updateVideo,
} from "../controllers/video.controller.js"
import { verifyJWT, VerifyJWT } from "../middlewares/auth.middleware.js";
import { Upload } from "../middlewares/multer.middleware.js";
import { verify } from "crypto";

const router = Router();
router.use(verifyJWT);

router
 .route("/")
 .get(getAllVideos)
 .post(
     uploadBytes.fields([
        {
            name : "videoFile",
            maxcount:1,
        }
        {
            name:"thumbnail",
            maxcount: 1,
        }
     ]),
      publishAVideo
 ) ;

    router
        .route("/.:videoId")
        .get(getVideoById)
        .delete(deleteVideo)
        .patch(upload.single("thumbnail"),updateVideo);

        router.route("/toggle/publish/:videoId").patch(togglePublishStatus)

        export default router;