import ApiError from "../utils/ApiError";

const errorHandler=(error,req,res,next)=>{
    let statusCode=error?.statusCode || 500;
    let message=error?.message || "Internal Server Err";
    if(error instanceof ApiError)
    {
        statusCode=error.statusCode;
        message=error.message;
    }
    return res.status(statusCode).json({statusCode,message})
}
export default errorHandler