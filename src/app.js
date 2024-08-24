import express from "express";
import methodOverride from "method-override";
import ejsmate from "ejs-mate";
import  {errorHandler} from "./utils/apiError.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import flash from "connect-flash";
import { User } from "./models/user.models.js";
import passport from "passport";
import LocalStrategy from "passport-local";

import  MongoStore from "connect-mongo";

import dotenv from "dotenv";

dotenv.config({
    path:"./.env"
})

const app=express();

app.set("view engin","views");
app.engine('ejs', ejsmate);

app.use(express.static("views"));
app.use(methodOverride('_method'));
app.use(express.static("public"));

app.use(express.json());

app.use(express.urlencoded({extended:true}));


app.use(session({
    secret:process.env.session_secret,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now() + 7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true
    },
    store: MongoStore.create({
        mongoUrl:process.env.DB_URL,
        crypto:{
            secret:process.env.session_secret,
        },
        touchAfter:24*3600
    })
})
);


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash());
app.use(cookieParser());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currentUser=req.user;
    next();
})



import ListRouter from "./routes/listing.routes.js";

import UserRouter from "./routes/user.routes.js";

app.use("/list",ListRouter);
app.use("/user",UserRouter);

app.use(errorHandler);

export {app}