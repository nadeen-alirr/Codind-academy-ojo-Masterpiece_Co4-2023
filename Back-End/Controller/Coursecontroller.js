const Course = require('../model/CourseModel');
const User =require('../model/UsersModel')
const courseUpload = require('../courseMulter');
const streamifier = require('streamifier');
const cloudinary = require('cloudinary').v2;
const fs = require('fs').promises;

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

// const createCourse = async (req, res) => {
//   console.log("Received request to create a course.");

//   try {
//     const {
//       title,
//       description,
//       price,
//       duration,
//       labels,
//       paragraph,
//       lessons
//     } = req.body;

//     console.log("Request body:", req.body);

//     // Log the uploaded files
//     console.log("Uploaded files:", req.files);

//     // Ensure that the Cloudinary v2 configuration is set up
//     cloudinary.config({
//       cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//       api_key: process.env.CLOUDINARY_API_KEY,
//       api_secret: process.env.CLOUDINARY_API_SECRET
//     });

//     // Upload the course image to Cloudinary using v2 API
//     const courseImageResult = await cloudinary.uploader.upload(`data:image/jpeg;base64,${req.files['image'][0].buffer.toString('base64')}`, {
//       resource_type: 'image',
//     });

//     console.log("Course image uploaded:", courseImageResult);

//     // Upload lesson images to Cloudinary using v2 API and create lesson data
//     const lessonData = await Promise.all(
//       lessons.map(async (lesson, index) => {
//         try {
//           // Check if lesson['image'] is defined and has content before accessing it
//           if (lesson && lesson.image && lesson.image[0] && lesson.image[0].buffer) {
//             // Upload the lesson image to Cloudinary
//             const lessonImageResult = await cloudinary.uploader.upload(`data:image/jpeg;base64,${lesson.image[0].buffer.toString('base64')}`, {
//               resource_type: 'image',
//             });

//             return {
//               title: lesson.title,
//               completed: lesson.completed,
//               image: lessonImageResult.secure_url,
//             };
//           } else {
//             // Handle the case where lesson['image'] is missing or empty
//             console.error(`Error uploading image for lesson ${index + 1}: ${lesson.title}`);
//             return null;
//           }
//         } catch (lessonUploadError) {
//           // Handle the error when uploading a lesson image
//           console.error(`Error uploading image for lesson ${index + 1}: ${lesson.title}`, lessonUploadError);
//           return null;
//         }
//       })
//     );

//     // Filter out any null lesson data entries (if any lessons had missing images)
//     const filteredLessonData = lessonData.filter((lesson) => lesson !== null);

//     console.log("Lesson images uploaded:", filteredLessonData);

//     // Assuming you have a Course model for your database
//     const newCourse = new course({
//       title,
//       description,
//       price,
//       duration,
//       labels,
//       paragraph,
//       lessons: filteredLessonData, // Use the uploaded lesson images here
//       courseImage: courseImageResult.secure_url, // Store the course image URL
//     });

//     // Save the new course to your database
//     const savedCourse = await newCourse.save();

//     // Return a success response to the client
//     res.status(200).json({
//       success: true,
//       message: 'Course created successfully',
//       course: savedCourse,
//     });

//   } catch (error) {
//     console.error("Error uploading image to Cloudinary:", error);
//     res.status(500).json({
//       success: false,
//       message: 'Error uploading image to Cloudinary',
//       error: error.message
//     });
//   }
// };


const get_Course = async (req, res) => 
{
    try {
        const courses = await Course.find(); 
    
        return res.status(200).json({ success: true, courses });
      } catch (error) {
        console.error('Error retrieving courses:', error);
        return res.status(500).json({ success: false, message: 'Error retrieving courses', error: error.message });
    }
  }

  const addToCart  = async (req, res) => {
    try {
      const { userId, courseId } = req.body;
  
      const user = await User.findById(userId);
  
      // Check if the course is already in the user's cart
      if (user.cart.some(cartCourse => cartCourse.equals(courseId))) {
        return res.status(400).json({ error: 'Course already exists in the cart' });
      }
  
      const course = await Course.findById(courseId);
  
      user.cart.push(course);
  
      await user.save();
  
      res.status(200).json({ message: 'Course added to cart successfully' });
    } catch (error) {
      console.error('Error adding course to cart:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}
const getcourse = async(req,res)=>{
  try {
    const userId = req.params.userId; // Check if userId is properly extracted
    console.log('userId:', userId); // Log the userId to see if it's correct

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const courses = await Course.find({ _id: { $in: user.cart } });

    return res.status(200).json({ success: true, courses });
  } catch (error) {
    console.error('Error retrieving courses:', error);
    return res.status(500).json({ success: false, message: 'Error retrieving courses', error: error.message });
  }
}
const delete_item_cart=async(req,res)=>{
  try {
    const userId = req.params.userId; 
    const courseId = req.params.courseId; 

    
    const user = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { cart: courseId } }, 
        { new: true } 
    );

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ success: true, message: 'Item removed from cart' });
} catch (error) {
    console.error('Error deleting item from cart:', error);
    return res.status(500).json({ error: 'Internal server error' });
}
}
// const payment= async(req,res)=>{
// try {
  
// } catch (error) {
  
// }
// }
module.exports= { get_Course , addToCart , getcourse ,delete_item_cart };