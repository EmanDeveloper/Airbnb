import { Router } from "express";
import { AllListing,ShowListing,newList,CreateList,findList,
    UpdateList,DeleteList,AddReview,DeleteComment } from "../controllers/listing.controller.js";

import { isLogin } from "../middleware/login.middleware.js";
import { isOwner,isreviewAuthor } from "../middleware/isowner.middleware.js";

import multer from "multer";
import {storage} from "../utils/cloudinary.js";
const upload = multer({ storage });
// const upload = multer({ dest: 'uploads/' })


const router=Router();

router.route("/").get(AllListing);
router.route("/new"). get ( isLogin,   newList);
router.route("/create").post(isLogin,upload.single("image"), CreateList);
router.route("/:id").  get  (  ShowListing);
router.route("/:id/edit").  get  (isLogin,isOwner,  findList);
router.route("/:id/update").  put  (isLogin,isOwner,upload.single("image"),  UpdateList);
router.route("/:id/delete").  delete  (isLogin,isOwner,  DeleteList);
router.route("/:id/review").  post  (isLogin,  AddReview);
router.route("/:listid/review/:reviewid").  delete  (isLogin,isreviewAuthor,  DeleteComment);


export default router;  