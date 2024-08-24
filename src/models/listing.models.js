import mongoose,{Schema} from "mongoose";
import { Review } from "./review.models.js";

const listSchema=new Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    image:{ 
        url:String,
       filename:String
    },
    price:{
        type:Number,
        default:0,
    },
    location:{
        type:String,
        require:true
    },
    country:{
        type:String,
        require:true
    },
    reviews:[
        {
        type:Schema.Types.ObjectId,
        ref:"Review"
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})

listSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
    await Review.deleteMany({_id:{$in:listing.reviews}})
    }
})

export const List=mongoose.model("List",listSchema)