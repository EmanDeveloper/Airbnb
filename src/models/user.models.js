import mongoose,{Schema} from "mongoose";
import passportLocalMongoose from "passport-local-mongoose"

// username and password passportlocalmongoose automaticaly define
const userSchema=new Schema({
    email:{
        type:String,
        require:true,
        lowercase:true
    },

});

userSchema.plugin(passportLocalMongoose);

export const User=mongoose.model("User",userSchema);