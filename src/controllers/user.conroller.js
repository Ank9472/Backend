import {asyncHandler} from '../middlewares/asyncHandler';

const registerUser = asyncHandler(async (req, res) => {
     res.status(200).json({
        message: "ok"
     });
});


// yaha par hame console.log  karna chahiye jisse ki sare files ko explore kar ske 
//exports default and wihout it exports is meanings different