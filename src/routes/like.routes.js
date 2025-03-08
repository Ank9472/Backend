import { Router } from "express";
import {
    getLikedVideos,
    toggleCommentLike,
    toggleVideoLilke,
    toggleTweetLike,
} from"..//controllers/like.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import exp from "constants";

const router = Router();
router.use(verifyJWT);

router.route("/toggle/v/:videoId").post(toggleVideoLilke)
router.route("/toggle/c/:commentId").post(toggleCommentLike)
router.route("/route/toggle/t/:tweetId").post(toggleTweetLike)
router.route("/videos").get(getLikedVideos);

export default router;