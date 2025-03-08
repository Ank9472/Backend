import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asynchandler.js";

const healthcheck = asyncHandler(async (req, res) => {
    // Creating a response that indicates the API is functioning properly
    return res.status(200).json(
        new ApiResponse(200, { status: "ok" }, "API is up and running")
    )
})

export {
    healthcheck
}