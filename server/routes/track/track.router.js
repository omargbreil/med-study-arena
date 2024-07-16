const AppError = require("../../utilities/handelError/appErrorClass");
const asyncHandler = require("../../utilities/handelError/asyncHandler");
const { authMiddleware, accepted } = require("../../utilities/authMiddleware/authMiddleware");
const Track = require("../../models/track.model");
const generateId = require("../../utilities/generateId");
const cloudinary = require("../../utilities/upload_factory/cloudinary");
const { uploadMixFileds } = require("../../utilities/upload_factory/file_upload");







const trackRouter = require("express").Router();

/* -------------------------------------------------------------------------- */
/*                                   add Track                                 */
/* -------------------------------------------------------------------------- */

let fields = [{ name: "image" }, { name: "video" }, { name: "pdf" }]

trackRouter.post('/add', authMiddleware(accepted.admin), uploadMixFileds(fields), asyncHandler(async (req, res) => {
    let track = Track.build(req.body);
    track.id = generateId();
    let files = [];
    let image, image_id, pdf, pdf_id, video, video_id;
    let fileKeys = Object.keys(req.files);
    fileKeys.forEach(function (key) {
        files.push(req.files[key][0]);
    });
    const fileUploadPromises = files.map(async (element) => {
        console.log(element);
        if (element.fieldname === 'image') {
            const { secure_url, public_id } = await cloudinary.uploader.upload(element.path, {
                folder: "trackImage",
                resource_type: 'image'
            });
            image = secure_url;
            image_id = public_id;
        } else if (element.fieldname === 'video') {
          try {

            console.log("video");

            const {secure_url, public_id} = await cloudinary.uploader.upload(element.path, {
                folder: "trackVideo",
                resource_type: 'video'
            });

            video = secure_url;
            video_id = public_id;
            console.log("video2");

            
          } catch (error) {

            console.log("catch");
            console.log(error);
            res.json(error)
          }
        } else if (element.fieldname === 'pdf') {
            const { secure_url, public_id } = await cloudinary.uploader.upload(element.path, {
                folder: "trackPdf",
                resource_type: 'auto'
            });
            pdf = secure_url;
            pdf_id = public_id;
        }
    });
    await Promise.all(fileUploadPromises);
    track.image = image;
    track.image_id = image_id;
    track.video = video;
    track.video_id = video_id;
    track.pdf = pdf;
    track.pdf_id = pdf_id;
    await track.save();
    res.status(200).json({ message: "done", track });
}));
    



/* ------------------------------ Update track ------------------------------ */


trackRouter.put('/update/:id', authMiddleware(accepted.admin), uploadMixFileds(fields), asyncHandler(async (req, res) => {
    const {id} = req.params;
    let track = await Track.findByPk(id);
    
    if (!track) {
        return next(new AppError("track not found", 400));
    }

    track.text=req.body.text?req.body.text:track.text;

    let files = [];
    let image, image_id, pdf, pdf_id, video, video_id;
    if (req.files) {

        let fileKeys = Object.keys(req.files);
        fileKeys.forEach(function (key) {
            files.push(req.files[key][0]);
        });
  }

   
    const fileUploadPromises = files.map(async (element) => {
        if (element.fieldname === 'image') {

            if (track.image_id) {
                await cloudinary.uploader.destroy(track.image_id);
            }
            const { secure_url, public_id } = await cloudinary.uploader.upload(element.path, {
                folder: "trackImage",
                resource_type: 'image'
            });
            image = secure_url;
            image_id = public_id;
        } else if (element.fieldname === 'video') {
      

            if (track.video_id) {
                await cloudinary.uploader.destroy(track.video_id);
            }
            const {secure_url, public_id} = await cloudinary.uploader.upload(element.path, {
                folder: "trackVideo",
                resource_type: 'video'
            });

            video = secure_url;
            video_id = public_id;
            console.log("video2");

        
        } else if (element.fieldname === 'pdf') {

            if (track.pdf_id) {
                await cloudinary.uploader.destroy(track.pdf_id);
            }
            const { secure_url, public_id } = await cloudinary.uploader.upload(element.path, {
                folder: "trackPdf",
                resource_type: 'auto'
            });
            pdf = secure_url;
            pdf_id = public_id;
        }
    });
    await Promise.all(fileUploadPromises);
    track.image = image;
    track.image_id = image_id;
    track.video = video;
    track.video_id = video_id;
    track.pdf = pdf;
    track.pdf_id = pdf_id;
    await track.save();
    res.status(201).json({ message: "done", track });
}));
    
     



    
    /* ------------------------------- Delete step ------------------------------ */


    trackRouter.delete('/delete/:id', authMiddleware(accepted.admin), asyncHandler(async (req, res) => {
        const {id} = req.params;
        
        // Find the track by ID
        let track = await Track.findByPk(id);
    
        if (!track) {
            // If the track is not found, return an error response
            return res.status(404).json({ error: 'Track not found' });
        }
    
        // Delete the associated files from Cloudinary
        if (track.video_id) {
            await cloudinary.uploader.destroy(track.video_id);
        }
    
        if (track.image_id) {
            await cloudinary.uploader.destroy(track.image_id);
        }
    
        if (track.pdf_id) {
            await cloudinary.uploader.destroy(track.pdf_id);
        }
    
        await track.destroy();
    
        res.status(200).json({ message: "done" });
    }));


/* -------------------------------------------------------------------------- */
/*                               oredered Tracks                                  */
/* -------------------------------------------------------------------------- */

trackRouter.get('',

    asyncHandler(async (req, res) => {


        const tracks = await Track.findAll({
            order: [
              ['createdAt', 'ASC']
            ]
          });;

        res.status(200).json({ messaage: "done", result:tracks })
    }));

//  specific Track


trackRouter.get('/:id',

    asyncHandler(async (req, res, next) => {

        let {id} = req.params;
        const track = await Track.findOne({ where: { id } });
        if (!Track) {
            return next(new AppError("Track not found", 400));
        }

        res.status(200).json({ messaage: "done", track })
    }));



module.exports = trackRouter; 
