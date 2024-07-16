// const AppError = require("../../utilities/handelError/appErrorClass");
const asyncHandler = require("../../utilities/handelError/asyncHandler");
const { authMiddleware, accepted } = require("../../utilities/authMiddleware/authMiddleware");
const generateId = require("../../utilities/generateId");
const cloudinary = require("../../utilities/upload_factory/cloudinary");
const Video = require("../../models/video.model");
const {  uploadSingleVideo } = require("../../utilities/upload_factory/file_upload");
const { default: slugify } = require("slugify");







const videoRouter = require("express").Router();

/* -------------------------------------------------------------------------- */
/*                                   add course                                 */
/* -------------------------------------------------------------------------- */


videoRouter.post('/add', authMiddleware(accepted.admin), uploadSingleVideo('video')

    , asyncHandler(async (req, res) => {

        const video = Video.build(req.body);
        video.id = generateId();

        

   

            let { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path,
                {
                    folder: "l-video",
                    resource_type:'video'
                });
        
                video.video=secure_url;
                video.video_id=public_id;
                video.slug=slugify(video.name);
                await video.save();



        res.status(201).json({ message: "done", video });

    }));






/* -------------------------------------------------------------------------- */
/*                               get videos                                  */
/* -------------------------------------------------------------------------- */

videoRouter.get('/',

    asyncHandler(async(req, res) => {


        const video = await Video.findAll();

        res.status(200).json({ messaage: "done", video});
    }));


/* -------------------------------------------------------------------------- */
/*                                UPDATE VIDEO                                */
/* -------------------------------------------------------------------------- */

videoRouter.put('/updata/:id', authMiddleware(accepted.admin), uploadSingleVideo('video')

    , asyncHandler(async (req, res) => {

        

        
            let video = await Video.findOne({where:{id}});
   

            let { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path,
                {
                    folder: "l-video",
                    resource_type:'video'
                });
        
                video.video=secure_url;
                video.video_id=public_id;
                await video.save();


        res.status(201).json({ message: "done",video});

    }));





module.exports = videoRouter; 
