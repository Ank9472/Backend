const asyncHandler = (requestHandler) => {
  (req, res, next) => {
      promise.resolve(requestHandler(req, res, next)).
      catch((err) => next(err))
   }
  }

export { asyncHandler }


// const asyncHandler = () => {}
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => async () => {}
// const asyncHandler = (fn) => (req,res,next) => { 
//   try {
//       await fn (req,res,next)
//   } catch (error) {
//     req.status(error.code || 500).json({
//       success: false,
//       message: error.message
//     })
//   }
// } 
// high order function are those which take value as the parameter and treat him as the return 