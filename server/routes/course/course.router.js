const AppError = require("../../utilities/handelError/appErrorClass");
const asyncHandler = require("../../utilities/handelError/asyncHandler");
const { authMiddleware, accepted } = require("../../utilities/authMiddleware/authMiddleware");
const Course = require("../../models/course.model");
const { default: slugify } = require("slugify");
const generateId = require("../../utilities/generateId");
const cloudinary = require("../../utilities/upload_factory/cloudinary");
const { uploadSingleImage } = require("../../utilities/upload_factory/file_upload");







const courseRouter = require("express").Router();

/* -------------------------------------------------------------------------- */
/*                                   add course                                 */
/* -------------------------------------------------------------------------- */


courseRouter.post('/add', authMiddleware(accepted.admin), uploadSingleImage('image')

    , asyncHandler(async (req, res) => {

        const course = Course.build(req.body);
        course.id = generateId();
        let { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path,
            {
                folder: "courses_img",
                resource_type:'image'
            });

        course.image=secure_url;
        course.image_id=public_id;    

        course.total_price = course.price - ((course.price * course.discount || 0) / 100);
        course.slug = slugify(course.name, "_");




        await course.save();

        res.status(201).json({ message: "done", course });

    }));






/* -------------------------------------------------------------------------- */
/*                               get courses                                  */
/* -------------------------------------------------------------------------- */

courseRouter.get('',

    asyncHandler(async (req, res) => {


        const courses = await Course.findAll();

        res.status(200).json({ messaage: "done", result:courses })
    }));

//  specific Course


courseRouter.get('/:id',

    asyncHandler(async (req, res, next) => {

        let { id } = req.params;
        const course = await Course.findOne({ where: { id } });
        if (!course) {
            return next(new AppError("course not found", 400));
        }

        res.status(200).json({ messaage: "done", course })
    }));



    /* -------------------------------------------------------------------------- */
    /*                                Update Course                               */
    /* -------------------------------------------------------------------------- */

    courseRouter.put('/update/:id', authMiddleware(accepted.admin), uploadSingleImage('image'),
     asyncHandler(async (req, res, next) => {
        const {id} = req.params;
        let course = await Course.findByPk(id);
    
        if (!course) {
            return next(new AppError("Course not found", 400));
        }
    
        // Update course fields
        course.name = req.body.name ? req.body.name: course.name;

        course.description = req.body.description ?req.body.description :course.description;
        course.price = req.body.price ?req.body.price :course.price;
        course.discount = req.body.discount ? req.body.discount:course.discount;
        course.total_price = course.price - ((course.price * (course.discount ?? 0)) / 100);
        course.slug = slugify(course.name, "_");
    
        // Handle image update
        if (req.file) {
            // Delete the old image from Cloudinary
            if (course.image_id) {
                await cloudinary.uploader.destroy(course.image_id);
            }
    
            const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
                folder: "courses_img",
                resource_type: 'image'
            });
    
            course.image = secure_url;
            course.image_id = public_id;
        }
    
        await course.save();
    
        res.status(201).json({ message: "Course updated", result: course });
    }));
 
    /* -------------------------------------------------------------------------- */
    /*                                Delete course                               */
    /* -------------------------------------------------------------------------- */

    courseRouter.delete('/delete/:id', authMiddleware(accepted.admin), asyncHandler(async (req, res) => {
        const {id} = req.params;
        
        // Find the course by ID
        let course = await Course.findByPk(id);
    
        if (!course) {
            // If the course is not found, return an error response
            return res.status(404).json({ error: 'course not found' });
        }
    
        if (course.image_id) {
            await cloudinary.uploader.destroy(course.image_id);
        }
    
    
        await course.destroy();
    
        res.status(200).json({ message: "done" });
    }));


module.exports = courseRouter; 
