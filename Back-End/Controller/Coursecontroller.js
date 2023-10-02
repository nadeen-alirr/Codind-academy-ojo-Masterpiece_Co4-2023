const Course = require('../model/CourseModel');
const User =require('../model/UsersModel')
const courseUpload = require('../courseMulter');
const streamifier = require('streamifier');
const cloudinary = require('cloudinary').v2;
const fs = require('fs').promises;



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
  
      
      if (user.payments.includes(courseId)) {
        return res.status(400).json({ error: 'Course is already in the payment' });
      }
  
      
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
    const userId = req.params.userId;
    console.log('userId:', userId); 

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

const payment= async(req,res)=>{
  try {
    const userId = req.params.userId;
    const coursesBought = req.body.coursesBought;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    
    user.cart.pull(...coursesBought);

    
    user.payments = [...new Set(user.payments.concat(coursesBought))];

    await user.save();

    res.status(200).json({ message: "Payment successful", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
const YourCourse  =async(req ,res) =>{
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch courses from payments array
    const coursesInPayments = await Course.find({ _id: { $in: user.payments } });

    res.status(200).json({ coursesInPayments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
module.exports= { get_Course , addToCart , getcourse , delete_item_cart , payment ,YourCourse};