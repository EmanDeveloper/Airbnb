import { List } from "../models/listing.models.js";
import AsyncHandler from "../utils/Asynchandler.js";
import {ApiError} from "../utils/apiError.js";
import {Review} from "../models/review.models.js";


const AllListing = AsyncHandler(async (req, res) => {

  const listings = await List.find({});

  res.render("listing/Home.ejs", { listings });
});

const ShowListing = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  if(!id){
    throw new ApiError(400,"Id is required");
  }
  let listitem = await List.findById(id).populate({ 
    path:"reviews",
    populate:{path:"author"}
  })
    .populate("owner");

  if(!listitem){
    throw new ApiError(400,"List not avialable");
  }
  res.render("listing/showlist.ejs", { listitem });
});

const newList = AsyncHandler((req, res) => {
  res.render("listing/create.ejs");
});

const CreateList = AsyncHandler(async (req, res) => {

  console.log(req.file)
  let url=req.file.path;
  let filename=req.file.filename;
  console.log(url,"....",filename);

  const { title, description,  price, location, country } = req.body;
  let owner=req.user._id;
  if([title,description,price,location,country].some((item)=>item.trim()==="")){
    throw new ApiError(400,"All field required");
  }

  await List.create({
    title: title,
    description: description,
    price: price,
    location: location,
    country: country,
    owner,
    image:{url,filename}
  });

  req.flash("success","New listing created");
  res.redirect("/list");
});

const findList = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const listfind = await List.findById(id);

  let originalimage=listfind.image.url;
  originalimage=originalimage.replace("/upload","/upload/w_250")
  res.render("listing/update.ejs", { listfind,originalimage });
});

const UpdateList = AsyncHandler(async (req, res) => {

  const { id } = req.params;
  const { title, description,price, location, country } = req.body;
  let updatelist=await List.findByIdAndUpdate(
    id,
    { title, description, price, location, country },
    { new: true, runValidators: true }
  );

  if(typeof req.file !== "undefined"){
    let url=req.file.path;
    let filename=req.file.filename;
    updatelist.image={url,filename};
    await updatelist.save();
  }

  req.flash("success","Listing Update!")
  res.redirect(`/list/${id}`);
});

const DeleteList = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  await List.findByIdAndDelete(id);
  res.redirect("/list");
});


const AddReview=AsyncHandler(async(req,res)=>{

  const {id}=req.params;

  const {rating,comment}=req.body;

  let author=req.user._id;

  if(!id){
    throw new ApiError(400,"Review listing id does not exist");
  }

  if(!comment){
    throw new ApiError(400,"Please add some comment first")
  }

  const findlist=await List.findById(id);

  const listreview=await Review.create({
    rating,
    comment,
    author
  })

  if(!listreview){
    throw new ApiError(500,"Review does not added");
  }

  if(rating<1 || rating>5){
    throw new ApiError(500,"Rating should be between 1-5");
  }

  findlist.reviews.push(listreview);

  await findlist.save();

  res.redirect(`/list/${id}`);
})

const DeleteComment = AsyncHandler(async (req, res) => {
  const { listid, reviewid } = req.params;

  // Check if listid and reviewid are defined
  if (!listid || !reviewid) {
    throw new ApiError(400, "List ID or Review ID is missing");
  }

  // Remove review from list
  const updatedList = await List.findByIdAndUpdate(
    listid,
    { $pull: { reviews: reviewid } },
    { new: true } // Return the updated document
  );

  if (!updatedList) {
    throw new ApiError(404, "List not found");
  }

  // Delete the review
  const deletedReview = await Review.findByIdAndDelete(reviewid);

  if (!deletedReview) {
    throw new ApiError(404, "Review not found");
  }

  res.redirect(`/list/${listid}`);
});



export {
  AllListing,
  ShowListing,
  newList,
  CreateList,
  findList,
  UpdateList,
  DeleteList,
  AddReview,
  DeleteComment
};
