const isLogin=(req,res,next)=>{
    if(!req.isAuthenticated()){
      req.session.redirectUrl=req.originalUrl;
        req.flash("error","Please logged in first");
        return res.redirect("/user/login");
      }
      next()
}

const saveRedirectUrl=(req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl= req.session.redirectUrl
  }
  next();
}

export {isLogin,
  saveRedirectUrl
};