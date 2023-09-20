
const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    image: {
      type: String, // You can store the image URL as a string
      
    }
  });

  const courseSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    duration: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true, // Make the image field optional
    },
    labels: [String], // An array of strings for labels like "programming," "design," etc.
    paragraphDescription: String, // A small paragraph about the course
    lessons: [lessonSchema]
  });
  
  const Course = mongoose.model('Course', courseSchema);
  module.exports = Course;