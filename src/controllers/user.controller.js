import { User } from "../models/user.models.js";
import AsyncHandler from "../utils/Asynchandler.js";
import { ApiError } from "../utils/apiError.js";

const Signup=AsyncHandler(async(req,res)=>{
    res.render("users/signup.ejs")
});

const RegisterUser=AsyncHandler(async(req,res)=>{
  try {
      
      const {username,email,password}=req.body;
  
      if(!username || !email || !password){
          throw new ApiError(400,"All field required");
      }
  
      const newUser=new User({
          username,
          email,
      });
  
     const user=await User.register(newUser,password);
     console.log(user);

     req.login(user,(err)=>{
        if(err){
        return next(err)
    }
    req.flash("success","Welcome to Eman Airbnb");
     res.redirect("/list");
     })

     
  } catch (error) {
    req.flash("error",error.message);
    res.redirect("/user/signup");
  }
});

const Login=AsyncHandler(async(req,res)=>{
    res.render("users/login.ejs")
});

const checkLogin=AsyncHandler(async(req,res)=>{
    let url=res.locals.redirectUrl || "/list";
    res.redirect( url);
})

const Logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You logout Success fully");
       return res.redirect("/list");
    })
};

export {
    Signup,
    RegisterUser,
    Login,
    checkLogin,
    Logout
}