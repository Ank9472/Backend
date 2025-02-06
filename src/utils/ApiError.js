
import { error } from "console";

class ApiError extends Error{
    constructor(statusCode ,
    message= "Something went wrong",
    errors = [],
    stack = "",
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null  // this is the data that we will send to the client what will doing here
        this.message = message
        this.sucess = false
        this.errors = errors
  
        if(stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
} 
export { ApiError }