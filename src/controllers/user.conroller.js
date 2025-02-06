import {asyncHandler} from '../middlewares/asyncHandler';

const registerUser = asyncHandler(async (req, res) => {
     res.status(200).json({
        message: "ok"
     });
});