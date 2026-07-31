import { List } from "../models/listing.models.js";
import { Review } from "../models/review.models.js";

const isOwner=async(req,res,next)=>{
    let {id}=req.params;

    let listing=await List.findById(id);
  if(!listing.owner._id.equals(res.locals.currentUser._id)){
    req.flash("error","Unauthrize request");
   return res.redirect(`/list/${id}`);
  }
  next()
}

const isreviewAuthor=async(req,res,next)=>{
  let {listid,reviewid}=req.params;

  let review=await Review.findById(reviewid);
if(!review.author._id.equals(res.locals.currentUser._id)){
  req.flash("error","Unauthrize request");
 return res.redirect(`/list/${listid}`);
}
next()
}

export {isOwner,
  isreviewAuthor
};

