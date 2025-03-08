import { Router } from "express";
import {
    getSubscribedChannels,
    getUserChannelSubscribers,
    toggleSubscription
} from "../controllers/subscription.controller.js"
import { verifyJWT, VerifyJWT } from "../middlewares/auth.middleware.js";
import { verify } from "crypto";

const router = Router();
router.use(verifyJWT)

router
  .route("/c/:channelId")
  .get(SubscribedChannels)
  .post(toggleSubscription);

  router.route("/u/:subscriberId").get(UserChannelSubscribers)

  export default router