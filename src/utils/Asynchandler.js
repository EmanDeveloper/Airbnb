function AsyncHandler(fun){
    return function(req,res,next){
        fun(req,res,next).catch(next);
    }
}

export default AsyncHandler;