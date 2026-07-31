import mongoose,{Schema} from "mongoose";

const reviewSchema=new Schema({
    comment:{
        type:String,
    },
    rating:{
        type:Number,
        min:1,
        max:5
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
});

export const Review=mongoose.model("Review",reviewSchema)