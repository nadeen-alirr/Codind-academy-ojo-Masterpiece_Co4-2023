const express = require('express');
const router = express.Router();

const courseController = require('../Controller/Coursecontroller')
const usercontroller =require('../Controller/UserController')
const courseUpload = require('../courseMulter'); 

// router.post('/course', [courseUpload], courseController.createCourse);

router.get('/getCourse',courseController.get_Course);
router.post('/signup',usercontroller.Signup);
router.get('/protectedroute',usercontroller.verifyToken)
router.post('/login',usercontroller.login)

// router.post('password/:id',usercontroller.password)
// router.patch('/update',usercontroller.update)

router.post('/upload',usercontroller.upload)
router.post('/addToCart', courseController.addToCart);
router.get('/getCourseuser/:userId' ,courseController.getcourse)
router.delete('/deleteitemcart/:userId/:courseId',courseController.delete_item_cart)
// router.post('/checkout',courseController.payment)
router.post('/addinfocard/:userId',usercontroller.addinfocard)
module.exports = router;