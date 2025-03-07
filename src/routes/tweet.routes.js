import { Router } from "express";
import {
    createTweet,
    deleteTweet,
    getUserweets,
    updateTweet,
}from "../controllers/tweet.controller.js"
import { verifyJWT, VerifyJWT } from "../middlewares/auth.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJWT);

router.route("/").post(createTweet);
router.route("/user/:userId").get(getUserTweets);
router.route("/:tweetId").patch(updateTweet).delete(deleteTweet)

export default router